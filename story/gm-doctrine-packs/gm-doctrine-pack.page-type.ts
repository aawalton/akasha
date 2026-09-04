import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { DoctrineVersion } from "./properties/doctrine-version.number-property.ts"
import type { GateDimensions } from "./properties/gate-dimensions.file-property.ts"
import type { Policies } from "./properties/policies.file-property.ts"
import type { SheetTemplate } from "./properties/sheet-template.file-property.ts"
import type { TallyCatalog } from "./properties/tally-catalog.file-property.ts"

export type GmDoctrinePack = Page & {
  doctrineVersion: DoctrineVersion
  policies?: Policies
  gateDimensions?: GateDimensions
  sheetTemplate?: SheetTemplate
  tallyCatalog?: TallyCatalog
}

export const gmDoctrinePack = {
  id: "01a06590-c57a-78cf-bc9f-8fc567e848df",
  pageTypeSlug: "page-type",
  slug: "gm-doctrine-pack",
  definition: "the rulings a game master runs every game by",
  pluralSlug: "gm-doctrine-packs",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  partSlugs: [
    "file-property/gate-dimensions",
    "file-property/policies",
    "file-property/sheet-template",
    "file-property/tally-catalog",
    "number-property/doctrine-version",
  ],
  properties: [
    { pagePropertySlug: "doctrine-version", required: true, many: false },
    { pagePropertySlug: "policies", required: false, many: false },
    { pagePropertySlug: "gate-dimensions", required: false, many: false },
    { pagePropertySlug: "sheet-template", required: false, many: false },
    { pagePropertySlug: "tally-catalog", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One pack is here at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A pack carries the revision the pack is on.",
    },
    {
      invariantKind: "departure",
      statement: "Each part of a pack is a file beside the pack.",
    },
    {
      invariantKind: "departure",
      statement: "A reader loads only the part the reader asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The words a pack carries are the game master's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
