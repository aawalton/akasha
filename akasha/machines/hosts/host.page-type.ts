import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type Host = Domain

export const host = {
  id: "01a0658e-e3ce-771e-8e98-27ff4beeede6",
  pageTypeSlug: "page-type",
  slug: "host",
  definition: "a place the system runs programs",
  pluralSlug: "hosts",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a node's configuration is declared; every other machine is set up by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A host is a domain, so what it is stands in its definition rather than in a title.",
    },
  ],
} as const satisfies PageType
