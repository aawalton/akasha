---
page-type-slug: finding
title: "The write path and its audit read different settled-key sets"
domain-slug: domain/page-storage
---

# Claim

Two constants named `SETTLED_BY_ROW` state which keys a row settles rather than a file, and they disagree: seven keys at `tools/page/page-naming.ts:6`, four at `shared/pages-access/src/file-rows.ts:26`. Each is consumed by a function named `constantHolesIn`, with the same signature and a byte-identical body, one on the write path and one in the audit that judges the same rule. A page type named for `{created-at}`, `{updated-at}` or `{deleted-at}` is refused by the audit and admitted by the write, and both refusals give the same reason in nearly the same words.

This is a fault that was recorded, repaired, and has come back at a new address, rather than a repair that never landed. The earlier one was four hand-copies of a single promoted-column set disagreeing with each other; today there is one, at `shared/pages-access/src/routing-core.ts:6-16`, derived rather than copied. The shape came back somewhere else.

Nothing is bleeding today: no page type names any of the three keys, so the divergence is latent.

# Evidence

Measured 2026-08-28 at `716101552` on `main`.

**The two sets.** `tools/page/page-naming.ts:6` declares `SETTLED_BY_ROW` as `userId, pageTypeId, pageTypeSlug, seq, createdAt, updatedAt, deletedAt` — seven. `shared/pages-access/src/file-rows.ts:26` declares `SETTLED_BY_ROW` as `userId, pageTypeId, pageTypeSlug, seq` — four. Neither imports the other; neither names the other.

**The two consumers are the same function twice.** `tools/page/page-naming.ts:24-26` and `shared/pages-access/src/file-name.ts:26-28` both read:

```
export function constantHolesIn(template: string): readonly string[] {
  return holesIn(template).filter((one) => SETTLED_BY_ROW.has(camelizeKey(one)))
}
```

Same name, same signature, same body, resolving `SETTLED_BY_ROW` to different sets by which file they stand in.

**They are the write path and the audit of the write path.** `shared/pages-access/src/file-name.ts:109` takes `constantHolesIn(template)[0]` and throws `FileWriteError` where it is defined, refusing the write. `tools/audits/pages-named-as-stated.ts:116` calls the seven-key copy — imported from `../page/page-naming.ts` at `:3` — and pushes a refusal where it returns anything. So the gate and the check on that gate consult different answers to the same question.

**Both refusals state the same warrant.** `file-name.ts:112` says "the row a file is read into settles that key, so every page of this type reads back the same value for it". `pages-named-as-stated.ts:119-122` says "the row a file is read into settles that key, so every write that states no name of its own is refused here". One sentence, two sets, three keys of disagreement.

**The divergence is latent, not live.** `git grep -nE '^(named-for|unique-key):.*\{(created-at|updated-at|deleted-at)\}' -- '*.page-type.md'` returns nothing across 391 page types, so no template names a key the two sets disagree about. A page type named for any of the three would be admitted by the write and refused by the audit.

**Why this is a return rather than an unrepaired defect.** A finding slugged `promoted-column-copies-disagree` recorded four hand-copies of the promoted-column set disagreeing at 10 keys against 13. It was taken away on 2026-08-28, its claim having been checked and found false; `git log --diff-filter=D -- '*promoted-column-copies-disagree*'` reaches it. Those are gone: `PROMOTED_COLUMN_KEYS` now derives from one declaration at `shared/pages-access/src/routing-core.ts:6-18`, consumed by `build-patch-plan.ts` and `build-predicted-row.ts`, and `page-attributes.ts`, `_pages_row_matches.ts` and `STRUCT_FIELDS` exist nowhere. The old fault was fixed; this is the same shape at a different address.

**This file has gone dark on a silent divergence once already.** The comment at `tools/audits/pages-named-as-stated.ts:112-115` records that this arm read `repo.name === "instructions"`, "which no repository answers to any more, so the arm below was weighed over none of the conventions and every naming rule that a file page can never satisfy passed unnamed — while the check went on reporting the pages it did count, which is what made the gap invisible."

Not measured: whether the seven-key set or the four-key set is the correct account of what a row settles. `shared/pages-access/src/file-rows.ts` moved `createdAt`, `updatedAt` and `deletedAt` into `attributes` rather than dropping them, which is a reason the four-key set may be the current truth and the seven-key copy the stale one — but nothing here states which is meant, and that is the decision this finding is for.
