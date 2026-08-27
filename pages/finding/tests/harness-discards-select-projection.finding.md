---
id: aa690d8c-9929-5273-83f6-7e1901ca386f
slug: harness-discards-select-projection
page-type-slug: finding
title: "Harness discards select projection"
domain-slug: domain/global
---

# Claim

The Supabase shim behind every `.database.test.ts` discards the column list handed to
`.select()` and issues `SELECT *`, so a projection defect on the PostgREST read path passes
every database test. The shim's header claims the opposite discipline: anything outside the
chains it emulates throws, "so divergence from the real client surfaces in tests". Projection
is the divergence it admits silently, and rows come back complete, so an assertion on a
projected read sees more than the real client returns.

# Evidence

Read against `~/code` at `ecf5f9518f` on 2026-08-07.

- `packages/shared/supabase/test-harness/src/shim.ts:71` declares the builder's select as
  `select(_cols, opts)`. The parameter is underscore-prefixed and unused; the body records
  only `state.returning = true` and, when `opts.count === "exact"`, the count mode. The
  column list reaches nothing.
- `packages/shared/supabase/test-harness/src/query-sql.ts:117` compiles the select verb to
  `SELECT * FROM public.${s.table}${whereSql}`, with no branch on any projection state,
  and `:182` reuses the same builder for the count path.
- The discipline the shim states for itself is at `shim.ts:13-17`, the "intentionally
  scoped … throws so divergence from the real client surfaces in tests" comment quoted in
  the claim.

What I did not measure. I did not enumerate which `.database.test.ts` files assert on a
projected read, so how many tests are currently passing for this reason is unknown rather
than small. I did not check whether honouring the column list would fail any test that
passes today, and I did not look for a separate lane — a live-Postgres suite, a browser
suite — that might exercise projection against the real client. Nothing was changed.

Found while emptying `dirty/questions/pages-doctrine.md`, whose fourth silent-failure rule
states this in one sentence; that document is quarantined and is being removed, which is
why the observation is filed here rather than left in it.
