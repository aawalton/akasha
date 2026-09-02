import type { Finding } from "../finding.page-type.ts"

export const theMotifRowsUnderATaskGoWithTheGeneratedMotifStyleCatalog = {
  id: "01a06310-f203-712d-b7df-26b8c632038f",
  pageTypeSlug: "finding",
  slug: "the-motif-rows-under-a-task-go-with-the-generated-motif-style-catalog",
  domainSlug: "domain/temper",
  claim:
    "The task HUD of the characters add-on no longer shows motif rows. `getMotifSourceEnrichment` and the `motif` selector of `src/ui/task-hud-enrichment-registry.ts` were not recreated, because both read `MOTIF_STYLE_LOOKUP` out of `src/generated/motif-style-lookup.generated.ts`, which an earlier finding declined to recreate and which has no akasha home yet. The motif fallback rows of the scribing sub-rows went the same way.",
  evidence:
    "Measured 2026-09-02 at 8ddfbd8d2e. `getMotifSourceEnrichment` reads two things out of `MOTIF_STYLE_LOOKUP` for each lore collection index: a motif style's name and its `sourceDescription`. It reads the chapter total out of `CHAPTERS_PER_STYLE` beside it. The chapter total has an akasha home already, as `MOTIF_CHAPTERS_PER_STYLE` in `completion-motif-knowledge`; the name and the source text have none. The generator `temper-addon-generators/temper-motif-style` writes that catalog, and what it renders imports `../motif-style-lookup` for its own type, but `ADDON_DATA_TARGETS` in `temper-addon-data/addon-data-target` holds no entry for it, so nothing says which akasha package the rendered catalog lands in. The agent recreating `scribing-sources` met the same wall: the landed `characters-scribing-sources` exports no `getScribingMotifFallbackSubRows`, so `scribingSpecs` in `characters-task-hud-enrichment-registry` lost its motif branch as well. Two kinds of row are gone from the HUD: the motif styles a character is short of chapters in, with where those chapters drop, and the motif fallback under a scribing script task where no achievement row matched.",
} as const satisfies Finding
