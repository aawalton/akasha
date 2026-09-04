import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../../../domain-system/domains/properties/definition.text-property.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { Simulation } from "./properties/simulation.file-property.ts"

export type AllAboutAlanModel = Page & {
  title: Title
  definition: Definition
  simulation?: Simulation
}

export const allAboutAlanModel = {
  id: "01a0657f-a729-72ba-94d1-7b8ccb90a8e4",
  pageTypeSlug: "page-type",
  slug: "all-about-alan-model",
  definition: "one computation of a mechanism in Alan",
  pluralSlug: "all-about-alan-models",
  extendsSlug: "page-type/page",
  partSlugs: ["file-property/simulation"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "simulation", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model carries the computation rather than the numbers the computation prints.",
    },
    {
      invariantKind: "departure",
      statement: "A topic citing a number cites the model the number came from.",
    },
  ],
} as const satisfies PageType
