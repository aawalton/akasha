import type { PageType } from "../types/page-type.page-type.types.ts"

export const namedFolderProperty = {
  id: "01a081cc-8980-7180-b875-7b4681fea93d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "named-folder-property",
  definition: "a page property held in a folder whose name is stated",
  pluralSlug: "named-folder-properties",
  parts: ["text-property/folder-name"],
  extends: ["page-type/page-property"],
  properties: [{ pageProperty: "text-property/folder-name", required: true, many: false }],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The page states the name its folder is under.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is found under the folder the page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims a folder by stating the property with that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page claiming a folder claims every file that folder has.",
    },
    {
      invariantKind: "departure",
      statement: "A page states whether it has the folder rather than what the folder holds.",
    },
  ],
  types: "ts",
} as const satisfies PageType
