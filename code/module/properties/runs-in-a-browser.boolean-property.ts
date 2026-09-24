import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsInABrowser = {
  id: "01a0d59a-c864-7ed9-9e6d-b7aeb4ca42a1",
  type: "page-type/boolean-property",
  slug: "runs-in-a-browser",
  propertySlug: "runs-in-a-browser",
  definition: "whether a module's code runs inside a browser page rather than where it is imported",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module saying nothing here runs wherever the code importing it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module whose code a browser page is handed whole says true here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module saying true here is compiled with the browser whatever imports it.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
