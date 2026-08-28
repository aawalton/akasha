---
page-type-slug: finding
slug: three-entry-points-have-nowhere-to-put-a-writer
title: "Three write entry points have nowhere to put a writer, and thirteen callers bypass the one a writer would be added to"
domain-slug: domain/page-writes-system
---

# Claim

Three entry points into a page or its sidecar have nowhere to put a writer: `patchState` and `rowAppender` reach the disk without ever reaching `commitAll`, and `patchUncommitted` takes no writer at all and is reached directly by thirteen call sites that a writer added to `patchState` would not touch.

# Evidence

Read 2026-08-28.

`patchState` at `tools/lib/page-write.ts:136` writes page state into an uncommitted sidecar through `patchUncommitted` and never reaches `commitAll` or `landOne`. It writes no row, so a writer key on the rows shape does not reach it.

`rowAppender` at `tools/lib/page-rows-write.ts:281` takes `roots`, `pageType`, `parentName` and `key` and no `by`; the word does not occur anywhere in its body through `:326`, and it writes with `appendFileSync` at `:319`, beneath the landing path and committing nothing. Its one caller today is `tools/lib/log-append.ts:62`. The row itself is the only place a writer could go, and `LogLine` at `tools/lib/log-append.ts:14` already carries an `agent-id` slot of exactly that shape. By contrast `rowsWritten` at `:235` and `rowsLanded` at `:247` each take a `by` and hand it to `commitAll`.

`patchUncommitted` at `page/uncommitted/uncommitted.ts:105` takes a page path and values and no writer, and thirteen call sites reach it directly rather than through `patchState` — `tools/lib/message-file.ts:254`, `supervisor-iteration-outcome-db.ts:42`, `supervisor-heartbeat-beat.ts:75`, `seat-record.ts:33`, `seat-proxy-state.ts:39` and `:49`, `seat-control.ts:34` and `:40`, `oauth-usage.ts:76`, `oauth-page-push.ts:101` and `:132`, and `services/send-due-reminders.ts:82` and `:94`. A writer added to `patchState` reaches none of them.

That there are two row-write paths at all is recorded separately at `pages/finding/pages-system/row-append-writes-beneath-the-landing-path.finding.md`.
