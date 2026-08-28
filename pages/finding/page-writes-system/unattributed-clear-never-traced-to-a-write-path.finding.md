---
id: c468d410-3645-44ba-a0bd-220fe71b0386
slug: unattributed-clear-never-traced-to-a-write-path
page-type-slug: finding
title: "The unattributed clear was never traced to a write path"
domain-slug: domain/page-writes-system
---

# Claim

One write cleared a user-authored field without recording who made it, and the path that made it was never found. Alan confirmed the clear was his own and deliberate, so nothing was lost — the defect is that nothing could tell his edit from anyone else's. The sweep for other instances was never run. The evidence that could have identified the path has since been deleted with the Postgres pages layer, so this instance can no longer be attributed by anyone.

That much is archival, and it is the smaller half. The successor question is live and measured below: across every rows sidecar in akasha, taken 2026-08-28, 91.0% of 4,563,109 rows carry the writing agent's own id and the rest carry no writer of any spelling, and of the 53 row-write call sites 40 already pass one, 13 could, and none cannot. This page closes when every path into a page or a sidecar carries a writer — not by anyone re-attributing the 2026-07-24 clear, which nothing can.

# Evidence

Observed 2026-07-24 on page `019f5183-6045-7bb8-b382-8f77fdf4e1b3` (persona, slug `alan`), field `alanNotes`. Found by accident: awen asked whether Alan's correction pass had landed, and answering that needed key-level history rather than `updatedAt`.

Between 11:19:49Z and 11:20:24Z, eight versions, each stamping `actor` with Alan's user id — the signature of typing in a rich-text editor. Then at 11:38:33Z, one version with `actor` empty, no other edit of his that morning lacking one, whose patch set `alanNotes` to a single empty paragraph while the prior value stood in `oldValues` — his own working list, not agent-generated.

`userId` could not discriminate: it was the tenant owner on every row rather than the writer, so it was identical on both writes. `actor` was the only discriminator and it was empty.

Resolved as to harm on 2026-07-25T11:50:15Z, Alan confirming "No — I cleared it deliberately, leave it." No data loss on this instance. That is what makes it worth keeping rather than what makes it disposable: the observation is not that content was destroyed, it is that a clear of user content and a deliberate user edit were indistinguishable after the fact.

THREE THINGS WERE LEFT UNDONE and none was picked up. Which write path skipped the actor stamp was never identified. Whether an unattributed write to a user-authored field should be refused at the boundary rather than merely recorded was never decided. And the sweep across other pages and users was never run — one instance found by accident is weak evidence of frequency, and this page alone carried 376 `alanNotes` versions, so the population was never counted.

THE FORENSIC HANDLE, written down at the time and still the thing to look for: the empty-paragraph payload is the signature. A write whose patch sets a rich-text field to a single empty paragraph, with prior content in `oldValues` and no actor, is the shape.

WHAT CAN NO LONGER BE DONE. The original instance is unattributable now. `public.pages` and `page_versions` are gone with the Postgres pages layer, along with `ops page history` and `ops page revert`, which is how the timeline above was read; `git grep` finds both table names only inside other findings' prose and in no live code. No sweep of the old store can be run. This is a historical reading, and it stays true — the repair that would have closed it is what is unavailable, not the account.

WHERE THE CONCERN RETURNS. The successor question is whether every write into a page or its sidecar records who made it. Read 2026-08-28 against `tools/lib/page-rows-write.ts`: `rowsWritten` at `:235` and `rowsLanded` at `:247` each take a `by` and hand it to `commitAll`, so the landing path carries a writer. `rowAppender` at `:281` takes `roots`, `pageType`, `parentName` and `key` and no `by`, and the word does not occur anywhere in its body through `:326`; it writes with `appendFileSync` at `:319`. Its one caller today is `tools/lib/log-append.ts:62`. That there are two paths at all is recorded separately at `pages/finding/pages-system/row-append-writes-beneath-the-landing-path.finding.md`; this finding is about what an unattributed write costs when someone later tries to say who made it.

THE SWEEP HAS BEEN RUN. Taken 2026-08-28 over every rows sidecar in akasha: 11,573 files, 4,563,109 rows, and **4,151,469 of them carrying `agent-id`** — 91.0%, the writing agent's own id, put on the row by `tools/lib/supervisor-console.ts:71` and standing on the `.lines` sidecars under `pages/seat-log-day/`. The other 9% carry no writer at all: across the 458 distinct top-level keys in the population, `by`, `writer`, `written-by`, `writtenBy`, `actor`, `author`, `agentId` and `seat` stand on no row. `owner` stands on 8 rows in `pages/daily-tracking/*.sessions.jsonl`, and there, like `claimed-by-slug`, it is a domain property of what the row is about rather than a record of who wrote it.

