---
id: 33ad9ab8-35a8-546b-9bd2-3c72ee8a2894
page-type-slug: finding
title: "Six write paths put a code-path name in the agent slot, and that is what keeps their children fail-closed"
slug: write-paths-put-a-code-path-name-in-the-agent-slot
domain-slug: domain/read-record
---

# Claim

Six write paths spawn a child with a code-path name in `AGENT_ID` and the delegate cleared. The name resolves to no agent, so the child records no reading and cannot pass `read-before-write`; these writes land only because they are mechanical. The fabrication is what keeps them fail-closed, and replacing it with a real agent would credit that agent with having read pages a program composed.

# Evidence

Taken 2026-08-28 at akasha `899d7825d5`.

The shape is a write-path name in `AGENT_ID` with `ACTING_AGENT_ID` cleared: `tools/lib/gated-write.ts:37`, `tools/lib/gated-landing.ts:40-41`, `tools/lib/message-file.ts:111`, `services/sweep-seat-pages.ts:131`, `services/sweep-log-days.ts:123`, `monarch/land-files.ts:233`, and in-process at `services/main-pipeline-creator.ts:80-81`.

`agentPageFor` at `agent/read-record.ts:125-133` splits on `--`; a name carrying none falls to `seatPageWithId`, which finds nothing. So `readRecordFor` is null, `read-before-write.check.code.attachment.ts:110-118` refuses every path as `agent-page-absent`, and `recordReadBy` at `agent/record-read.ts:123-125` records nothing. These calls land only because they are mechanical: `rm.command.code.attachment.ts:201` passes it, seat writes pass `--mechanical`, and `checks-system/run/gate.ts:64,111` drops both `needsAuthor` checks and nulls `act`.

`writerId` at `agent/writer.ts:21-26` reads `AGENT_ID` and `ACTING_AGENT_ID`, never `PAGE_WRITER`. One child, the astra seat, three environments:

- `AGENT_ID=seat-page-writer`, acting cleared: writerId `seat-page-writer`, page null, author `Claude <noreply@anthropic.com>`.
- `PAGE_WRITER=seat-page-writer`, acting inherited: writerId `<seat>--a4c5e070c5524e1d5`, page `agent/subagent/astra--a4c5e070c5524e1d5.subagent.md`.
- `PAGE_WRITER=seat-page-writer`, acting cleared: writerId `<seat>`, page `agent/seat/astra.seat.md`, author `Astra <astra@alanwalton.com>`.

`writerOf` answers `seat-page-writer` in all three, so a repair judged on that function alone reads as inert.

A repair must decide the read-record and commit-author consequences on purpose rather than absorb them.
