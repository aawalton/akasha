import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lineSet = {
  id: "01a0657f-a729-7826-9473-150f1db12554",
  type: "page-type/file-property",
  slug: "line-set",
  propertySlug: "line-set",
  definition: "the lines an experiment plays, each with an id and a predicted register",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is joined back onto a line's id.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
