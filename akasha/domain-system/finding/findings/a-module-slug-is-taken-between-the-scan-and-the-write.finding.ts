import type { Finding } from "../finding.page-type.ts"

export const aModuleSlugIsTakenBetweenTheScanAndTheWrite = {
  id: "01a05bfa-f627-7001-9dc2-d76c3aa86851",
  pageTypeSlug: "finding",
  slug: "a-module-slug-is-taken-between-the-scan-and-the-write",
  domainSlug: "domain/akasha-migration",
  claim:
    "A module slug must stand alone among every module page in akasha rather than only within its own package, so a package moving in must rename any module whose file stem is already spoken for. With several lanes landing packages at once the free names change under a lane mid-landing: a slug free when this lane scanned every module page was taken by another lane's package before the write was judged.",
  evidence:
    "Scanning every `*.module.ts` under `akasha/` gave 442 module pages and no two sharing a slug, so the rule binds in practice. Of the 42 slugs spoken twice anywhere in akasha, none are two modules; they are one module and one property, or two pages of unrelated types.\n\nThree of the fifteen files moving in had to be renamed. `state-schema` is held by `akasha/awen-core/state-schema`, so tower-core's became `tower-state`. `page-types` is held by `akasha/pages-system/pages-core/page-types`, so tower's became `tower-page-slugs`. Both were caught by scanning before the first write.\n\nThe third was not. `types` was free when this lane scanned, and the write refused with `states slug types, and akasha/pages-system/pages-access/types/types.module.ts already stands with it`. The pages-access lane had landed in between. The module became `combat-types`. A second scan after that landing gave 499 module pages, 57 more than the first.\n\nThe refusal names the file and the collision plainly, so nothing lands wrong. What it costs is a whole write attempt, and the renaming then reaches the manifest exports, the package page's partSlugs, the sibling imports and every consumer outside.\n\nThe call taken was to rename to a package-qualified slug rather than to argue for per-package slug scope, and to rescan immediately before each write rather than once at the start.",
} as const satisfies Finding
