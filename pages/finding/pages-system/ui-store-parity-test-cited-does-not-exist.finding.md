---
id: d4ace431-9756-560a-9be3-c67a31305626
slug: ui-store-parity-test-cited-does-not-exist
page-type-slug: finding
title: "UI store parity test cited does not exist"
domain-slug: domain/pages-system
---

# Claim

Two live `ui-store` files cite `view-pipeline.parity.database.test.ts` as the proof that the browser-tier view pipeline is byte-exact with the server proc. No file of that name exists anywhere in the code repo. The parity tests that do exist prove a different implementation — the neutral TypeScript spec in `@shared/pages-core` against the plpgsql — and say nothing about the ui-store pipeline that cites them.

# Evidence

Measured against `origin/main` at `383bf60d35` on 2026-08-07, from `/home/walton/code`.

    grep -rn "view-pipeline.parity" --include=*.ts packages/   → 2 lines

`packages/shared/pages/ui-store/src/query/sort-resolve.ts:7` — "the whole filter→resolve→order pipeline runs client-side with byte-exact parity to the server proc (proved by `view-pipeline.parity.database.test.ts`)". `packages/shared/pages/ui-store/src/query/view-pipeline.ts:6` — "It reproduces the SAME ordered ids + `total_count` the proc emits against the same corpus (proved by `view-pipeline.parity.database.test.ts`)".

`find . -name '*parity*'` outside `node_modules` returns no file of that name. The nearest are `packages/shared/pages/access/src/view-engine-parity.database.test.ts` and `view-engine-parity-filters.database.test.ts`, in a different package. Their subject is different: the first's header says it is "parity between the neutral-TS view/fold spec (`@shared/pages-core`) and the live `pages_for_view` plpgsql running on embedded pglite". Neither imports anything from `@shared/pages-ui-store`.

So the two claims of byte-exact parity for the browser-tier pipeline rest on nothing that exists. What makes this worth more than a stale filename is that the citation is what an author would check before changing either file, and the check passes as prose while resolving to nothing — the same shape as `regular-pipeline.ts`'s null-placement parity claim, which is filed separately and is false.
