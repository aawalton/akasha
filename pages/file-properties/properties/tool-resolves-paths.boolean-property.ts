import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const toolResolvesPaths = {
  id: "01a08de9-864d-748a-a2c0-0a5be50709bf",
  type: "boolean-property",
  slug: "tool-resolves-paths",
  propertySlug: "tool-resolves-paths",
  definition: "whether a tool rather than the index resolves the paths in the files a property has",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here holds files no tool resolves a path in.",
    },
    {
      invariantKind: "departure",
      statement: "A tool reading such a file resolves the paths that file spells.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the tool that resolves the paths.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
