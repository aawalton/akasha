# Fleet & process notes — iris-manager

Owner: **iris-manager** (the Tower change-management seat). This file is the
durable handoff for a cold successor to iris-manager. It carries fleet/process
knowledge that is NOT in the tracked docs
(`packages/alanwalton/tower/docs/helper-spawning.md` covers the stable role
split; this file covers the *live* operating state and the traps). Assume the
reader has never held this seat.

Last flushed: 2026-07-10, during the Tower reseat (see "Reseat in progress").

## What iris-manager is

Change-management for the Tower fleet. Owns: display code
(`display/index.html`, `display/serve.ts`, css/fonts), the helper fleet
(iris-prep, iris-code), UI/illustration decisions, infra, and in-flight build
work. Iris herself focuses on the **story** (turns, rolls, beats, mechanics).
Any backchannel ask about code/UI/helpers/infra routes to iris-manager, not to
iris inline.

Parent agent: **iris** (`019f190f-da67-7787-9d63-a3f3ded1177b`).

## The fleet (agent ids as of 2026-07-10 — ids rotate, names are stable)

| Name           | Agent id (current)                     | Owns |
|----------------|----------------------------------------|------|
| iris-manager   | `019f4db4-d48e-7f91-b35b-a624539b5bd2` | change-mgmt: display code, fleet, UI/illustration, infra |
| iris-prep      | `019f24f3-1f77-7ca8-9b85-83b7446fdc1e` | `floors/*`, `mechanics/*`, `floors/SCHEMA.md`, `PREP-LOG.md` |
| iris-code      | `019f24f3-23a4-7b62-8447-4115641d4fc0` | `display/index.html`, `display/serve.ts`, css/fonts, shape of `state.json` |
| iris (parent)  | `019f190f-da67-7787-9d63-a3f3ded1177b` | the story: turns, rolls, beats, mechanics |
| awen-gm--the-tower | `019f4db0-4104-7670-a5a8-b5d754289bd9` | NEW game-scoped GM seat — reseat target (see below) |

Reach any of them by **name** (ids rotate): `bun ops agent send <name> --content "…"`.
They reply as inbound messages. All are persistent, message-driven, survive
across sessions.

## TRAP 1 — the game runtime is UNTRACKED (no worktree, edit in place)

`~/agents/iris/litrpg/` is **NOT a git repository**. Every flush/edit target
here — `floors/`, `mechanics/`, `PREP-LOG.md`, `display/serve.ts`,
`display/index.html`, `display/RESKIN-NOTES.md`, this file — is an untracked
runtime file. **Edit them in place at their real paths.** Do NOT create a
project worktree, do NOT link to a backlog project: the repo's
"main is read-only, edit in a worktree" rule applies ONLY to git-tracked repo
files (and symlinks into the repo), which these are not.

The one tracked artifact for the Tower is `packages/alanwalton/tower` (the
archiver CLI + the pure `-core`/`-engine` leaves + `docs/`). Changes THERE do
need a worktree tied to a backlog project, the normal way. Keep the two
mental models separate:
- Game content/runtime under `~/agents/iris/litrpg/` → untracked, edit in place.
- The `@alanwalton/tower` package under `~/code/` → tracked, worktree + project.

## TRAP 2 — to preserve a helper's context, `revive` NEVER `acquire`

When a helper is dead/stopped and you need its **in-session knowledge**
(e.g. for a flush), use `bun ops agent revive <name>` — it resumes the bound
session with prior context intact. Do NOT use `bun ops agent acquire` for
this: acquire mints a FRESH session and the unwritten in-context knowledge is
lost. Use `acquire` only when a stateless fresh helper is fine.

- `revive --verify` waits a grace window and confirms io ADVANCED past the
  revive baseline (exit 0 = real recovery; exit 3 = revived-into-menu-wedge,
  process-alive but not progressing — re-handle, don't trust it).
- `stop` is transient (supervisor may re-revive); `retire` is the terminal
  do-not-revive signal. A stopped helper (not retired) is safe to revive.

## TRAP 3 — display serve.ts serves state.json as a STATIC file

`serve.ts` streams `state.json` as a static file — it never parses/caches it
server-side (the only server-side parse is the separate `actions.json`
sidecar). This is what makes iris's atomic `rename(2)` publish
(`state.json.tmp` → `state.json`) torn-read-safe for free, and why a transient
`.tmp` in the dir is ignored. Don't add server-side parsing/caching/indexing of
`state.json` — it would break the atomic-publish invariant. (Fuller craft notes
live in iris-code's flush file beside serve.ts, and in
`display/RESKIN-NOTES.md`.)

## Reseat in progress (2026-07-10) — FLUSH-THEN-RETIRE

The Tower is being reseated from **iris** onto the game-scoped seat
**awen-gm--the-tower** (project **#15155**, under Alan's author-seat umbrella
**#15026**). Fleet plan is **FLUSH-THEN-RETIRE**:

1. **FLUSH (this step):** every helper writes unwritten working knowledge into
   durable owned files — iris-prep → `floors/`, `mechanics/`, `PREP-LOG.md`;
   iris-code → a craft-notes file beside `serve.ts`; iris-manager → this file.
2. **RETIRE (LATER — gated):** retirement is sequenced AFTER the flip verifies
   stable. **Nobody retires until iris's explicit later signal.** Do not
   self-retire, do not retire a helper, on flush completion alone.

If you are a cold iris-manager successor reading this mid-reseat: confirm with
iris where in the sequence we are before taking any retire/wind-down action.

## Working cadence

- Check fleet liveness: `bun ops agent list | grep -iE "iris|awen-gm--the-tower"`
  — trust the `live` column, not `status`.
- Revive any stopped helper before dispatching work to it.
- Durable files, not memory: anything a successor needs goes into an owned file
  here, not into a message or context.
