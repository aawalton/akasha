---
id: d734f464-a73d-56dd-87d2-b44170d381f9
page-type-slug: finding
title: "Schema guard header names removed proc"
domain-slug: domain/pages-system
---

# Claim

The call-site list in `_enforce_page_schema.ts`'s module header names a proc that no
longer exists. It states the guard runs in "the five patch procs (`page_patch`,
`page_patch_by_id`, `page_patch_by_seq`, `page_patch_by_id_if_status`,
`page_patch_by_seq_if_unclaimed`)"; there are four, and
`page_patch_by_seq_if_unclaimed` is gone from the repo. A reader auditing the guard's
coverage against that header looks for a fifth proc that is not there.

# Evidence

Read on 2026-08-07 against `~/code` at `383bf60d35`.

The claim sits at `packages/shared/pages/proc/src/_enforce_page_schema.ts:38-41`, in the
"Called as the post-write `ctx.enforcePageSchema(…)` primitive from…" paragraph.

`packages/shared/pages/proc/src/` holds four page-patch procs: `page-patch.ts`,
`page-patch-by-id.ts`, `page-patch-by-seq.ts` and `page-patch-by-id-if-status.ts`. There
is no `page-patch-by-seq-if-unclaimed.ts`.

Grepping the whole of `packages/` for `if_unclaimed` / `if-unclaimed`, excluding `dist`,
returns exactly one hit: line 40 of that same header. Grepping for `unclaimed` at large
returns only `packages/agents/**` matches about message claims and agent rows, an
unrelated sense of the word. So the name survives in this one comment and nowhere else.

The authoritative list is elsewhere and is correct.
`packages/shared/pages/proc-compiler/src/schema-guard-coverage.unit.test.ts` declares
`VALUE_GATE_PROCS` as `page-create`, `page-patch`, `page-patch-by-id`, `page-patch-by-seq`
and `page-patch-by-id-if-status` — create plus four — and compiles each, asserting the
guard call appears in the emitted SQL. That test is why the drift is harmless to
coverage: a proc that forgot its guard fails there, and its header records a live miss
caught exactly that way. The defect is confined to the comment.
