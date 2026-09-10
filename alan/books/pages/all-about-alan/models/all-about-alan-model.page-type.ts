import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const allAboutAlanModel = {
  id: "01a0657f-a729-72ba-94d1-7b8ccb90a8e4",
  pageTypeSlug: "page-type",
  type: "page-type",
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
  types: "ts",
} as const satisfies PageType
