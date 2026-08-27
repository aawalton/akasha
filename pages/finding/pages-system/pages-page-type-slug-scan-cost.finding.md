---
id: 8acd839d-c56c-56ea-afcc-2fc4ee4c3d2a
page-type-slug: finding
title: "Pages page type slug scan cost"
domain-slug: domain/pages-system
---

# Claim

Three PostgREST queries against the pages table — two story/chapter reads keyed on `page_type_slug` and one LIMIT query — share a pattern of large, fully-cached scans against the low-cardinality `page_type_slug` predicate that is standing rather than growing, consistent with a missing selective index or a non-sargable predicate.

# Evidence

Filed as project #15895, domain `pages-system`, status `someday_maybe`. Routed by aranya (2026-07-24); pages read/write judged astra's domain.

First alert: `QuerySustainedMeanBudgetExceeded`, qid `3190191312546120349`. 30-min mean 322ms vs 250ms budget. Query (PostgREST, story-chapter read): `SELECT pages.id, title, slug, attributes->'chapterNumber' FROM pages WHERE page_type_slug=$2 AND ...`. ~5263 blks/call (~41MB), fully cached, standing since 21:31 (not a regression); ~200-300ms baseline, 746ms spike at 23:11 (CI-resumption surge), easing to 82ms by 23:21. astra: that breach was transient contention, but the fixed ~41MB scan is the real offender — suspected missing index or non-sargable predicate on `page_type_slug`+`chapterNumber`. Low call-freq (1-11/5min) keeps aggregate load small, but per-call latency judged likely to matter on a user-facing render path. Judgment: backlog perf-project. Scope: EXPLAIN ANALYZE to confirm seq scan; candidate fix a covering index, measured against `query-tail-baseline.generated.ts`.

Second offender: qid `-4899138059080100686`, story-pages read (`attributes->'story'`), heavier — ~8000-10000 blks/call (~64-80MB), same signature, fully cached; freq 54-176/5min; 504ms spike at 23:13, easing to 202ms by 23:23. Two instances of the same shape = a pattern: story/chapter reads doing 40-80MB scans on `page_type_slug`+attribute; one covering index expected to cover both. Priority: standing pattern on the reader path, behind #15790/#15793/#15865.

Third (astra ran EXPLAIN, 2026-07-25): qid `43241742913470802`: `SELECT * FROM pages WHERE page_type_slug=$1 AND deleted_at IS NULL ORDER BY created_at DESC, id ASC LIMIT $2`. Fixed 3714 blks/call (~29MB), flat, 29-33 calls/5min, ~30-37ms/call. astra: a LIMIT query touching 29MB is unambiguous — sorting the whole matching set for N rows, no selectivity argument needed.

No `# Objective` — captured, never defined.
