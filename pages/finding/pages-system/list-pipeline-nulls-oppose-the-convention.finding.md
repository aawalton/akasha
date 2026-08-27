---
id: a779b8e4-a9f9-50e0-a109-fde676434718
page-type-slug: finding
title: "List pipeline nulls oppose the convention"
domain-slug: domain/pages-system
---

# Claim

The list read's client comparator places nulls at the opposite end from its own server for every nullable sort key, and it does so in a file whose header claims byte-exact parity with that server's null placement. A list ordered on a sparse attribute ascending shows nulls last locally and first remotely. Nothing detects it: the default `seq` sort agrees either way, so it reads correct until someone sorts on something nullable.

# Evidence

Measured against `origin/main` at `383bf60d35` on 2026-08-07, from `/home/walton/code`.

`packages/shared/pages/core/src/null-ordering.ts` owns the rule for the tree — "null sorts as the smallest value: asc → nulls first, desc → nulls last" — and records it as "explicit intent (Alan, 2026-07-02, #14205), not accident; do not re-diverge". Its `nullOrderSign` is called by `comparePages` and by the core view engine's `applySorts`.

`packages/shared/pages/access/src/filters-order.ts:35` emits the same for the list read's server: `const nullsFirst = NON_NULLABLE_ORDER_KEYS.has(o.by) ? !asc : asc`, so every nullable key gets `NULLS FIRST` on ascending.

`packages/shared/pages/ui-store/src/query/regular-pipeline.ts:139–143` does the opposite:

    // Postgres: ASC → NULLS LAST, DESC → NULLS FIRST.
    if (aNull) return clause.dir === "asc" ? 1 : -1
    if (bNull) return clause.dir === "asc" ? -1 : 1

The same file's header, lines 16–21, claims the reverse of what it does: doing the final order in JS "guarantees byte-exact parity with the SQL builder's null-placement and tiebreak, independent of collection collation config".

The ui-store's own view pipeline follows the convention — `sort-resolve.ts` applies "asc → NULLS FIRST, desc → NULLS LAST (null as the smallest value so asc/desc are true inverses)" — so the list pipeline is the single departure in the package. It is live: `packages/shared/pages/ui/src/cache/use-query.ts` composes `createRegularPipeline`.

Which side is right is not this reading's to settle. The comment says it mirrors a SQL builder, and `filters-order.ts` — the builder that survives — disagrees with it.
