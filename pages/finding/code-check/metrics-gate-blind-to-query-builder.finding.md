---
id: d35ce74f-fec4-5f92-b912-eafbce37edc9
page-type-slug: finding
title: "Metrics gate blind to query builder"
domain-slug: domain/global
---

# Claim

`check-no-raw-metrics-sql` is blind to the only spelling that reaches `public.metrics` from the Supabase surface. Its two regexes scan string-literal text for `public.metrics` or a SQL keyword before `metrics`; the sanctioned package reaches the table as `.from("metrics")`, whose literal holds neither. This is the hole already filed against the location-traces gate, on its sibling, and nothing files it.

# Evidence

Read in `~/code` on `main` at `1313565199`, ingesting `dirty/questions/code-repo-remediation-forbidden-remedies.md`.

`packages/infra/checks/src/lib/ts-pg-metrics-queries.ts:37-38` is the whole matcher:

    const PUBLIC_METRICS_RE = /\bpublic\.metrics\b/i
    const UNQUALIFIED_METRICS_RE = /\b(?:from|join|into|update)\s+metrics\b/i

Both run over the text of template and string literals. `packages/shared/metrics/access/src/insert.ts:18` reaches the table as `await sb.from("metrics").insert([...])`, under a docblock naming it the "Supabase JS surface — PostgREST `INSERT` into `public.metrics`. Used by non-tx callers (the `bun ops` dispatcher, Next.js apps, scripts)." The literal text is `metrics`: the schema qualifier absent, the `from` a JavaScript method name outside the quotes rather than a SQL keyword inside them. Neither regex matches.

So the gate cannot see the route its own sanctioned package documents for non-transactional callers. `check-no-raw-metrics-sql.ts:53-54` names that package the "sole sanctioned location for raw SQL touching the metrics hypertable" and `:98` exempts it by path — an exemption doing no work against a spelling the matcher catches nowhere. A green run is what hides it: anyone can write `sb.from("metrics")` outside the access package and land it.

This mirrors `pages/finding/alanwalton-app/location-traces-gate-blind-to-query-builder.finding.md`, which files the identical hole for `public.location_traces`. That one is scoped to its own table and names no sibling, so a reader repairing it has no reason to widen. A different claim about this same gate — a docblock promising a call-context filter the code omits — was repaired on main at 238a61a2c3, and satisfying it left this untouched.

Whether the pages, page-versions and messages gates share the blindness was not checked; both gates checked so far have it.
