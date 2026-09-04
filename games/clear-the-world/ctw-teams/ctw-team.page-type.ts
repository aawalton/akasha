import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Hex } from "../../../design/colors/properties/hex.text-property.ts"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { CellsCleared } from "./properties/cells-cleared.number-property.ts"
import type { Craters } from "./properties/craters.number-property.ts"
import type { HazardsMarked } from "./properties/hazards-marked.number-property.ts"
import type { ZonesCompleted } from "./properties/zones-completed.number-property.ts"

export type CtwTeam = Page & {
  title: Title
  cellsCleared: CellsCleared
  craters: Craters
  hazardsMarked: HazardsMarked
  zonesCompleted: ZonesCompleted
  hex: Hex
}

export const ctwTeam = {
  id: "01a06579-e4f7-77d8-a696-adb848da2d3e",
  pageTypeSlug: "page-type",
  slug: "ctw-team",
  definition: "one demining organisation a player of Clear the World plays as",
  pluralSlug: "ctw-teams",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/cells-cleared",
    "number-property/craters",
    "number-property/hazards-marked",
    "number-property/zones-completed",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "cells-cleared", required: true, many: false },
    { pagePropertySlug: "craters", required: true, many: false },
    { pagePropertySlug: "hazards-marked", required: true, many: false },
    { pagePropertySlug: "zones-completed", required: true, many: false },
    { pagePropertySlug: "hex", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A team is a real demining organisation.",
    },
    {
      invariantKind: "departure",
      statement: "The four counts are the team's running totals across every player.",
    },
    {
      invariantKind: "departure",
      statement: "A hex is the color the team is drawn in.",
    },
  ],
} as const satisfies PageType
