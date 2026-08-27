---
id: d6a8f03a-e30e-5265-97b4-ad51181278c9
page-type-slug: finding
title: "Empty group key two spellings"
domain-slug: domain/pages-system
---

# Claim

The pages system spells the empty group two ways — `"__none__"` on the client keying path and `""` on the server bucketing path — which is one concept under two names. A shared recognizer covers the ordering pins, so nothing is broken today, but the second spelling stands against Ubiquitous Naming and has cost a defect once already.

# Evidence

`packages/shared/pages/core/src/view/apply-grouping-shared.ts:157` declares `GROUP_NONE_KEY = "__none__"`, the key the client grouping path gives a page whose group-by value is null. The server bucketing path — `bucketRowsByGroup` into `buildServerGroupedSections` in `@shared/pages-ui` — keys the same group as `""`.

Line 168 of the same file is the recognizer that reconciles them:

```
export function isEmptyGroupKey(key: string): boolean {
  return key === "" || key === GROUP_NONE_KEY
}
```

Its header records what the two spellings cost before it existed, as #14205: the `""` key fell through a `__none__`-only pin into alphabetical ordering. The ordering pin at `apply-grouping-sort.ts:137–138` routes through the recognizer, so that path is covered now.

One comparison sits outside the pins the recognizer covers. `group-key-to-value.ts:32`, inside `groupKeyToPropertyValue`, is `return key === GROUP_NONE_KEY ? null : key` — a `__none__`-only test. Its header scopes the function to the inverse of the client engine's `getKey`, for board columns, so it may be correct as written. **I did not establish whether a server-bucketed key can reach it**, and this is recorded as a place to look rather than as a demonstrated defect.

Ubiquitous Naming on `domains/global.md` binds the general claim: a second spelling reads as a second thing, and each layer stays consistent within itself, so nobody meets both names at once. The repair is unifying the two representations; the recognizer holds the seam in the meantime, and every new site that touches an empty-group key has to know to use it.

Observed 2026-08-07 during the ingest of `dirty/knowledge/groupability.md`, whose reading this confirms. That source is now removed, so this is the only remaining record.
