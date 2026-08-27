---
id: df5e7ae1-faa0-5c9b-a3b3-a6baf936b83d
slug: seat-name-rule-pod-blocked
page-type-slug: finding
title: "Seat name rule pod blocked"
domain-slug: domain/agent-harness
---

# Claim

The seat-name reading rule's move into the instructions repository is blocked because `coldStartHandlerSeat` mints a composed seat name inside the web pod, which mounts no instructions tree, so a command call across that boundary once threw inside `mintNamedAgent` and deleted the row it had just minted; the lead's 2026-08-12 ruling narrows what still moves to the shape question, pre-clearable at corpus level only if every segment of a pod-minted name comes from corpus data alone.

# Evidence

Project #18891, domain agent-harness, initiative harness-in-instructions, status awaiting_worker_seat, live-on deploy. Lifted from #18836's criterion three (2026-08-12), blocked on an agent-runtime decision; #18836 keeps its other two criteria, runs first — both rows in `packages/agents/shared`, one seat at a time.

Four objectives stood open: (1) the rule lives only in the instructions repo, `read-seat-name.ts` gone; (2) the bind checks shape only for names from outside, over every `decideAgentNameBind` caller; (3) a name minted with no instructions tree was proven readable before publish, via a vocabulary set refusing ties at projection, not the bind; (4) the bind keeps its other three refusals (prefix resolution, protected human, live prior holder) unchanged.

BLOCKER, lead-verified: the mint chain `coldStartHandlerSeat`...`readSeatName` (`setAgentName` at `db-agent-rename.ts:267`, `parseComposedIdentity` at `agent-name-grammar.ts:288`) runs in the web pod: no instructions tree mounted, no `INSTRUCTIONS_ROOT`. The readers throw on an absent directory; this once deleted a row `mintNamedAgent` had just minted (`seat-vocabulary-rows.ts`). The pod also mints a SEAT name, closing that escape.

RULING 2026-08-12: leaving the rule in code was refused (`Single Authority`); a deferred criterion becomes unmeetable. Only the shape question moves: if every name segment comes from corpus data alone, a tying vocabulary set is a corpus fault, checkable once at `ops seat project-seat`; otherwise re-cut this row. `seat-vocabulary-rows.ts` feeds the shape check; its `person` vocabulary is corpus data, not enrolled rows, so an un-enrolled person still gets a seat.

`project-binding.ts` comes here whole, ruled 2026-08-12: holds `parseProjectSeqFromName` (this row's grammar) and `TERMINAL_PROJECT_STATUSES`/`isTerminalStatus`, answered at `tools/project-statuses.ts`; splitting was refused. 3 importers wait: `capacity.ts`, two on the re-export (line 96); terminal-status lands first.
