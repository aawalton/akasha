import type { FileProperty } from "@akasha/pages/file-property"

export type LineSet = "json"

export const lineSet = {
  id: "01a0657f-a729-7826-9473-150f1db12554",
  pageTypeSlug: "file-property",
  slug: "line-set",
  propertySlug: "line-set",
  definition: "the lines an experiment plays, each with an id and a predicted register",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A grade is joined back onto a line's id.",
    },
  ],
} as const satisfies FileProperty
