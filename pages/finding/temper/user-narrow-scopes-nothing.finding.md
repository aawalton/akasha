---
id: 8aefb667-ff03-5288-81ae-c5eaff878277
slug: user-narrow-scopes-nothing
page-type-slug: finding
title: "A userId narrow scopes nothing on a file-backed page type"
domain-slug: domain/temper
---

# Claim

`where userId eq <user>` is dropped rather than applied on a file-backed page type. `askableNarrow` (`file-narrow.ts:78-87`) returns null for that key unless the type states `owner-slug:`, and 1 of 369 page-type files states one, so the read answers with the whole population. 71 of 84 call sites narrow this way against a file-backed type. Two types hold several real people; the rest hold Alan alone, exposed rather than leaking.

# Evidence

Measured 2026-08-20 by running `getPages`, not by reading it. A user id matching nobody returns the whole population, so the condition is dropped rather than satisfied.

```
rows returned: all / alan / nobody
temper-player        3/3/3
temper-account       4/4/4
temper-character     29/29/29
relationship         676/676/676
question             435/435/435
daily-tracking       121/121/121
persona              41/41/41
idle-persona-card    140/48/0    states owner-slug
temper-watcher rows  3/1/0       not file-backed
```

`idle-persona-card` is the control: it states `owner-slug: player-id`, and it scopes.

The signed-out guard inverts. `NEVER_MATCH_VALUE` is `00000000-...`; `useInventory` passes it on `userId` to match nothing. Run: `temper-inventory-snapshot` gives 2 of 2. The same sentinel on the declared key `inventory` gives 0.

Tenancy: `person` (7) and `relationship` (676) state `account-user-id` for Alan, Jenny and Ki. The temper types hold Alan and throwaway test accounts. The rest hold Alan alone.

`import-inventory.ts:193` reaches Alan by age, not by the narrow: order falls to `id asc` because `seq` is constant, and his player uuid dates 2026-05-01 against the other two in 2026-07.

`getPage` hands back no arbitrary tenant: `getFilePage` asks for two and throws on the second. Both `temper-player` and `temper-account` threw. It answers wrongly only where the type holds exactly one page, as `notification-feed` does: asked for a user that does not exist, it returned Alan's.

Three live `temper-watcher` rows hold three distinct tokens. `resolveWatcherToken` reads with `getPage`, so on files it would throw rather than cross a token over, until one tenant is left.

`temper-net-worth-snapshot` is read both ways: through `answer()` the narrow scopes (3240 Alan, 6 a test account, 0 nobody); through `getPages` it gives 1000 whatever the value, and `SETTLED_BY_ROW` overwrites each row's `userId` with the universal sentinel, so the caller cannot re-filter.
