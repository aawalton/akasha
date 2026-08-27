---
id: debd1942-e768-5800-a927-b03a667687cc
page-type-slug: finding
title: "Subagent pin lands on the seat"
domain-slug: barred-meaning/pin
---

# Claim

A pin taken inside a Claude Code `Agent` subagent writes into the dispatching seat's own bucket, `tools/pin.ts` resolving the actor as `AGENT_ID` and a subagent inheriting its seat's verbatim. A delegate that adopts a task therefore repins its dispatcher. `tools/lib/pin-help.ts` tells its reader that a subagent pinning one of its own overrides its seat's for that axis, and no key in the store spells a subagent.

# Evidence

Measured 2026-08-05 by `claude-task-developer`, firsthand.

Dispatched an `Explore` subagent from this seat with two commands and nothing else. `env` inside it returned `AGENT_ID=019fd271-3227-74de-97fc-27b03e848162` and `CLAUDE_CODE_SESSION_ID=3cbd628c-...`, both identical to this seat's; `CLAUDE_CODE_CHILD_SESSION=1` was the only variable marking it as a session within one. `bun ~/instructions/tools/pin.ts --show` from inside it printed this seat's four axes verbatim.

A second `Explore` subagent ran `bun ~/instructions/tools/pin.ts --seq 99999`. The value landed in `~/.instruction-pins/019fd271-3227-74de-97fc-27b03e848162.json` — this seat's file — as `"seq":{"value":"99999"}`, and no new bucket appeared. This seat cleared it with `--clear seq`; the store is as it was.

`tools/pin.ts:148` is `const agent = args.agent ?? agentId()`, and `tools/lib/read-log.ts:63` resolves `agentId()` as `AGENT_ID` then `CLAUDE_CODE_SESSION_ID`. `tools/lib/pins.ts` spells a subagent bucket `<seat>--<sub>` and parses it in `seatOf`, but no caller in `tools/` composes one; `~/.instruction-pins/` holds 1331 buckets and 0 carrying the mark.

`tools/lib/pin-help.ts:94`, printed by `--help`: "A subagent with no pin of its own reads its seat's, and pinning one of its own overrides that for that axis alone."

Not measured: whether an axis rather than `--seq` behaves the same — only `--seq` was written, being the key nothing gates on and the one this seat held empty. The four slug axes were not touched, so the clobber is established for the store and inferred for `--task`. Not measured: whether any subagent has in fact repinned a dispatcher in the wild; no instrument would carry it.
