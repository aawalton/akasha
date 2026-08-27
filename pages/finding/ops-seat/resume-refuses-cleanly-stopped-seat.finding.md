---
id: 3d197ea7-9fdc-5f97-a5c7-9297acdb79aa
slug: resume-refuses-cleanly-stopped-seat
page-type-slug: finding
title: "A seat that stopped cleanly cannot be resumed, though its attributes stand in the memory repo's history"
domain-slug: domain/ops-seat
---

# Claim

`ops seat resume` refuses a seat that stopped cleanly, which is the case the
command exists for. Both identifiers its target resolution reads are taken away
by the stop: the seat page, and the agent directory holding the spawn state.

The attributes the relaunch needs still stand in the memory repository's
history, and `ops seat whoami` already reads a stopped seat from there.

`ops seat stop`'s help states that `ops seat resume` "is available on every
stopped seat", so the two disagree.

# Evidence

Measured on two throwaway probe seats started for this purpose.

Probe `01a02593-6fe9-7000-ad67-9f63be9021ad`, headless, live: `ops seat resume`
cycled it in place and printed `restarted` in 28s. `ops seat stop` then printed
`stopped`; four seconds later `/var/home/walton/agents/<id>/` was gone and the
seat page was taken. `ops seat resume <id>` answered `No agent found matching
'01a02593-…'`. Probe `01a0258f-93e2-7000-a8ff-87154fb256fc`, which stopped
itself, reached the same state and the same refusal.

The refusal is raised at `tools/lib/relaunch-target.ts`, whose
`resolveRelaunchTarget` returns that error where `seatPageForAgent(agentId)` and
`readSpawnStateById(agentId)` are both null. `tools/lib/seat-page-history.ts`
already exports `nameFromHistory`, `sessionFromHistory`, `parentFromHistory` and
`frontmatterFromHistory` over the memory repo's git history.

NOT CAUSED BY THE MERGE at faa7b9869. `git show faa7b9869^:tools/lib/relaunch-target.ts`
carries the same refusal, and the removed `ops seat restart` called the same
resolver at its line 136, so both commands failed this way before they became
one.

The directory removal is `installAgentDirCleanupHook` in
`tools/lib/supervisor-agent-dir-cleanup.ts`, called from
`tools/lib/supervisor-interactive-boot.ts:76` on `process.on("exit")`. That file
dates to 2026-08-18 and the call site appears from 2026-08-12.

NOT MEASURED: how a message-driven revive resolves a stopped seat, and so
whether the recipient-resolver reaches a path this one misses. Whether the 8771
directories standing under `~/agents` are seats whose supervisors never exited
cleanly, or predate the hook, was not established — so how much of the fleet is
reachable by resume today is unmeasured, and the two probes may not be typical.
