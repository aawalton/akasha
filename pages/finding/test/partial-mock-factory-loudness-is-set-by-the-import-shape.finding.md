---
id: 0eb1bb2a-5d6c-595e-a4f9-2e4dd055b6be
page-type-slug: finding
title: "Whether a partial mock.module factory fails loudly is decided by the importer's import shape, not the factory"
domain-slug: domain/test
---

# Claim

A `mock.module` factory that omits an export fails two opposite ways, and the discriminator is the importer's import shape, not the factory. A static named import throws `SyntaxError` at load — loud. A namespace import reads `undefined` — silent. Both measured. So a partial factory is neither safe nor unsafe on its own, and the three in `packages/shared/pages/access` are loud, because every importer of the modules they replace is static named.

# Evidence

Measured 2026-08-20 under Bun on a two-export module, replacing `alpha` and omitting `beta`:

    import { beta } from "./real"   -> SyntaxError: Export named 'beta' not found
    import * as m from "./real"     -> m.beta === undefined, no error

Both shapes ran in one process against one factory, so the difference is the importer alone.

Applied to `packages/shared/pages/access/src`, where three factories list exports explicitly rather than by spread — `file-shape.unit.test.ts:81`, `iterate.unit.test.ts:34`, `ordered-paging.unit.test.ts:84,92`:

Importers of `./get`: `iterate.ts:2`, `lifecycle.ts:9`, `owner-scope.ts:3`, `get-for-view.ts:7`, `page-type.ts:7`, `index.ts:26`. Importers of `./page-type-config`: `ordered.ts:5`, `answer.ts:5`, `file-narrow.ts:3`, `file-detail-config.ts:8`, `file-shape.ts:12`, `file-read.ts:7`, `file-rows.ts:4`, `file-property-defs.ts:9`, `index.ts:58`. Every one is a static named import. The only namespace imports in the package are `file-rows.ts:1` (`node:crypto`) and `test-support.ts:1` (`import * as pagesAccess from "./index"`).

So the claim that a new export added to `./get` or `./page-type-config` leaks as `undefined` silently does not hold for this package as it stands: no namespace importer of either module exists, and a static named importer raises.

The one namespace importer is already guarded, and that guard is the pattern worth copying. `test-support.ts:94` declares `satisfies Omit<typeof pagesAccess, "Page">`. Adding four exports to `index.ts` made it fail to compile with TS2739 naming all four missing keys, and TS2322 on the overrides type — a compile-time refusal where the runtime would have read `undefined`.

A sibling finding records the loud half alone. The half added here is that the shape is a property of the importer, so surveying factories answers the wrong question; survey the importers.
