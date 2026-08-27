---
id: 18d70669-6555-5c40-95f0-28df41807ccc
page-type-slug: finding
title: "Convergence comment denies plain patches"
domain-slug: domain/pages-system
---

# Claim

The doc comment on `awaitConvergence` says plain user patches "never call this", but they have called it since #14313 S7. `planHold` gives every plain patch carrying attributes a convergence hold, and `runPagesOptimisticMutation` awaits it. The comment is not a small imprecision: it states the opposite of what the function's only caller does, on the function it documents, and it is the account a reader gets first because it sits on the exported symbol rather than in a file header.

# Evidence

Both files are in `packages/shared/pages/ui-store/src/optimistic/`.

`convergence.ts`, closing its `awaitConvergence` doc block: "Only derived (automation) patch predictions carry a `predictedSet`; plain user patches, creates, and deletes settle on their single canonical payload and never call this."

`optimistic-mutation.ts` contradicts it in three places. Its header, under "Why plain patches hold, and why holds are ordered per row (#14313 S7)", states: "EVERY patch holds through convergence on its own written attributes (not just derived plans), so an overlay never drops onto a not-yet-synced canonical." An earlier header bullet says the same of `mutationFn`: "This covers plain property patches too, not just derived (automation) predictions."

The code agrees with the header, not the comment. `planHold` returns a hold for a plain patch with no `predictedSet`:

    if (plan.predictedSet !== undefined) return { rowId: plan.rowId, target: plan.predictedSet }
    const attrs = plan.overlay.attributes
    if (attrs !== undefined && Object.keys(attrs).length > 0)
      return { rowId: plan.rowId, target: attrs }

and `runPagesOptimisticMutation` awaits `awaitConvergence` for every hold it collects.

A test asserts the behaviour the comment denies: `optimistic-mutation-convergence.unit.test.ts` carries "a plain patch holds its overlay until the canonical row catches up (no stale repaint on RPC resolve)".

So the comment is stale rather than describing an intent not yet reached — S7 changed the caller and left the callee's comment behind. The two remaining clauses are still right: creates and deletes do settle with no hold, `planHold` returning `undefined` for those kinds.

The reason this is worth more than a typo: the comment is the stated contract of the exported function, and it reads as a deliberate scope limit. Someone acting on it would conclude a plain patch cannot be the source of a convergence wait, which is now the common case.
