---
id: eb03e653-855b-4c33-be60-1d3dc8ec4e1f
slug: an-expired-reading-is-refused-as-a-reading-that-never-happened
page-type-slug: finding
title: "An expired reading is refused as a reading that never happened"
domain-slug: domain/pages-system
---

# Claim

`ops read` records the file you ask for. The reported asymmetry — that pushed required reading records reliably while the asked-for file lapses — is real, but it is not a recording failure. It is a deletion that only the asked-for file can show.

Required reading is re-pushed and re-stamped on every read. `ops-cli/global/read/read.command.code.attachment.ts:186` works out the required set for whatever paths were named, `:205` queues it behind them, and `:248-250` records every file the call printed, one already on record included, whose `seenAt` moves to now. A file you name is stamped only by the call that names it. So a required document's reading is renewed by any later read of anything that warrants it, and an asked-for file's reading only ages. Where something deletes a whole record, the required set is back within one read and the asked-for file is not.

Two things delete a whole record. For a seat it is the cutoff: `agent/read-record.ts:169-178` hides every entry whose `seenAt` is not later than `context-replaced.at`, and `agent/record-read.ts:18-25` deletes those entries from disk the next time the record is written. `tools/lib/epoch.ts:15-17` stamps that mark with `Date.now()`, called from `SessionStart` at `tools/hooks/agent-hook-record-epoch.agent-hook.code.attachment.ts:18-19`, and `tools/lib/epoch.ts:24-27` waives it only for `resume`. A compact therefore expires every reading taken before it. For a delegate the cutoff is inert — no `agent/subagent/*.uncommitted.yaml` exists — and the record goes instead with the page, as `pages/finding/read-record/delegate-read-records-are-deleted-each-turn.finding.md` sets out.

The defect is what the gate says afterwards. `checks-system/check/read-before-write/read-before-write.check.code.attachment.ts:56` answers a null reading with `file-never-read`, whose whole text opens "You have not read `{path}`". Where the reading expired, the agent did read it, and on the seat path the record still holds the entry. This repository already has words for that case: `pages/refusal/seat-documents-unread-after-context-loss.refusal.md` says "Your context was replaced at {when} (`{source}`), which discarded every read you had made." The target arm of `read-before-write` has two refusals, never-read and changed-after-read, and none for expired, so it reaches for the one that is false. An agent told it never read a file it read, while the record on disk names the reading, learns to distrust the gate.

`ops read` is silent about the other half. `ops-cli/global/read/read.command.code.attachment.ts:201` resolves the agent page and `:248` guards recording on it, but the only line about identity is `:195-200`, for a missing writer id. A delegate whose page has been removed gets the body printed and nothing recorded, with nothing said.

# Evidence

Measured 2026-08-27 against akasha at `884c32d9f`, as delegate `01a04357-3025-7000-b40c-ef42fdbc377e--a10b0e4f22e3300fb`, whose record is `agent/subagent/astra--a10b0e4f22e3300fb.subagent.readings.uncommitted.attachment.json`. Six `ops read` calls, none piped.

Every asked-for file landed. `agent/read-record.ts` and `agent/record-read.ts`, asked for together, were both in the record at `seenAt` 23:36:47.531, as were `agent/read-one.ts` at 23:40:19.588 and the two check files at 23:37:07. No asked-for file failed to record in any call.

Renewal is what differs. `pages/repo/akasha-repo.repo.md` is required reading for every akasha file, so every call pushed it: its `seenAt` moved 23:36:47.531, 23:39:25.484, 23:40:19.588, 23:43:02, once per call. Across those same calls `agent/read-record.ts` and `agent/record-read.ts` stayed at 23:36:47.531, and `pages/domain/global.domain.md`, pushed only by `--seat`, stayed at 23:36:21.515.

The prune reproduces in one process, so concurrency is not needed for it. Calling `recordRead` and `flushReadings` from `agent/record-read.ts` against a scratch page: entries `/A-asked-for` and `/R-required` written at `seenAt` 100 with cutoff 0 both land; a second pass with cutoff 150, writing `/B-asked-for` at 200 and re-stamping `/R-required` at 200, leaves the record holding `/B-asked-for@200` and `/R-required@200` only. `/A-asked-for` is gone, and nothing reported its removal.

Ruled out. The answer ceiling: `ops-cli/global/write/write.command.code.attachment.ts` is 14601 bytes over 356 lines and `repo/land/land.ts` is 14939 over 465, so each prints near 17000 to 18000 characters against a ceiling of 28000 and neither is refused nor left behind when read alone. A resolver disagreement between `agent/read-record.ts:122-130` and `tools/lib/agent-page.ts:5-9`: both return `agent/subagent/astra--a10b0e4f22e3300fb.subagent.md` for this writer id. The cutoff reaching delegates: `replacedAt` returns 0 for every subagent page, there being no uncommitted sidecar beside one.

Both failure directions were tested. A record persisting over a changed body was not found on the target arm: `:58` compares with `bodyItself`, which is oid equality against the body before the change, so a file that moved cannot pass. On the required arm `:76` compares with `sameBody`, which accepts `mechanicalOid`, and `agent/record-read.ts:102-105` and `:118-145` rewrite that field on every agent page when a mechanical move lands, so a required document a program rewrote counts as read by an agent that never saw the new body. `checks-system/check/read-before-write/read-before-write.check.md:18` states that as intended.
