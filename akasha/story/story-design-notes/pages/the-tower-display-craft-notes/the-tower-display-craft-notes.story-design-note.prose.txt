# Tower display — craft notes for a cold successor

You own the display: `index.html`, `serve.ts`, and the **shape** of `state.json` (the
projection contract). You do NOT author `state.json` values — iris (the GM seat) does.
This file is the durable brain-dump a fresh display-code helper needs. For the blow-by-blow
change history, read `RESKIN-NOTES.md` (chronological changelog); THIS file is the load-bearing
architecture + the gotchas that will bite you.

Directory is `~/agents/iris/litrpg/display/`. **NOT repo-tracked** — edit freely here, no `/p`
project or worktree. (The repo Agent Rules about worktrees do not apply to this path.)

---

## The single-writer file model (the one hard rule)

Three JSON sidecars, **one writer each** — never cross the streams:

| file                 | sole writer            | how it's written                          |
|----------------------|------------------------|-------------------------------------------|
| `state.json`         | iris / GM seat         | staged whole-turn write via `publish.sh`  |
| `actions.json`       | `serve.ts`             | POST /action handler, serialized          |
| `illustrations.json` | iris-art (hand/tooled) | edited directly; separate to keep state single-writer |

- **NEVER hand-edit `state.json` piecemeal.** The browser polls it every ~1.8s as a *static file*
  (serve.ts never parses or caches it). A multi-write turn can be polled mid-write → a torn,
  half-applied render. `publish.sh` stages the whole turn into `state.json.tmp` (same dir = same
  filesystem) and `rename(2)`s it over the live file — atomic, so a GET always opens the whole old
  inode or the whole new one. If you must change values for a test, go through the staging path.
- `illustrations.json` is separate *on purpose*: it lets art be added without touching the
  single-writer state file. A missing/empty/unfetchable illustrations file → story renders exactly
  as before (graceful).

## `state.json` projection contract (what index.html reads)

Top-level: `{ log, chapters, title, turn, hud, sheet }`.

- `hud`: `{ level, class, tier, hp, hpMax, focus, focusMax, stamina, stamMax, delta:{hp,focus,stamina,level}, attrPoints }`.
  Renders `Lv <level>` + class + tier + three meters. **No `xp` field, anywhere.**
- `sheet`: `{ attributes, derived, class, skills, titles, affinities, inventory, equipment, delta, attrInfo }`.
  - `skills[]`: `{ name, rung, score, note }` → name left, `score` + `rung` right.
  - `affinities[]`: `{ name, value, note }` → name left, **`value` only** right (no cap).
  - `sheet.delta`: per-name signed deltas keyed by section (`{skills:{<name>:+1}, affinities:{…}, attributes:{…}, inventory:{…}}`).
  - list items may carry a transient `new:true` → renders `(new)` instead of a numeric delta.

### FOG — deliberate omissions, do NOT "fix" them
Several render paths hide unearned information *by design*. A successor who "completes" them breaks canon:
- **No XP anywhere.** Leveling is FLAT: +1 per floor cleared, no curve, no `xpMax`. The absence is
  correct. `turnlib.set_level()` and `snapshot_sheet()` both dropped XP (2026-06-24). Never add an XP row.
- **Affinities show `value` with no cap** ("8", never "8/50"). `ladderRight()` reads only
  `rung`/`score`/`value` — there is *no code path* that can emit a cap even if upstream data carried one
  (index.html ~L483-494). Keep it that way.
- **Equipment renders filled slots only** — empty slots are hidden (no foreshadowing of gear not yet
  owned). `eqRows()` supports the 12-slot ESO dict *and* a legacy `{weapon,armor}` fallback.
- **Titles section is hidden entirely** until the first title lands (empty section would foreshadow the
  mechanic). Already-unlocked systems keep their "none yet".

## `index.html` — one standalone file, pure client render

- No build, no framework, no CDN. Fonts (Geist / Geist Mono / Literata) are served locally from
  `fonts/` so it works offline. Design tokens are the real alanwalton/temper design-system values,
  inlined (oklch surfaces, gemstone accents, 0.5rem radius, 4px spacing).
