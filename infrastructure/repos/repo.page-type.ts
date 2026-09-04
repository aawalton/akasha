import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type Repo = Domain

export const repo = {
  id: "01a06835-e289-7ce5-b198-71205e81f789",
  pageTypeSlug: "page-type",
  slug: "repo",
  definition: "a domain whose subject is one repository",
  pluralSlug: "repos",
  extendsSlug: ["page-type/domain"],
  partSlugs: ["repo/akasha-repo"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository a change lands in settles how that change lands.",
    },
  ],
} as const satisfies PageType
