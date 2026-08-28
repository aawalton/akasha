---
page-type-slug: finding
slug: askcomposed-stands-three-times-over
title: "One composed-query function stands three times over, and the third is not askComposed"
domain-slug: domain/page-queries-system
---

# Claim

One pages system function is written three times, and no two of the three are the same. The one 56 shipped files call fetches a service that is off, so every call there fails. The one 12 files call answers in process off local checkouts, and works. The third is pure, answers nothing and is called by nothing — and it is not `askComposed`: that symbol exists nowhere under `pages-system/`.

# Evidence

Re-read 2026-08-28 against `150a81cdb`; each count states its pattern.

**One, it fetches a service that is off.** `shared/pages-query/src/ask.ts:81`, POSTing to `${pageQueryOrigin()}/q` at `:88`. Fifty-seven files import `askComposed` from `@shared/pages-query/ask`, exactly one a test (`temper/scripts/src/motif-lore-coverage.data.test.ts`): 56 shipped and 1 test. `daily-tracking/tracking-modules.ts:11` re-exports rather than imports it. Seventy-three import something from that subpath; the other 16 take `askPage` or `askRows`.

**Two, it answers in process.** `tools/lib/page-query-client.ts:81`. Twelve files import `askComposed` from it, no tests. Three files that look like importers are not: `services/daily-tracking-points.ts` and `services/great-courses-sync.ts` reach pages through the fetcher seam, and `tools/lib/tracking/sessions.ts:3` takes `Landed`, `removeRow`, `rowLanding`.

**Three, it is not `askComposed`.** The third is `runQuery` at `pages-system/query/query.ts:332`, `checkQuery` at `:266`. Still pure, still handed its pages: `runQuery = (checked: Checked, pages: readonly Page[])`. Six files under `pages-system/store/` import it; the only mention outside `pages-system/` is a comment at `editor-extension/src/features/page-tree/harness.ts:61`.

**What the clean one must still grow — the ablation's record.** `ComposedQuery` (`ask.ts:34-45`) states ten fields, not eleven. `Query` (`query.ts:78-97`) states six, not four: it gained `function` and `target`, so aggregation is built. Missing: ordering (`sort-by`, `descending`), paging (`limit`, `offset`), grouping (`count-by`), object `where` — `Query.where` is still a formula `string`. `count-by` and `offset` have no caller (see `two-composed-query-fields-have-no-caller`), so the ablation must close ordering, `limit` and the `where` language, and only drop those two.

Still true: no YAML, `deploy-system/` or `infra/` file sets `PAGE_QUERY_ORIGIN`.
