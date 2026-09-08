import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Sgconfig } from "./properties/sgconfig.named-file-property.ts"

export type AstGrepConfig = Domain & {
  sgconfig: Sgconfig
}

export const astGrepConfig = {
  id: "01a0818d-ddf2-7235-ba2a-dc7372432cfe",
  pageTypeSlug: "page-type",
  slug: "ast-grep-config",
  definition: "one set of ast-grep rules run together over a tree",
  pluralSlug: "ast-grep-configs",
  partSlugs: ["named-file-property/sgconfig"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "named-file-property/sgconfig", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule directory is read against the folder the page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule file a named directory holds is run.",
    },
  ],
} as const satisfies PageType
