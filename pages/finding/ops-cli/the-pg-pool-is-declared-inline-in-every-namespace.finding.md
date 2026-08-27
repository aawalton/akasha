---
id: 7bf4be01-b625-5c60-8ed0-22d20557f11c
slug: the-pg-pool-is-declared-inline-in-every-namespace
page-type-slug: finding
title: "The pg pool is declared inline in every namespace"
domain-slug: domain/ops-cli
---

# Claim

Every namespace whose verbs reach the definition tier declares its own `PgClient`, `PgPool` and `SupabasePg` shapes. There are at least six copies and the count grows by one per namespace moved.

# Evidence

Found 2026-08-13 by the seat moving the `property-definition` bodies, which declined to build the shared seam mid-flight and handed the observation up instead.

`page-type/update.ts` and all five of `property-definition`'s pg verbs each spell the three shapes separately. None is the original; each was written from the same accessor.

The seat's reason for not fixing it is worth keeping: several seats were live in this tree at the time and a new shared file is a collision surface mid-flight, while the sibling namespace moved just before had inlined them too, so inlining kept the two readable side by side. That is a judgment about timing rather than about the right shape.

The seam it names is `tools/lib/pages-pg.ts`, holding the shapes and the pool construction. The connect, release and end block genuinely differs per verb and belongs in each.

This is the failure Parsimony and Single Authority both name: six spellings of one contract, no original among them, each free to drift as the accessor changes with nothing reporting which is stale.