- `poll()` every 1800ms fetches all three sidecars in parallel (cache-busted with `?_=<ts>`), then
  `renderEarlier / renderHud / renderLog / renderPanel`. Wrapped in try/catch → a bad poll is silently
  skipped, next poll recovers.
- **Sig-guarded**: `renderLog` (`lastSig`) and `renderEarlier` (`lastChSig`) skip the DOM rebuild when
  content is unchanged, so the 1.8s poll doesn't churn. If you add a field that must re-render, include
  it in the sig or it won't repaint.
- **Illustrations**: `illuFor(beatId)` filters `illustrations.json` by `anchor === beat.id` and injects
  the `<figure>` right after that beat, in array order (multiple may share an anchor). Images fade in on
  load (`.ld` class) and are laid out above already-rendered text so a late load never shifts the column.
- **Popovers** (`#pop`) are a body-level floating element, NOT inside `#panel` — so the 1.8s panel
  re-render never wipes an open description. One open at a time; positioned from the clicked row's rect.
- **Earlier-chapters nav** links to the deployed reader at `READER_BASE = https://alanwalton.com`
  (a *different origin* than this :7327 display), new tab. Only `chapters[]` with `status:"archived"` +
  a `readerLink` get links. If the reader host ever changes, `READER_BASE` is the one constant to update.
- **Tier line** renders `"Tier " + hud.tier`, i.e. hud.tier `"1 · Threshold"` shows as "Tier 1 · Threshold".

## `serve.ts` — static server + action relay (port 7327)

- Serves this dir with `Cache-Control: no-store` so `state.json` is always fresh. Never reads/writes
  `state.json`; owns `actions.json` exclusively (serialized read-modify-write via `withActionsLock`).
- **POST /action** → `routeAction()` → `bun ops agent send iris --agent-id <ACTION_BOX_AGENT_ID> --content <text>`,
  then persists an echo to `actions.json` so it survives a browser reload. The echo shows while its
  `baselineBeatId` equals the live last-narrative-beat id, and clears when the responding beat lands.
- **`ACTION_BOX_AGENT_ID` (`019ef9ea-83e2-707e-b1f3-3b70875a8e88`) is pinned config, NOT ambient
  `AGENT_ID`.** It is the identity iris trusts as *Alan's input*. An explicit `--agent-id` overrides env
  `AGENT_ID`, so a keepalive/OOM restart under some *other* agent's creds can't silently misattribute
  every action. Override via `TOWER_ACTION_BOX_AGENT_ID` if the trusted identity changes.
  ⚠️ **This hardcodes the recipient `iris` and iris's id — see "Reseat gotcha" below.**

## Launch & self-heal — USE `run.sh`, not a bare `serve.ts`

- **`run.sh` is the correct launcher**: a keep-alive `while true` loop that re-runs `serve.ts` within
  ~1s of *any* exit — including an OOM SIGKILL, which leaves no error trace. Launch it ONCE, detached:
  `setsid nohup ./run.sh >/dev/null 2>&1 & disown` (it appends to `server.log`, writing a
  `[keepalive restart …]` marker on each respawn).
- **Gotcha that already bit us (2026-07):** the server was started as a *bare* `setsid nohup bun run
  serve.ts &` — NOT under `run.sh`. So when it died it stayed dead, and `server.log` held only the
  startup line with no restart marker. If `server.log` shows only `Tower display live →` lines and no
  `[keepalive restart]` markers, the self-heal is **not** active — relaunch via `run.sh`.
- Standing directive from iris-manager: if 7327 dies, **diagnose the cause first** (OOM? unhandled
  throw? reboot? — check `server.log` tail, `dmesg`/journal for an OOM kill) and capture it *before*
  restarting, so we fix the cause, not the symptom.
- Quick health check: `curl -s -o /dev/null -w '%{http_code}' http://localhost:7327/` (expect 200);
  `GET /state.json` should also be 200.

## `publish.sh` — the turn-commit contract (iris's write side, FYI)

