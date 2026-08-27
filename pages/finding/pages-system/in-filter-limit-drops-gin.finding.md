---
id: 5d9af969-fc35-5f0f-b5d8-59b13897e8ba
slug: in-filter-limit-drops-gin
page-type-slug: finding
title: "In filter limit drops gin"
domain-slug: domain/pages-system
---

# Claim

A page query filtering `in` on a jsonb attribute key abandons its GIN index whenever it also carries a LIMIT.

`filters-where.ts:124` lowers `in` to one `attributes @> {key: value}` clause per value. With no LIMIT the planner bitmap-ORs those clauses over the GIN index. With one it walks `pages_page_type_slug_seq_idx` in seq order instead, re-checking every clause per row. On 2026-08-09 one such call read 1,927,317 blocks in 5.6s to return a single row.

# Evidence

Measured 2026-08-09 16:30 UTC against the live database, read-only.

`QuerySustainedMeanBudgetExceeded` fired on fingerprint -8963217264539658531: a PostgREST query with a hundred `attributes @> $n` terms OR'd together, `page_type_slug = $101`, `deleted_at IS NULL`, `ORDER BY seq ASC NULLS LAST, id ASC NULLS LAST`, LIMIT and OFFSET.

The 448ms mean the alert reports is one call. Its two buckets in `db_query_stats`: at 16:19:01, 12 calls at 17.2ms and 1,066 blocks each; at 16:22:01, one call at 5,620.4ms and 1,927,317 blocks, returning one row. `pages` is 244,108 heap blocks and holds 897,445 live `step` rows.

Both plans below are EXPLAIN on a reconstruction of that shape — a hundred `attributes @> {"stepKey": …}` terms against `page_type_slug = 'step'`, matching nothing.

With LIMIT 30: `Index Scan using pages_page_type_slug_seq_idx`, index cond `page_type_slug = 'step'` alone, all hundred containment terms demoted to a row Filter. Estimated cost to run out, 1,017,751; the Limit node discounts that to 3,562 on the expectation of filling 30 rows early.

Without LIMIT: `BitmapOr` over a hundred `Bitmap Index Scan on pages_active_page_type_slug_attributes_gin_idx`, total 49,230 — twenty times cheaper by the planner's own arithmetic, for strictly more work, since it also sorts every match.

The bet rests on an estimate of 89 rows per term, hence 8,860 matches. Where the true answer is one row late in seq order the scan runs to the end: an index leaf plus a heap fetch for each of 897,445 rows, which is the block count observed.

Not established: which caller issued the slow call or what it searched for — `pg_stat_statements` carries no parameters and I did not correlate against application logs. Also not established: whether any caller passes an `in` list this long deliberately. A hundred terms is the whole fingerprint; a different list length parameterizes differently and appears as a different queryid, so this is one length of a family.
