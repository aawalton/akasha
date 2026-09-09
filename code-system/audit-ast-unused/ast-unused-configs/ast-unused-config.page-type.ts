import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Curation } from "./properties/curation.file-property.ts"
import type { Workspaces } from "./properties/workspaces.file-property.ts"

export type AstUnusedConfig = Domain & {
  workspaces?: Workspaces
  curation?: Curation
}

export const astUnusedConfig = {
  id: "01a08198-1060-7b7c-b4d4-b7d8ba41baf1",
  pageTypeSlug: "page-type",
  slug: "ast-unused-config",
  definition: "one file of the curation the ast-unused audit reads its globs from",
  pluralSlug: "ast-unused-configs",
  partSlugs: ["file-property/workspaces", "file-property/curation"],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "file-property/workspaces", required: false, many: false },
    { pagePropertySlug: "file-property/curation", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page has a curation root or a curation part rather than both.",
    },
    {
      invariantKind: "departure",
      statement: "A part is in a file named for the page with that part.",
    },
    {
      invariantKind: "departure",
      statement: "The root keeps the name its reader has compiled in rather than taking a page's.",
    },
    {
      invariantKind: "departure",
      statement: "The root names each part by the file name that part is held under.",
    },
  ],
} as const satisfies PageType