Not yours to run, but you must keep the display in sync with what it writes:
1. Validate `state.json.tmp` parses, then atomic `rename` over `state.json` (the single visible moment).
2. **Best-effort, non-fatal** Awen forward-write: `bun ops awen commit-state --game the-tower …`
   (duplicates the turn into the unified game-state `the-tower`; #13656 seam-4). Guarded by an `if` so a
   hiccup can't break the publish.
3. **Best-effort** entity-sync: `bun ops awen commit-entity --game the-tower --external-id alan …`
   (upserts the canonical sheet from `sheets/alan.json`; #14310). Also `if`-guarded.
The filesystem `state.json` is the source of truth; the Awen writes are additive migration duplication.

## `turnlib.py` — turn-staging helpers (iris's write side; the shape authority)

NOTE: the flush brief called this "turnlib art wiring" — it is **not** art (art = `illustrations.json`).
It's the Python module iris's per-turn staging script imports. It is the *executable authority* on the
write-side projection shape, so if you change the contract you likely change this too:
- `clear_transient(state)` — call FIRST each turn; wipes `hud.delta`, `sheet.delta`, and per-item `new`
  flags so last turn's transients don't leak.
- `set_level(state, sheet, n)` — writes level to BOTH `hud.level` and `sheet.level` from one place so
  they can't drift. (Flat leveling: no XP.)
- `snapshot_sheet(state)` — the locked 14-key end-of-chapter snapshot (9 sheet keys + 5 hud fields,
  with the `hpMax→maxHp` etc. rename); stored on the closing chapter. Was 16 keys before XP was dropped.
- `system_card(prev, curr)` — deterministically emits the `type:"system"` progression beat from a diff
  (LEVEL UP / SKILL / AFFINITY / CLASS / TITLE). Closed vocabulary. Keys skills/affinities by NAME
  (live sheet has no id), so an authorial *rename* reads as emergence — handle that turn by hand.
  Affinity tier is currently fused into the name, so affinity *promotion* can't fire until entries get a
  separate `tier` field (forward-compatible; next promotion is far off).

## Reseat gotcha — READ if the GM seat is moving (⚠️ live during the #15155 cascade)

`serve.ts` routes every player action to **`iris`** with iris's pinned agent-id. When the Tower is
reseated from `iris` onto a new GM seat (`awen-gm--the-tower`, #15155), the action box will keep
delivering Alan's typed actions to the OLD seat until `ACTION_BOX_AGENT_ID` (and the `send iris`
recipient) are repointed at the new seat. This is a display-code change (mine), but WHO the new seat is
and WHEN to cut over is a story/ops decision — escalate to iris-manager before editing serve.ts.
The env override `TOWER_ACTION_BOX_AGENT_ID` exists precisely so the id can be repointed without a code
edit; the recipient string `iris` in `routeAction()` would still need updating (or aliasing).

## Candidate-revision resolution (#15155 retire sub-gate) — DISCARDED 2026-07

`index.candidate.html` and `index.prev.html` were an in-flight candidate revision (a hard sub-gate
on retire). **Resolved: DISCARD-WITH-NOTE — both deleted.** Why: they were pre-feature snapshots dated
Jun 24 07:02/07:07 (359 / 316 lines), whereas live `index.html` (648 lines, 17:50) had grown a full day
of feature work past them — verified by marker count: candidate/prev have ZERO of illustrations,
ladder lists, popovers, persisted action echoes (`actions.json`/`renderEchoes`), or attribute-points;
live has them all. Per `RESKIN-NOTES.md` the candidate was the component-primitive-fidelity `<style>`-only
pass, and that reskin was already folded into live. Promoting either would have *regressed* the display,
so there was nothing to promote — the candidate's only contribution already lives in `index.html`.

## Files in this dir, at a glance

- `index.html` — the live display (this is the served one).
- `serve.ts`, `run.sh` — server + keep-alive launcher.
- `publish.sh`, `turnlib.py`, `__pycache__/` — iris's write-side turn machinery (FYI, not yours to run).
- `state.json`, `actions.json`, `illustrations.json` — the three single-writer sidecars.
- `illustrations/*.png` — the anchored art (filename convention `<beatId>-<slug>.png`).
- `fonts/` — locally-served woff2 (offline).
- `RESKIN-NOTES.md` — chronological change history (reskin + feature adds). `DESIGN.md` (parent dir) is
  the locked spec; `sheets/alan.json` is player canon; `engine/engine.ts` is the resolver — all authority
  files, never casually edited.
