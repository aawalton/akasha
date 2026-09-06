import type { FileProperty } from "@akasha/pages/file-property"

export type Types = "ts"

export const types = {
  id: "01a0771e-597f-7d38-a6cf-073905063498",
  pageTypeSlug: "file-property",
  slug: "types",
  propertySlug: "types",
  definition: "the type declarations a module's code and its callers both state",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module states its shared declarations here rather than in its code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller naming a declaration alone does not load the code answering that declaration.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies FileProperty
