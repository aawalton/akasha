# Reskin notes — component-primitive fidelity pass (candidate)

Deepened the display's component styling toward the real alanwalton/temper
design-system primitives. **Only the `<style>` block changed**; the `<script>`
is byte-identical to live `index.html` (verified by diff — zero behavior change).
Candidate file: `index.candidate.html`. Live `index.html` was not touched.

## Design-system source files drawn from

- `/home/walton/code/packages/shared/design/system/src/styles/tokens.css`
  — surface levels, `--state-hover/-focus/-pressed` (0.08 / 0.12 / 0.12),
  `--state-disabled-content` (0.38), spacing scale.
- `/home/walton/code/packages/shared/design/system/src/styles/theme.css`
  — `--radius` scale (sm/md/lg/xl).
- `/home/walton/code/packages/shared/design/primitives/src/components/card.tsx`
  — `rounded-xl px-6 py-6 shadow-sm bg-surface-1`, **no border**.
- `/home/walton/code/packages/shared/design/primitives/src/components/button.tsx`
  — `rounded-md h-9 px-4 py-2 text-sm font-medium transition-all`; hover/focus/
  active via `::after` state-layer overlay at the `--state-*` alphas; focus ring
  `outline:1.5px solid var(--color-accent); outline-offset:-1px`.
- `/home/walton/code/packages/shared/design/primitives/src/components/input.tsx`
  — `h-9 rounded-md` surface+1 bg, `shadow-xs`, same accent focus ring (outline,
  not border-color), `selection:bg-accent/15 selection:text-accent`.
- `/home/walton/code/packages/shared/design/primitives/src/components/progress.tsx`
  — `h-2 rounded-full` track, fill `transition-all`.
- `/home/walton/code/packages/shared/design/badges/src/components/badge.tsx`
  — `rounded-md px-2 py-0.5 text-xs font-medium`, tinted `bg-<color>/15 text-<color>`.
- `/home/walton/code/packages/shared/design/primitives/src/components/separator.tsx`
  — `bg-surface-3 h-px` (existing dividers already matched this; left as-is).

## Component-level changes

- **Tokens added** to `:root`: `--radius-full`, the `--state-hover/-focus/-pressed`
  and `--state-disabled-content` opacities, and a `--shadow-xs` / `--shadow-sm`
  scale (Tailwind-default elevations the primitives lean on).
- **Cards** (`.card`): padding bumped `spacing-4 → spacing-6` (px-6/py-6) and added
  `shadow-sm`, matching the Card primitive. Border-free; elevation via shadow.
- **System / combat beats**: radius `radius-lg → radius-xl`, padding evened to
  `spacing-4`, added `shadow-sm` — now diegetic System panels built on the Card shape.
- **Progress bars** (`.bar`): height `9px → 8px` (h-2), radius `radius-sm →
  radius-full`, added `transition:width .3s` on the fill (Progress `transition-all`).
  Gemstone fills (incl. gold XP) unchanged.
- **Tabs**: added accent focus ring (1.5px / -1px) and `transition:all`; resting
  segmented look + solid-accent active state retained.
- **Action input**: dropped the border-color focus swap for the design-system
  accent **focus ring** (outline 1.5px / offset -1px), `shadow-xs`, `h-9` height,
  and accent `::selection`.
- **Send button**: re-shaped to the Button primitive — `h-9 rounded-md text-sm
  font-medium transition-all`, accent focus ring, and a `::after` state-layer
  overlay (hover/active/focus at the `--state-*` alphas) replacing the old
  `filter:brightness` hover. Disabled uses `--state-disabled-content` (0.38).
  Kept its solid-accent (gold) CTA identity.
- **Sent toasts** (`.sent`): re-shaped to the Badge primitive — `rounded-md`,
  tinted fill at the `/15` token alpha (blue gemstone for actions, orange for
  errors), replacing the surface-1 + left-border treatment.

## Preserve-list — all intact (verified)

- Literata narrative font on `.beat.narrative` (serif, 18px, line-height 1.72). ✅ unchanged
- XP progress bar with gold (yellow) gradient + `if(h.xp!=null&&h.xpMax!=null)` guard. ✅
- Fog-of-war panel: "Anomalies" tab (not "Traits"), no "Die" line, "Class" section,
  `renderPanel` logic. ✅ (script byte-identical; tab label "Anomalies" present)
- Toast/sentfeed sits **below** the action bar with top gap. ✅ (DOM: actionbar then sentfeed)
- SSE live-reload `new EventSource("/__livereload")` → reload on "reload". ✅
- Poll loop (`setTimeout(poll,1800)` → renderHud/renderLog/renderPanel) + action
  input → POST `/action`. ✅
