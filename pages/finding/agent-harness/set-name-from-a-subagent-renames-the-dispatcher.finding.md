---
id: 9d8790a8-b992-515a-9dc1-e7a7c8a1a9f4
page-type-slug: finding
title: "Set name from a subagent renames the dispatcher"
domain-slug: domain/agent-harness
---

# Claim

`ops seat set-name` run from a Claude Code `Agent` subagent renames the DISPATCHER, because the verb resolves its caller as `AGENT_ID` and a subagent inherits its seat's verbatim; the verb's own help enumerates four refusals and this is not among them, so a seat reading that list reads it as the set of ways the call can go wrong.

# Evidence

Measured 2026-08-07 by `claude-instruction-archivist-flex-442-ingest-instructions`, firsthand, while ingesting `dirty/skills/purge/SKILL.md`, whose `# Boot` section asserts this hazard in passing.

The identity, reproduced here: an `Explore` subagent dispatched from this seat with two read-only commands returned `AGENT_ID=019fdda0-0c84-726d-afe6-685286e0e669` and an `ops seat whoami` reporting `name=claude-instruction-archivist-flex-442-ingest-instructions` — this seat's own id and name, from inside the delegate.

The resolution, in code. `packages/agents/cli/src/agent/set-name.ts:108` is `const agentId = resolveAgentId(parsed.string("--agent-id"))`, whose default the verb's `Environment` block gives as `AGENT_ID`; line 111 fetches that row, line 116 is `await setAgentName(agentId, name)`. Nothing between them discriminates a subagent, and no environment key the verb reads spells one.

The list that reads as exhaustive. `set-name --help`: "Four names are refused outright: one the resolver cannot route by name, a real person's handle, one matching no declared name shape at all, and one shaped like a dispatch seat. The refusal names which of the four it hit." All four are predicates over the NAME. None is over the CALLER, so this call passes them and lands.

`tools/lib/seat-rename.ts` states what a wrong name costs: "a name that no longer describes is a lie and a misdirection at once."

NOT MEASURED, deliberately: I did not run `set-name` from a subagent, since that renames this live seat. The write half rests on the code path and the help; the identity it resolves on is observed.

`pages/finding/pin/subagent-pin-lands-on-the-seat.finding.md` establishes the same AGENT_ID inheritance for `tools/pin.ts`. Filed beside it, not as a duplicate: different verb, a destructive rather than a recoverable write, and a help enumerating its refusals as a closed set of four.