WHERE A ROW IS ATTRIBUTED IT IS NOT `by` THAT DOES IT. `by` never enters a row. `idStamped` at `tools/lib/page-rows-write.ts:118` adds `id` and nothing else, and `by` reaches exactly two places in that file — `commitAll` at `:270` and `:419` — where `messageFor` in `tools/lib/page-write-commit.ts:18` folds it into a git commit subject. So the attribution `by` carries lives in git history alone, and only for rows that are committed: most rows stand in `.uncommitted` sidecars that are never committed, and `rowsLanded` at `:269` skips `commitAll` for them, which makes the `by` argument dead on that path. The 91% that are attributed are attributed the other way, by the appending caller putting its own id in the row through the `agent-id` slot `LogLine` declares. Those two are separate mechanisms, and neither reaches the other's rows.

WHAT A REFUSAL WOULD COST, measured 2026-08-28 across all 53 call sites of `writeRow`, `patchRow`, `writeRows`, `patchRows`, `removeRow`, `rowAppender` and `patchState`: 40 pass a writer already, 13 could name one, and **none cannot**. Of the 13, one already holds the writer as a local and does not pass it (`tools/lib/page-query-landing.ts:34`), one holds it as a parameter one frame up (`tools/lib/log-append.ts:62`, which has `seatName`), and five are workstation services whose own name is the writer, as 40-odd sibling modules already spell it. So a refusal on a write that cannot name its writer would not fire on ordinary work.

TWO THINGS MUST BE SETTLED BEFORE THAT REFUSAL LANDS, because two entry points have nowhere to put a writer. `patchState` at `tools/lib/page-write.ts:136` writes page state into an uncommitted sidecar through `patchUncommitted` and never reaches `commitAll` or `landOne`; it writes no row, so a writer key on the rows shape does not reach it. `rowAppender` at `tools/lib/page-rows-write.ts:281` appends with `appendFileSync` beneath the landing path and commits nothing; the row itself is the only place a writer could go, and `LogLine` at `tools/lib/log-append.ts:14` already carries an `agent-id` slot of exactly that shape. Requiring a writer on either without first settling where it lands buys nothing.

A THIRD ENTRY IS WIDER THAN BOTH. `patchUncommitted` at `page/uncommitted/uncommitted.ts:105` takes a page path and values and no writer, and thirteen call sites reach it directly rather than through `patchState` — `tools/lib/message-file.ts:254`, `supervisor-iteration-outcome-db.ts:42`, `supervisor-heartbeat-beat.ts:75`, `seat-record.ts:33`, `seat-proxy-state.ts:39` and `:49`, `seat-control.ts:34` and `:40`, `oauth-usage.ts:76`, `oauth-page-push.ts:101` and `:132`, and `services/send-due-reminders.ts:82` and `:94`. A writer added to `patchState` reaches none of them.

ON THE `patch-state` PATH A WRITER IS ALREADY DEMANDED AND THEN DROPPED. `tools/lib/page-query-landing.ts:89-92` refuses any write whose body does not name a `writer`, with the reason "a write names its `writer`, which lands in the commit that records it", and `landedFor` passes it to every other act. At `:34` the `patchState` arm alone leaves it out. Nothing has to be found for this one: it is thrown away one call short of the disk.

ONE SOURCE MUST NOT BE USED. `writerId()` at `agent/writer.ts:21` returns null outside a seat, and `ci-orchestrator`, `ci-container-dispatcher` and `main-pipeline-creator` all reach `patchState` from `services/` with no seat at all. A refusal resting on it would break unattended CI on the first tick.

IT IS CLOSED when every path into a page or a sidecar carries a writer. The count is now taken and stated, so that half is done. Old rows keep no writer and are not backfilled: nothing records who wrote them, and a guess written into 4,281,958 rows would read exactly like a record.

PROVENANCE. This stood until 2026-08-28 as `unattributed-write-clears-user-content` under `domain/pages-system`, id `4d658dde-26d8-5a05-9a7f-32ef57a80752`, deleted at `98cee3137` with its content carried onto `pages/initiative/astra-pages-system-service.initiative.md` as an intent that every write carry who made it. An intent that writes must carry a writer does not answer what made this one, and an initiative is deleted once its intents are met. Filed as a new record rather than the old one restored, and under `page-writes-system` rather than `pages-system`, because the question is about the write path and that is where whoever could answer it is reading.
