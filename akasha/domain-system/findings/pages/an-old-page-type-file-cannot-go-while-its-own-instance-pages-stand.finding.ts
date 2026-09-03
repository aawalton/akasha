import type { Finding } from "../finding.page-type.ts"

export const anOldPageTypeFileCannotGoWhileItsOwnInstancePagesStand = {
  id: "01a0685e-a3ab-735d-8349-dca1b4c27eaa",
  pageTypeSlug: "finding",
  slug: "an-old-page-type-file-cannot-go-while-its-own-instance-pages-stand",
  domainSlug: "domain/akasha-migration",
  claim:
    "A file under `pages/page-type/` is the only thing that places its own instance pages, so ablating one while `pages/<slug>/` still holds pages breaks every reader of those pages even where the akasha counterpart already stands. Of the five page types dispatched to this lane, four hold instance pages and only `alert` holds none; `alert` is the only one ablated.",
  evidence:
    "page/page-types.ts:17-24 sets PAGE_TYPE_GLOBS from `pages/page-type` and `pages/rules-engine-rule-set` alone, and page/property/registry.ts:66-79 builds the registry from those paths only, so a TypeScript page type under akasha is invisible to it. tools/lib/page-write-where.ts:50-51 returns null the moment the registry misses the slug, which is what an old reader or writer resolves through.\n\nCounted on disk 2026-09-03: pages/alert does not exist and `find . -name '*.alert.md'` returns nothing, while the same find over '*.list.md' returns the seven pages under pages/list, so the zero is a true absence rather than a blind instrument. pages/list holds 7, pages/mobile-cut 9, pages/rules-engine-rule-set 1, pages/seat-conditions 1.\n\nTwo of the four are measured live already: the-seat-conditions-page-type-file-is-load-bearing-for-every-seat-spawn probed the deletion in a scratch root and every seat spawn stopped, and akasha/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts:79-94 raises 'no checkout root places the mobile-cut page type' when whereFor misses, which is what `akasha deploy` files a cut through. For list and rules-engine-rule-set no running reader keys on the slug, but their instance pages would stop resolving and other lanes would read them as orphans.\n\nSo the order for a page type is the same as for a page: the instance pages and their readers move first, and the type file goes last.",
} as const satisfies Finding
