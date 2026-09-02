import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperCatalogGenerators = {
  id: "01a0611b-1507-7c68-a4ca-6ec1eb8efb03",
  pageTypeSlug: "workspace-package",
  slug: "temper-catalog-generators",
  definition: "the source text of every data file temper renders from a game capture",
  manifest: "json",
  partSlugs: [
    "module/achievement-catalog-tier",
    "module/antiquity-catalog-tier",
    "module/cadwell-catalog-tier",
    "module/catalog-tier",
    "module/collectibles-catalog-tier",
    "module/lore-library-catalog-tier",
    "module/poi-catalog-tier",
    "module/recipe-catalog-tier",
    "module/trait-research-catalog-tier",
    "module/tribute-catalog-tier",
    "module/zone-completion-catalog-tier",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generator here renders source text and writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "A generator here reads what a capture addon saved rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "The caller reads the capture and writes what a generator rendered.",
    },
  ],
} as const satisfies WorkspacePackage
