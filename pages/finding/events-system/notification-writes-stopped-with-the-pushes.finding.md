---
id: d796f620-6014-50f0-a05d-489f052023b6
slug: notification-writes-stopped-with-the-pushes
page-type-slug: finding
title: "The last notification written and the last one pushed are the same event"
domain-slug: domain/global
---

# Claim

The push silence is not writes continuing into a dead delivery path. `notify()` no longer writes a `public.pages` row at all — it writes a row into a file — and that file has taken no new row since 2026-08-19T16:00:02.411Z, the same instant as the last push. The producing side stopped when delivery did. Reading the feed's 2,295 rows as an ongoing rate suggests notifications are written and lost, which is not what the file shows.

# Evidence

Measured 2026-08-20 around 15:47Z by reading files and git history in the memory and code repos. I did not query the database and started nothing.

`notify()` at `code:packages/shared/notifications/src/notify.ts:54-72` resolves the feed by user-id and calls `writeRow` from `@shared/pages-query`, an HTTP page-write producing a file row. It touches `public.pages` nowhere, so it raises no page event.

The feed is `notification-feeds/alan.notifications.jsonl`, 2,295 rows. `git show --numstat 62ffe63dc` reads 2295 added and 0 deleted in ONE commit at 2026-08-19 21:57:57 -0600. It is a backfill, not an append log. The only later commit touching it, `aa4bf6f5a` at 2026-08-20 05:42:33 -0600, reads 2295 added and 2295 deleted, a full rewrite for a `sent-at` backfill that added no notification.

The newest `sent-at` is 2026-08-19T16:00:02.411Z. The working tree, `HEAD` and `origin/main` all read 2,295 rows ending on that row, so no unpushed or unpulled state hides a newer one. Daily counts run 41, 36, 27, 26 and 29 for 2026-08-14 through 18, then 7 on the 19th and none on the 20th.

`pushes-stopped-before-the-shutdown` records the last `notification.created` push at 2026-08-19T16:00:02Z. Two independent stores, a database table and a file, stop together to the second.

They disagree on volume: 2,320 pushes against 2,295 rows. Not settled whether the 25 are retention sweeping old notifications or rows the backfill did not carry; a retention worker stands at `code:packages/shared/notifications/retention/`.

No second writer and no second pusher. Nothing in either repo names the feed outside `notify()`'s path, and the only APNs send path is `code:packages/alanwalton/apns-push-notifier/src/push.ts`, reached only from the three page-keyed legs. The sibling `surplus-fall-notifier` and `alan-message-notifier` are poll loops that call `notify()` to WRITE; neither pushes.
