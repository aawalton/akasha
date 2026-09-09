import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../../../domains/properties/definition.standard-agent-english-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Simulation } from "./properties/simulation.code-file-property.ts"

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
  extends: ["page-type/page"],
  parts: ["code-file-property/simulation"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "code-file-property/simulation", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model has the computation rather than the numbers the computation prints.",
    },
    {
      invariantKind: "departure",
      statement: "A topic citing a number cites the model the number came from.",
    },
  ],
} as const satisfies PageType
