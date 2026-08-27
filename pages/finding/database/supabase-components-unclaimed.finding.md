---
id: b1439e3c-0599-5dcc-a3eb-fc2cfbd86b82
slug: supabase-components-unclaimed
page-type-slug: finding
title: "Supabase components unclaimed"
domain-slug: domain/database
---

# Claim

Four Supabase components under `packages/infra/k8s/` are governed only by `infra`, with no nearer domain. Whether `database` should claim any of them turns on what counts as the store rather than on anything an instrument reports, and its glob budget cannot hold all four.

# Evidence

`packages/infra/k8s/` holds `postgrest`, `gotrue`, `supabase-realtime` and `supabase-studio`. All four directories exist.

`ops instructions governs --file-path ~/code/packages/infra/k8s/postgrest` returns `domains/infra.md` and nothing nearer. That surface reaches them through `packages/infra/**`.

`domains/database.md` already carries four `code-path:` globs, all of which resolve: supabase 548 files, k8s/postgres 68, k8s/pgbouncer 9, k8s/cloudnative-pg 6. None has rotted. The key caps at five globs, so claiming all four components is not available regardless of the answer.

The judgment: `postgrest` is arguably an API layer over the store rather than the store, and `gotrue` is auth. Nothing on the perimeter settles where the boundary of "the queryable store" falls.

Raised by the `review-instructions` reading of `domains/database.md` on 2026-08-06, which landed a repair (`per type` → `per page type`, the corpus's own name being `page type` and a bare "type" reading first as a SQL type inside a domain defined as the queryable store) and a trim (a distribution sentence that changed no act and that nothing keeps true; measured at 34 of 273 page types carrying the flag, 209,165 rows in `public.page_versions`).
