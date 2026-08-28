---
page-type-slug: finding
slug: no-row-write-call-site-cannot-name-its-writer
title: "Of 53 row-write call sites none is unable to name its writer, and the patch-state arm drops one it already holds"
domain-slug: domain/page-writes-system
---

# Claim

Of the 53 row-write call sites, 40 already pass a writer, 13 could name one, and none cannot — and on the `patch-state` path a writer is already demanded by the refusal at `tools/lib/page-query-landing.ts:89-92` and then dropped one call short of the disk at `:34`.

# Evidence

Measured 2026-08-28 across all 53 call sites of `writeRow`, `patchRow`, `writeRows`, `patchRows`, `removeRow`, `rowAppender` and `patchState`: 40 pass a writer already, 13 could name one, and none cannot.

Of the 13, one already holds the writer as a local and does not pass it (`tools/lib/page-query-landing.ts:34`), one holds it as a parameter one frame up (`tools/lib/log-append.ts:62`, which has `seatName`), and five are workstation services whose own name is the writer, as 40-odd sibling modules already spell it. So a refusal on a write that cannot name its writer would not fire on ordinary work.

`tools/lib/page-query-landing.ts:89-92` refuses any write whose body does not name a `writer`, with the reason "a write names its `writer`, which lands in the commit that records it", and `landedFor` passes it to every other act. At `:34` the `patchState` arm alone leaves it out. Nothing has to be found for that one: the writer is thrown away one call short of the disk.

One source must not be used. `writerId()` at `agent/writer.ts:21` returns null outside a seat, and `ci-orchestrator`, `ci-container-dispatcher` and `main-pipeline-creator` all reach `patchState` from `services/` with no seat at all. A refusal resting on it would break unattended CI on the first tick.
