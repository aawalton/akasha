---
id: 81787351-aa8f-4283-acba-a950dd4afcd3
slug: nothing-tests-that-a-reset-reaches-the-record-on-disk
page-type-slug: finding
title: "Nothing tests that a reset reaches the record on disk"
domain-slug: domain/read-record
---

# Claim

No test asserts that `resetReadings` writes anything to the read record. It is the whole action of the `SessionStart` hook at `tools/hooks/agent-hook-record-epoch.agent-hook.code.attachment.ts:19`, so a change leaving it writing nothing would pass every test that stands.

The one case that covered it asserted the record file is emptied. That states the retention replaced at `f4c7d97b1`, where an expired entry is kept one epoch and stamped rather than deleted, and it was deleted at `7ea999833` rather than reworded, a reworded assertion being a repair of a test that fails while nothing is wrong.

The file already disagreed with itself. Four lines above the deleted case, `tools/tests/read-record.on-demand.test.ts:43` asserts a read taken before a replacement "does not vouch, though its record is still there" — the record standing while the vouching stops, which is exactly the design the deleted case denied. That case passes untouched. Both assertions were written and the disagreement was not noticed.

# Evidence

Measured 2026-08-28 against akasha at `fdf390a31`. `resetReadings` is defined at `agent/record-read.ts:84` and wrapped at `tools/lib/read-record.ts:85`. Searching the repository for either name outside those two definitions and the hook returns nothing, the one test that named it having been deleted.

The gap is deliberately left open. A test written now to cover a hole opened by the same change that opened it confirms that change rather than guarding against the next one.