- Newest-batch "newest" divider highlighting in `renderLog`. ✅
- All referenced element IDs (xpBar, xpTxt, log, sentfeed, actionbar, actionInput,
  actionSend, tier, gameTitle, hpBar, foBar, stBar, panel, tabs, hudClass,
  hudLevel). ✅ all present

## Click-to-reveal description pattern (Sheet panel lists) — Alan, 2026-06-24

The STANDARD treatment for any description-bearing list item in the Sheet panel
(skills, affinities, titles, inventory). Replaces the old `listOr()` which mirrored
the Weapon/Armor `.kv` row — right-justified, name+note jammed into one blob.

- **`descList(arr, section)`** renders each item as a `<button class="li">`:
  left-justified, NAME-prominent (primary color, weight 600; hover → accent;
  selected → accent + faint accent/8 tint). The description is NOT shown inline.
- Items WITHOUT a note render `.li.nodesc` + `disabled` (no reveal affordance).
- **Rows left-align with the section headers** — `.li` has `padding:5px 0` (zero
  left inset) so the clickable item and its `.sect` header share the same left edge.
- **Click a row → `showPop()`** floats the description in a `POPOVER` (`#pop`, a
  body-level fixed element) near the clicked row — it does NOT push panel content.
  `placePop()` positions it from the row's `getBoundingClientRect()`: floats to the
  LEFT of the row, falling back to below it on left-edge overflow, clamped to the
  viewport. Name (`.dn`, accent mono caps) over description (`.dd`, secondary).
  (Earlier revision used an inline `#detail` slot below the list; replaced by the
  popover per Alan 2026-06-24.)
- **One open at a time** — selection is a single `SEL = {section, name}`. Re-click
  toggles off; clicking outside a row/popover dismisses; switching tabs clears it.
  Because `#pop` lives outside `#panel`, the 1.8s poll re-render never wipes it.
- **Fog-safe:** renders only items present in `state.json`; descriptions are
  revealed info, now shown on demand. No `state.json` shape change — `{name, note}`
  already carries it. Pure presentation.
- **Genuine key-value pairs keep `.kv`:** Weapon/Armor, Derived stats, Class —
  label→value, not name→description, so they stay right-justified.
- The old `updates live · type your action below` hint line is removed.

## Player-action echo — persist-until-response (Sheet/action area) — Alan, 2026-06-24

The `#sentfeed` echoes (what the player typed) reshaped to standard panel styling
and a persist-until-response lifecycle.

- **Standard surface, not an accent channel:** `.sent` is now a surface-1 card
  (mono, secondary text, rounded-xl, shadow-sm) — the same treatment as the rest
  of the panel — instead of the old blue/orange Badge tint.
- **Gap below the action bar matches the gap above it:** `#sentfeed` top margin is
  `spacing-6`, the same gap as content→action-bar.
- **Persists until the responding narrative beat lands:** no auto-fade. On the
  first echo, `echoActive`/`echoBaseId` capture the current last-narrative-beat id
  (`lastNarrId`). When `poll()` observes a NEW last-narrative-beat id, `clearEchoes()`
  empties `#sentfeed`. So the echo stays visible from submit until the story update
  responding to it is written, then clears.
- **Error toasts unchanged:** transient `.sent.err` (orange) keeps its `sentfade`
  self-dismiss — only the player-action echoes persist.

Verified by executing index.html's real `<script>` in a DOM shim (no browser):
dispatched real tab-switch, row-click (popover open + computed position left of the
row), affinity-click (one-at-a-time content swap), outside-click + re-click (both
dismiss), and the echo lifecycle (submit → persists across same-state poll → clears
when a new narrative beat is appended: 1→1→0). NOTE: the popover's pixel placement
is computed correctly but final on-screen positioning needs an eyes-on browser check.

## Per-turn resource deltas (HUD bars) — iris, 2026-06-24

`hud.delta = {hp, focus, stamina, xp}` (signed ints, change vs. previous turn,
written by iris). `bar(el,txt,cur,max,delta)` prepends `deltaStr(delta)` to each
bar's value cell: `(+4) 62 / 70`. Zero/absent delta → nothing rendered. `deltaStr`
uses `+` for gains and the typographic minus `−` (U+2212) for losses, matching the
spec examples. `.delta.up`/`.delta.down` give a restrained green/red gain-loss tint
(player HUD meter, not a System panel — meter feedback, not an alarm). Persists for
the turn; iris overwrites on the next turn. Verified against live turn-10 data
(hp +4, focus +60, stamina +16, xp 0 → XP shows no parens). Pure presentation.

