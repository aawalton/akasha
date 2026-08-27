---
id: a6ed8fa3-5758-5efa-ab37-962fd327d65d
slug: global-max-seq-unindexed
page-type-slug: finding
title: "Global max seq unindexed"
domain-slug: domain/pages-system
---

# Claim

`select max(seq) from public.pages` is served by no index — every index carrying `seq` leads with `page_type_slug` or is partial — so it runs as a parallel sequential scan over 1.3 million rows, touching about 2GB to return one number. A page-duplicating insert takes that aggregate once per call and sustains 415ms, which is what `QuerySustainedMeanBudgetExceeded` fires on for fingerprint 347949532576033782.

# Evidence

Measured 2026-08-13 against the live database, read-only, triaging that alert's firing.

THE QUERY, from `bun ops query-perf triage 347949532576033782`:

    insert into public.pages (id, seq, page_type_id, user_id, title, attributes, page_type_slug,
    status) select gen_random_uuid(), (select max(seq) + $2 from public.pages), page_type_id,
    user_id, title, attributes, page_type_slug, status from public.pages where id = $1::uuid

THE PLAN. `explain (analyze, buffers) select max(seq) from public.pages` gives Finalize Aggregate over Gather, 2 workers, `Parallel Seq Scan on pages` at 431,729 rows per loop over 3 loops, `Buffers: shared hit=251527`, execution 228.686ms. At 8KB a block that is about 2GB read to return one row.

THE INDEXES. Three carry `seq`, and none can serve an unqualified global maximum: `pages_page_type_slug_seq_idx` and `pages_parent_key_walk_idx` both lead with `page_type_slug`, and `pages_pipeline_branch_seq_idx` leads with an expression and is partial to one page type.

THE COST. 30m: 13 calls, 415.6 mean ms/call. 24h: 199 calls, 420.8. 7d: 199 calls, 420.8. Support 0 in every window — no bucket reaches ten calls — so there is no median and no blocks-per-call figure, and the mean is all that stands. First seen 2026-08-13T08:41:01Z; first active bucket 2026-07-24T16:54Z; 200 lifetime calls over 2 active days.

PROVENANCE, AS EVIDENCE ONLY. No `pgrst_source` token and no `_pages_*` marker. Role `service_role`, which the verb states is shared by product code and by an agent at a raw psql prompt; `agent_adhoc` is absent and proves nothing.

NOT ESTABLISHED. What calls it: no `max(seq)` against `pages` was found in the code repository and no database function carries one, so this may be ad-hoc traffic with nothing to fix. Whether `max(seq) + 1` races another writer against the unique index on `(page_type_slug, seq)`. Whether an index on `seq` alone is wanted, the table being written constantly.
