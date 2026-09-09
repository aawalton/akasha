import type { NamedFolderProperty } from "../named-folder-properties/named-folder-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type BuildFolderProperty = NamedFolderProperty

export const buildFolderProperty = {
  id: "01a081cd-5b5f-731e-95ed-0ea5ee3b352b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "build-folder-property",
  definition: "a page property held in a folder a build writes",
  pluralSlug: "build-folder-properties",
  extends: ["page-type/named-folder-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build folder is outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A build writes a build folder again from the source beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A build folder has a body that is not text.",
    },
    {
      invariantKind: "gap",
      statement: "The check asking which page claims a file reads this property.",
    },
    {
      invariantKind: "gap",
      statement: "A change moving a folder leaves out the folders this property names.",
    },
    {
      invariantKind: "gap",
      statement: "The paths git is told to ignore are read from this property.",
    },
  ],
} as const satisfies PageType