## Sheet/HUD adds — points, sheet-wide deltas, attribute popovers — iris, 2026-06-24

Three adds, all reusing the popover + delta machinery.

1. **Unspent attribute points** — `hud.attrPoints` (int). `#attrPts` badge (accent,
   restrained) shows `Attribute points: N` when `>0`; hidden when 0/absent.
2. **Sheet-wide deltas** — extend the `(+X)/(−X)` HUD-delta pattern to the sheet via
   `sheet.delta`, same signed-int + green/red tint + zero/absent=nothing rules:
   - `sheet.delta.attributes{ATTR:int}` → before the attribute value (attrgrid).
   - `sheet.delta.derived{NAME:int}` → before the derived value (`.kv`).
   - `sheet.delta.skills{name:int}` / `sheet.delta.affinities{name:int}` → `dHtmlAfter`,
     placed AFTER the entry name (the rank lives in the name string).
   - **char-level delta → `hud.delta.level`** (NOT `sheet.delta.level`): level renders
     in the HUD, so its delta lives with the other HUD deltas. Rendered before `Lv N`.
   - **new entries** (absent→present this turn): `new:true` flag on the skill/affinity/
     title/inventory entry → renders a `(new)` tag (in place of a numeric delta).
   - Helpers: `dHtml(d)` (delta span + trailing space, BEFORE a value) and
     `dHtmlAfter(d)` (leading space, AFTER a name).
3. **Attribute popovers** — `sheet.attrInfo{ATTR:revealedText}`. An attribute WITH an
   entry renders `.a.popq` (clickable, data-section="attr") → popover shows the text;
   WITHOUT one it's a plain `.a` (not clickable — fog-of-war on the self, the map
   EXPANDS as Alan learns each attribute). The popover click path generalized from
   `.li` to `.popq` (rows + attributes); `popNote(section,name)` resolves the text
   (attrInfo for "attr", else the entry note).

Verified by running the real script in a DOM shim against live turn-12 data + a
deterministic synthetic state: points badge on/off, level delta (+1) in HUD, negative
HP delta `(−5)`, attribute delta `(+1)` on MIGHT, derived `(+8)`, skill `(+1)` after
name, affinity `(new)` tag, VITALITY/MIGHT clickable → popover opens with attrInfo,
and an unrevealed attribute (no attrInfo) correctly NOT clickable.

## Resource-bar cur-vs-max delta distinction — iris, 2026-06-24

`hud.delta[res]` may now be `{cur,max}` (signed ints) per resource, distinguishing a
CURRENT-value change from a MAX-value change. `bar()` reads both:
- **max change wins** → marker placed AFTER the max, current marker suppressed:
  `96 / (+2) 104` (an augmentation that moves both cur and max renders as max-only,
  per iris's edge-case ruling — flag if she'd rather show both).
- else **current change** → marker BEFORE the current value: `(−8) 96 / 104`.
- both 0 / absent → bare `cur / max`, no parens.
- **legacy flat int** (`hud.delta[res] = -8`) is treated as a current-side delta
  (`(−8)` before cur), so iris can switch resources to `{cur,max}` one at a time with
  no coordinated cutover — the renderer accepts both shapes simultaneously.
Same green/red tint, typographic minus, and clear-on-next-turn as the other deltas.
Verified in the DOM shim across all six cases (max-incr, cur-loss, cur-gain, augment,
legacy int, zero/undefined).

## Server-persisted action echoes (survive reload) — iris, 2026-06-24

Player-action echoes are now persisted server-side so a mid-wait page reload keeps them.
**Single-writer guardrail honored absolutely:** `serve.ts` owns a SEPARATE sidecar
`actions.json` and NEVER reads or writes `state.json` (iris stays its sole writer).

