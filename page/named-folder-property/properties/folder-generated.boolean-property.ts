import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const folderGenerated = {
  id: "01a0a5c3-393c-7cac-a156-052b3bc74e92",
  type: "page-type/boolean-property",
  slug: "folder-generated",
  propertySlug: "generated",
  definition: "whether a machine rather than an author writes the files under a property's folder",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here holds a folder an author writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying so says it of every file beneath its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No author writes a file under such a folder by hand.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the machine that writes the folder.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
