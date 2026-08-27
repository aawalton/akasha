---
id: 8c00c7f4-bf3e-52ee-9a6a-be3011f64c71
slug: coherence-push-ignores-standing-rows
page-type-slug: finding
title: "Coherence push ignores standing rows"
domain-slug: domain/pages-system
---

# Claim

Pushing a `coherenceRules` guard onto a page-type validates nothing against the rows already stored, and the guard then refuses every later write to any row that does not satisfy it, whatever that write touches.

# Evidence

Read on 2026-08-09.

`packages/shared/pages/proc/src/_enforce_page_coherence.ts:5-8` states what the deployed guard does: it "Reads the just-written row's `attributes` and the owning page-type's declared `coherenceRules` array, evaluates the two rule forms, and RAISEs on the first violation". It evaluates the whole settled row rather than the keys the patch named, so a row that already fails an incoming rule fails on every subsequent write of any kind, not only on writes touching the governed keys.

`rg -c "coherenceRules" packages/shared/pages/cli/src/*.ts` returns nothing, so no verb in that package reads the array it is pushing. Nothing evaluates the page-type's existing rows against an incoming rule at the moment it is pushed.

The two failures are separated in time and in appearance. The push succeeds and reports success. The rows fail one at a time, later, on unrelated writes, with a message naming the coherence rule rather than the push that installed it — so the act that caused the breakage is not in view when the breakage is met.

The rules are enforced from live data rather than from the repository: the guard reads the page-type row's own `coherenceRules`, which no TypeScript reads and no grep reaches. A `*_COHERENCE_RULES` constant in the tree records what an author meant the row to hold, and nothing reports the day the two went apart — so a reader searching the repository to find out what is enforced gets a confident answer from the wrong corpus.

A remedy that would close it at the act: have the page-type update verb evaluate the type's live rows against an incoming guard rule and refuse where any row already violates it, naming those rows. Its help says nothing about the population today. Observed and proposed by the instruction ingest of 2026-08-07 at `dirty/knowledge/page-coherence-rules.md`, which offered the same repair and preferred it to an instruction; the instruction was refused on 2026-08-09 and this is what survives it.