- **serve.ts** — on `POST /action`: route to iris (unchanged); on success, persist
  `{id, text, baselineBeatId, ts}` to `actions.json` under an in-process write-lock
  (serialized read-modify-write — concurrent POSTs can't clobber). The browser supplies
  `currentBeatId` (its live last-narrative-beat id); the server stamps it as the echo's
  `baselineBeatId` and prunes any stored echo whose baseline differs (already answered),
  so the sidecar holds only unanswered echoes. Server never needs `state.json`. Ensures
  `actions.json` exists (`[]`) at boot so the first poll gets a value, not a 404. Returns
  `{ok:true,id}`; an empty/failed route persists nothing.
- **client** — `poll()` fetches `state.json` + `actions.json` together. Echoes render
  from a merge of the sidecar (`serverActions`) + still-in-flight `optimistic` entries,
  filtered to those whose `baselineBeatId === lastNarrId(log)` (unanswered). Render is
  idempotent, keyed by action id (`echoEls` map) — no double-render when an optimistic
  entry and its sidecar copy share an id. On submit: client mints the id + baseline,
  renders instantly (optimistic), POSTs `{action,id,currentBeatId}`; a failed POST drops
  the optimistic echo and shows a transient error toast. On reload, the first poll
  rebuilds every unanswered echo from the sidecar. Old `echoActive`/`echoBaseId`/
  `clearEchoes`/`showSent` replaced by `serverActions`/`optimistic`/`renderEchoes`/
  `showErr`.
- **Clear-on-response** unchanged in spirit: an echo clears the moment the responding
  narrative beat lands (its baseline no longer equals the live last-beat id) — and that
  now holds across a reload too, because the baseline lives in the sidecar.

Verified: serve.ts driven over real HTTP (iris route stubbed via a PATH shim) — boot `[]`,
two same-turn submits both persist, a responding beat prunes the answered echoes, server
assigns an id when the client omits one, empty action rejected. Client verified in the
DOM shim — unanswered-only render, reload re-render (no dupe), clear on beat advance,
optimistic+sidecar same-id dedupe.

## Tab rename + structured skill/affinity ladders + equipped swap — iris/Alan, 2026-06-24

Alan's framing: the whole HUD *is* the sheet, so the attributes/derived/class tab reads
**Stats** now (label only; `data-t="sheet"` unchanged so tab routing is untouched).

- **Skills & affinities → structured, two-column justified rows** (`ladderList`):
  - `skills: { name, rung, score, note? }` → name left (primary), right = `rung` (accent)
    + `score` (dim, tabular-nums).
  - `affinities: { name, value, note? }` → name left, `value` right (dim).
  - Delta `(+X)` and the `(new)` tag ride the RIGHT column. Delta still comes from
    iris-authored `sheet.delta.skills{name:int}` / `sheet.delta.affinities{name:int}`
    (she owns the authoritative turn-diff; the renderer is stateless across turns, so it
    renders her delta rather than diffing the score string — consistent with HP/attrs,
    survives reload, clears on her per-turn reset).
  - `note?` still drives the click-popover (no note → `nodesc`, not clickable).
  - Titles & inventory keep the name-only `descList`; only the two LADDER sections gained
    a right-hand value column.
- **FOG enforced in the renderer** — `ladderRight()` reads ONLY `rung`/`score`/`value`.
  There is NO code path that can emit a cap, threshold, or `/max`, so even if upstream
  data carried one (tested with `{value:6,cap:10,threshold:200}`) the display shows just
  `6`. The destination stays hidden by construction, not by discipline.
- **Legacy tolerance** — a plain-string entry (`'Ember Channel — Journeyman (14)'`)
  renders as the left name with an empty right column (no crash), so iris can swap the
  live data to structured fields with no glitch window.
- **Equipped column swap** (`eqRows`) — the item NAME is now the aligned left column
  (primary), the slot label dim on the right, so names stack cleanly down the left edge.
  Empty slot → `—`.

Verified in the DOM shim: structured skill (rung+score+delta on the right), affinity
value-only, stray cap/threshold fields suppressed (`contains '10'? false`), legacy string
no-crash, `(new)` tag, equipped name-left/slot-right + empty `—`.

## Ladder/equipped/Stats refinement wave — Alan via iris, 2026-06-24

A rapid sequence of Alan-driven refinements (several superseded earlier ones; this records
the FINAL landed state):

- **Equipped → ESO 12-slot, filled-only** (`eqRows` + `EQ_SLOTS`). `sheet.equipment` is a
  slot-keyed dict `{mainHand, offHand, neck, ring1, ring2, head, shoulders, chest, hands,
  waist, legs, feet}` (null = empty); value is an item-name string or `{name,note}`. Renders
  ONLY non-null slots in weapons→jewelry→armor order — empty slots are hidden entirely
  (fog: no empty-slot foreshadowing of gear not owned). **Tolerant**: falls back to the legacy
  `{weapon,armor}` shape (also filled-only) when no slot key is present, so iris migrates with
  no glitch window. All-empty → `none yet`. Column layout: item name left (primary), slot label
  dim-secondary right (the final swapped order — superseded the earlier slot-left layout).
- **Ladder rows (Skills tab) — order + colors (final)**: right column reads
  **change → score → rung** (skills) / **change → value** (affinities) — `${tag}` before
  `ladderRight`, and `ladderRight` emits score-then-rung. Colors: rung `.lrung` → `--secondary`,
  score/value `.lscore` → `--accent`, and the ladder change tag `.li.ladder .lright .delta` →
  `--accent` (scoped — HUD pool / attribute / derived deltas keep their green/red tint). The
  ladder delta also gets `font-size:inherit` so the `(+X)` matches the 12.5px row numbers and
  baseline-aligns (global `.delta` stays 10px for the pools/attrs).
- **Ladder alpha-sort** — `ladderList` sorts a COPY by `itemName` (`localeCompare`) at render
  time; never depends on or mutates `state.json` order. Deltas / `(new)` flags are name-keyed,
  so they stay aligned after the sort.
- **Titles section hides when empty** — the Skills tab only emits the `Titles` header +
  `descList` when `s.titles.length > 0`. An unlockable-but-empty system must not render a header
  or `none yet` placeholder (no foreshadowing). General rule; already-unlocked systems keep
  their `none yet`.
- **Per-point gain System panel** — render support for a compact single-line declarative panel:
  a system beat with `kind:"gain"` renders `.beat.gain` (terse one-liner, distinct from the big
  ADVANCED crossing panels). iris authors the title text. **Proposed wording** (awaiting her
  lock): `SKILL +1 — Ember Channel · Journeyman 4` / `AFFINITY +1 — Ember Manipulation · 7` —
  System tag + signed delta + em-dash + name + middot + resulting current value, NO denominator
  (policy A). The trailing value must equal that entry's ladder row EXACTLY — for skills the
  within-rung `rung score` pair (rung + per-rung 1–5 score), for affinities the bare counter —
  per the iris-prep-locked within-rung model (per-rung reset 1–5). The earlier continuous-scale
  examples (`· 15` / `· 2`, `· Journeyman 15`) predate that lock and are stale — do NOT
  reintroduce a continuous number. Avoid the `14 → 15` form (re-states the prior; the `+1`
  already implies the tick, and current-level-only matches "show the CURRENT level").
- **Inline illustrations (iris-art)** — a SEPARATE `display/illustrations.json` sidecar (owned by
  iris-art; keeps `state.json` single-writer, same pattern as `actions.json`). Array of
  `{anchor, src, alt, caption?}`; `anchor` = a log beat id. `poll()` fetches it alongside
  `state.json`/`actions.json` (tolerant: missing/empty/unfetchable → story renders exactly as
  before). `renderLog` interleaves `illuFor(beat.id)` right after each beat — multiple per anchor
  in array order. `<figure class="illu">`: full content width, rounded, subtle dark frame,
  `loading="lazy"`, opacity fade-in on load (`.ld`) so a late load never flashes or shifts the
  text above. Caption shown small/secondary only when non-empty. `ILLU` is in the renderLog
  signature so a new image triggers re-render. **`esc` hardened to also escape `"`** so external
  image URLs/alt are attribute-injection-safe.
- **Single-display removals** (each datum shows in exactly ONE place):
  - Removed the HUD per-turn skill/affinity `(+X)` gains strip (the `renderHudGains` mock) —
    those deltas now live ONLY on the ladder rows. (So the earlier "HUD transient-delta mock"
    question is moot — Alan chose single-display.) Resource pool deltas stay on the pool bars.
  - Removed the entire **Derived** section from the Stats tab (duplicated info). `derive()`
    still runs upstream for the maxes that feed the pools — purely a renderer removal.

Verified in the DOM shim across the wave: equipped (live one-slot, full ordered fill, legacy
fallback, all-empty, `{name,note}`), ladder order+sort (Burst/Channel/Wave/Infusion with the
`(+2)` staying attached), Titles hidden-when-empty / shown-when-present, gain panel compact
render, illustration interleave (2-per-anchor, after-anchor placement, caption present/empty,
lazy+fade, quote-safe external URL, missing-file no-op), and the removals (Stats = Attributes +
Class only, HUD has no gains strip, renderHud still fine).

## Architecture note — atomic state.json publish (iris writer-side fix)

iris composes each turn into `state.json.tmp` and atomically `rename(2)`s it over
`state.json` to kill piecemeal/torn-read updates. This display already satisfies her two
invariants: (1) serve.ts streams `state.json` as a **static file** — it never parses or
caches it server-side (the only server-side parse is of the SEPARATE `actions.json`
sidecar), so the rename stays atomic for free; (2) serve.ts never indexes or cleans the
dir, so a transient `state.json.tmp` is ignored (the browser only ever requests
`state.json` + `actions.json`). The renderer reads iris's whole-turn `*.delta` in one
poll, so an all-at-once swap animates the turn's deltas together — no jumpiness.
