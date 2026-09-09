import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type FilePropertyGroup = PageProperty

export const filePropertyGroup = {
  id: "01a087b2-13af-7316-9986-2aadf342ea64",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "file-property-group",
  definition: "a page property held in a set of files",
  pluralSlug: "file-property-groups",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group's members are the file properties the group's page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A member's file sits beside the page carrying the group.",
    },
    {
      invariantKind: "departure",
      statement: "No member's file sits beside the group's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A member's file is named by the group's slug and then the member's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A group names no members of its own.",
    },
  ],
} as const satisfies PageType
