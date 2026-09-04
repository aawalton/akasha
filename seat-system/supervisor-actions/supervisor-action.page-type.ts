import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type SupervisorAction = Domain

export const supervisorAction = {
  id: "01a05ecf-9a12-7710-b385-fd3a09307d1d",
  pageTypeSlug: "page-type",
  slug: "supervisor-action",
  definition: "one thing a supervisor can be asked to do",
  pluralSlug: "supervisor-actions",
  partSlugs: [
    "supervisor-action/restart",
    "supervisor-action/restart-now",
    "supervisor-action/swap-proxy",
  ],
  extendsSlug: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A supervisor is the process running an agent in a seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor writes a seat's page by running the writer rather than by holding the page in memory.",
    },
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
