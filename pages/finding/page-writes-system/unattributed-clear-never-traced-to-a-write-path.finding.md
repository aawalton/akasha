---
id: c468d410-3645-44ba-a0bd-220fe71b0386
slug: unattributed-clear-never-traced-to-a-write-path
page-type-slug: finding
title: "The unattributed clear was never traced to a write path"
domain-slug: domain/page-writes-system
---

# Claim

One write cleared a user-authored field without recording who made it, and the path that made it was never found. Alan confirmed the clear was his own and deliberate, so nothing was lost — the defect is that nothing could tell his edit from anyone else's. The sweep for other instances was never run. The evidence that could have identified the path has since been deleted with the Postgres pages layer, so this instance can no longer be attributed by anyone.

# Evidence

Observed 2026-07-24 on page `019f5183-6045-7bb8-b382-8f77fdf4e1b3` (persona, slug `alan`), field `alanNotes`. Found by accident: awen asked whether Alan's correction pass had landed, and answering that needed key-level history rather than `updatedAt`.

Between 11:19:49Z and 11:20:24Z, eight versions, each stamping `actor` with Alan's user id — the signature of typing in a rich-text editor. Then at 11:38:33Z, one version with `actor` empty, no other edit of his that morning lacking one, whose patch set `alanNotes` to a single empty paragraph while the prior value stood in `oldValues` — his own working list, not agent-generated.

`userId` could not discriminate: it was the tenant owner on every row rather than the writer, so it was identical on both writes. `actor` was the only discriminator and it was empty.

Resolved as to harm on 2026-07-25T11:50:15Z, Alan confirming "No — I cleared it deliberately, leave it." No data loss on this instance. That is what makes it worth keeping rather than what makes it disposable: the observation is not that content was destroyed, it is that a clear of user content and a deliberate user edit were indistinguishable after the fact.

THREE THINGS WERE LEFT UNDONE and none was picked up. Which write path skipped the actor stamp was never identified. Whether an unattributed write to a user-authored field should be refused at the boundary rather than merely recorded was never decided. And the sweep across other pages and users was never run — one instance found by accident is weak evidence of frequency, and this page alone carried 376 `alanNotes` versions, so the population was never counted.

THE FORENSIC HANDLE, written down at the time and still the thing to look for: the empty-paragraph payload is the signature. A write whose patch sets a rich-text field to a single empty paragraph, with prior content in `oldValues` and no actor, is the shape.

WHAT CAN NO LONGER BE DONE. The original instance is unattributable now. `public.pages` and `page_versions` are gone with the Postgres pages layer, along with `ops page history` and `ops page revert`, which is how the timeline above was read; `git grep` finds both table names only inside other findings' prose and in no live code. No sweep of the old store can be run. This is a historical reading, and it stays true — the repair that would have closed it is what is unavailable, not the account.

WHERE THE CONCERN RETURNS. The successor question is whether every write into a page or its sidecar records who made it. Read 2026-08-28 against `tools/lib/page-rows-write.ts`: `rowsWritten` at `:235` and `rowsLanded` at `:247` each take a `by` and hand it to `commitAll`, so the landing path carries a writer. `rowAppender` at `:281` takes `roots`, `pageType`, `parentName` and `key` and no `by`, and the word does not occur anywhere in its body through `:326`; it writes with `appendFileSync` at `:319`. Its one caller today is `tools/lib/log-append.ts:62`. That there are two paths at all is recorded separately at `pages/finding/pages-system/row-append-writes-beneath-the-landing-path.finding.md`; this finding is about what an unattributed write costs when someone later tries to say who made it.

TO CLOSE THIS, run the sweep that was never run, against the store that exists now: count the writes into rows files that record no writer and state the number rather than leaving it unknown. `grep -n 'export function rowAppender' tools/lib/page-rows-write.ts` names the one entry point without a writer today, and `grep -rn 'rowAppender' tools/ --include='*.ts'` names its callers. It is closed when every path into a page or a sidecar carries a writer, and when that count has been taken and stated. It is not closed by the old layer having been deleted.

PROVENANCE. This stood until 2026-08-28 as `unattributed-write-clears-user-content` under `domain/pages-system`, id `4d658dde-26d8-5a05-9a7f-32ef57a80752`, deleted at `98cee3137` with its content carried onto `pages/initiative/astra-pages-system-service.initiative.md` as an intent that every write carry who made it. An intent that writes must carry a writer does not answer what made this one, and an initiative is deleted once its intents are met. Filed as a new record rather than the old one restored, and under `page-writes-system` rather than `pages-system`, because the question is about the write path and that is where whoever could answer it is reading.
