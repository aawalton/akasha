---
id: 42707bb0-e753-55c5-b09f-c5ae8f918d37
slug: file-key-user-id-reads-as-universal-user
page-type-slug: finding
title: "A file key spelled user-id reads back as the universal user"
domain-slug: page-type/person
---

# Claim

`buildRawPageRows` drops any file key camelizing to `userId`, `pageTypeId`, `seq`, `createdAt`, `updatedAt` or `deletedAt`, substituting the row's column. A property stating `key: user-id` is written, read correctly by `askComposed`, and read back through `getPages` as `ffffffff-ffff-ffff-ffff-ffffffffffff` on every page. Had `person` taken `user-id` for the account a human signs in with, every reader deciding what a person may reach would have resolved all three humans to one sentinel.

# Evidence

Measured 2026-08-20 by running the readers, not by reading them.

`packages/shared/pages/access/src/file-rows.ts:26` declares `SETTLED_BY_ROW`; line 183 is `if (SETTLED_BY_ROW.has(key)) continue`, inside the loop building a page's attributes. `user_id` is then set from the shape's `userId`, defaulting to `UNIVERSAL_USER_ID`.

`notification-feed` already declares `key: user-id`, and `memory:pages/notification-feed/alan.notification-feed.md` states `user-id: 9ba554f7-cb18-48bb-a709-ec935a895ca7`. Read two ways: `askComposed` returns that uuid; `getPages(sb, {pageTypeSlug:"notification-feed", select:["userId","personSlug"]})` returns `{"userId":"ffffffff-ffff-ffff-ffff-ffffffffffff","personSlug":"alan"}`. The value is replaced, not missing, and nothing reports it.

`notification-feed` is itself unaffected: its only reader, `feedNameFor` at `packages/shared/notifications/src/notify.ts:42`, asks `askComposed`. The hazard is the spelling, for any type read through `getPages`.

`account-user-id` camelizes to `accountUserId`, in neither `SETTLED_BY_ROW` nor `LIFTED_COLUMN`. Proved before choosing it: `getPages` over `relationship` narrowing `accountUserId` returns the uuid intact. `properties/person-account-user-id.md` then landed with that key, and all three humans read back their own accounts.

`handlerSeatName(identity-slug, slug)` composes `amy-alan-handler`, `amy-ki-handler` and `claude-jenny-handler`, which is what `relationship.sms-handler-target` states for the same three accounts. That corroborates the mapping independently.

The three accounts now stand in two places, `relationship.account-user-id` and `person.account-user-id`. Nothing reconciles them, and which is the source is settled nowhere.
