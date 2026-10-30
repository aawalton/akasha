import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lineSet = {
  id: "01a0657f-a729-7826-9473-150f1db12554",
  type: "page-type/file-property",
  slug: "line-set",
  propertySlug: "line-set",
  definition: "the messages an experiment plays to Alan",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is joined back onto a line's id.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:20:59.817Z",
  updatedAt: "2026-10-30T14:56:58.086Z",
} as const satisfies FileProperty
