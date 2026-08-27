---
id: e089d217-8dc7-5870-9826-0f52ff6e063a
page-type-slug: finding
title: "Ar ah attach scope"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17286 (domain: seat-mode) found that rebuilding `ar`/`ah` as attach/detach on the existing supervisor — not relaunching it — narrows to the commands alone (the viewer could not be split from the daemon, per #17285), that `ar`'s cold-start behavior with no running daemon is undecided and is where the code volume actually is, and that four sibling rows converge on one shared `agentFrontFn` shell function needing reconciliation in one pass.

# Evidence

Project #17286 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. Previously carried the viewer AND the two commands (`ar`/`ah`); a delegated exploration established the viewer cannot be separated from the daemon (see #17285) but the commands can — different file, different risk, independently verifiable. This child is now the commands alone.

What changes: `ar` is `agentFrontFn("ar", "resume")` at `packages/shared/cli/src/aw/init/bash.ts:187-263`. Its resume body (`:203-220`) has four steps that exist only because it relaunches: `ops seat takeover` (kills previous holder; an attach must not), `ops seat mark-running` (reattach never writes status), `ops seat transcript` (materializes JSONL for `claude --resume`; attach never resumes), the supervisor launch (becomes a viewer launch). Body collapses from ~18 lines to ~2.

Two consequences: (1) `agentFrontFn`'s two-mode spine, sharing a head/tail between `an`/`ar` on a `mode` discriminant, stops paying for itself once `ar` no longer launches a supervisor. (2) The cold-start path (`ar <name>` with no daemon running) is unspecified and is where the code volume is — refuse, or keep the 18-line body as fallback (nothing deleted, `ar` grows a branch); deciding this is part of this child.

Four sibling rows converge on `agentFrontFn`: #17268 c8 (`/persona-{name}`→`/{name}`, `bash.ts:255`), #17268 c7 (retiring `ops persona compose`, `:229`), #17263 (compound `<persona>-<role>` seat names, `:230`), #17284 (adds `ah` to `functions()`/`functionNames()`; this child retires that implementation).

Success criteria: (1) `ar`/`ah` attach/detach without relaunching supervisor or signalling `claude`; (2) symmetric/repeatable on one session, context intact; (3) cold-start behavior decided; (4) `ah` has one implementation, #17284's composition retired; (5) exit code (`bash.ts:261` `$?`) reaches shell; (6) four sibling edits reconciled in one pass.
