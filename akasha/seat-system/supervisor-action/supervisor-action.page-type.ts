import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type SupervisorAction = Domain

export const supervisorAction = {
  id: "01a05ecf-9a12-7710-b385-fd3a09307d1d",
  pageTypeSlug: "page-type",
  slug: "supervisor-action",
  definition: "one thing a supervisor can be asked to do",
  pluralSlug: "supervisor-actions",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "A supervisor's action is carried on the seat holding that supervisor.",
    },
    {
      invariantKind: "gap",
      statement: "A supervisor is a page.",
    },
  ],
} as const satisfies PageType
