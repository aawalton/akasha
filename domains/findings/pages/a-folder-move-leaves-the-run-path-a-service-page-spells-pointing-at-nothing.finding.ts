import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aFolderMoveLeavesTheRunPathAServicePageSpellsPointingAtNothing = {
  id: "01a08ddd-412d-7421-80d6-0a7adc38c497",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-folder-move-leaves-the-run-path-a-service-page-spells-pointing-at-nothing",
  domain: "domain/service",
  claim:
    "A folder move repoints the specifiers bodies import and leaves the paths a workstation service page spells under `runs` pointing at nothing.",
  evidence:
    "`services/workstation-services/pages/royal-road-sync.workstation-service.ts` runs `bun collections/royal-road/syncing/royal-road-syncing.module.code.ts`, and that file is at `alan/collections/royal-road/syncing/royal-road-syncing.module.code.ts` instead. The test `every workstation service page names files that are there` answers 43 such paths over the service pages, and it runs only where a change carries a file under `services`, so every one of them went unjudged until a change touched that folder. A run path is a string rather than a module specifier, which is why the move rewrote the imports beside it and not this.",
} as const satisfies Finding
