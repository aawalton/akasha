import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const namedFolderProperty = {
  id: "01a081cc-8980-7180-b875-7b4681fea93d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "named-folder-property",
  definition: "a page property held in a folder whose name is stated",
  pluralSlug: "named-folder-properties",
  parts: ["text-property/folder-name"],
  extends: ["page-type/true-property"],
  properties: [
    { pageProperty: "text-property/folder-name", required: true, many: false },
    { pageProperty: "boolean-property/holds-bytes", required: false, many: false },
    { pageProperty: "boolean-property/runs-file-length", required: false, many: false },
    { pageProperty: "text-property/extensions", required: false, many: true, maxCount: null },
  ],
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
    {
      invariantKind: "departure",
      statement: "The property speaks for every file the folder holds rather than for one of them.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying its folder holds bytes says so of every file beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property saying its folder is judged for no length says so of each of them too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property naming no endings speaks for the folder rather than for the files beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property naming endings speaks for a file beneath it only where that file carries one.",
    },
  ],
  types: "ts",
} as const satisfies PageType
