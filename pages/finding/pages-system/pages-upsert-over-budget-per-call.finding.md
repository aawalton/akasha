---
id: e2e32ab2-2082-5ce0-bb7b-44b012dce1eb
page-type-slug: finding
title: "Pages upsert over budget per call"
domain-slug: domain/pages-system
---

# Claim

`pages_upsert` touches roughly 43,000 buffer blocks per call and sustains a mean above the 250ms query budget, steadily rather than in bursts, at about 1,080 calls a day. Its fingerprint is absent from the committed ratchet baseline, so `QuerySustainedMeanBudgetExceeded` re-fires against it whenever it re-qualifies, and nothing has been decided about it either way.

# Evidence

Measured 2026-08-12 via `bun ops query-perf triage -2841954187712285930`, read-only, triaging that alert's firing of 2026-08-12T00:11Z. Read twice an hour apart, the figures holding across both.

THE QUERY. `select coalesce(jsonb_agg(r), $1::jsonb) from public.pages_upsert($2, $3::jsonb, array(select jsonb_array_elements_text($4::jsonb))) as r`.

THE COST, BY WINDOW. 30m: 45 calls, 285.0 mean ms/call, 43,484 blks/call. 24h: 1,080 calls, 275.4 mean, 42,638 blks, support 32. 7d: 8,519 calls, 256.5 mean, 282.1 median, 42,169 blks, support 213. The 24h and 7d supports are well past the 3-bucket robustness floor and mean and median sit together, so this is the ordinary cost of a call rather than a burst dragging an average.

STEADY AND CURRENT. First seen 2026-08-07T01:33Z, first active bucket 2026-07-24T16:54Z, last execution 23 minutes before the reading. 1,080 a day against 8,519 over seven days is one rate throughout.

NOT BASELINED. `ratchet_baseline` reads absent, which is why the alert can re-fire; absent means not-baselined rather than newly-seen, so it does not narrow on its own.

PROVENANCE, AS EVIDENCE ONLY. No `pgrst_source` token, so not PostgREST-generated. No `_pages_*` marker, though that set is not exhaustive. Role `service_role`, which the verb states is shared by product code and by an agent at a raw psql prompt; `agent_adhoc`, the only token proving ad-hoc, is absent and proves nothing. The verb states outright that no sound automatic discriminator between deployed-product and agent-ad-hoc traffic exists. So reading this as product code is an INFERENCE from the parameter placeholders and the flat daily rate, not something the triage settled.

NOT ESTABLISHED. Whether it is product code, per the above. What calls it, and how many rows per call — 43,000 blocks may be one large payload rather than a bad plan. The function body and its plan were not read, nor whether an index is missing. Whether 250ms is the right budget for a bulk upsert.
