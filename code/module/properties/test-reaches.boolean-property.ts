import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const testReaches = {
  id: "01a15ced-7bd5-79d4-991b-43d9ba5e9b85",
  type: "page-type/boolean-property",
  slug: "test-reaches",
  propertySlug: "test-reaches",
  definition: "whether a change to any file a module's test reaches runs that test",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module saying nothing here has its test run by the files beside it and the pages it reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module saying true here has its test run by a change to any file its test imports at any depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import of types alone reaches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module says true here where its test judges cases that code anywhere below it can break.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-21T05:27:10.035Z",
  updatedAt: "2026-10-21T05:27:10.035Z",
} as const satisfies BooleanProperty
