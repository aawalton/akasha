import type { Finding } from "../finding.page-type.ts"

export const webAndAkashaEachDeclareTheCompletionCatalogsBundle = {
  id: "01a06413-29d5-7cf9-9138-51e222d264fd",
  pageTypeSlug: "finding",
  slug: "web-and-akasha-each-declare-the-completion-catalogs-bundle",
  domainSlug: "domain/temper",
  claim:
    "`CompletionCatalogs` is now declared twice with the same ten fields in the same order: in web at `temper/web/app/components/completion/use-completion-catalogs.ts` line 68, and in akasha at `temper-player-completion/completion-catalogs`. The empty bundle is doubled with it, as web's `NONE` and akasha's `NO_COMPLETION_CATALOGS`. Web's copy is the one to delete, because the akasha module is what `buildCompletionSummaries` takes and what a loader outside web would build.",
  evidence:
    "Read at `8f093afadaa`, the commit landing the akasha module. Both declarations name achievementCategories, antiquityCategories, cadwellLevels, collectibleCategories, craftTypes, poiZones, questZones, researchLines, tributePatrons and zoneCompletionZones, each `readonly` and each of the same entry type imported from the same twin module, so the two are interchangeable rather than merely alike.\n\nThe duplication was made by the seat landing `completion-summaries`, whose territory was two modules under `temper-player-completion` while two sibling seats worked the same package and a third was working web. Repointing web is one import line and two deletions, but it sits in another seat's file, so it is filed rather than taken.\n\nWhat web holds beyond the type is the asking: `askEveryCatalog` calls `askComposed` per page type and slims each row to the keys its catalog type names. That part is web's own and is not duplicated anywhere.",
} as const satisfies Finding
