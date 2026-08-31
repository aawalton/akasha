import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Service = Domain

export const service = {
  id: "01a05a3c-caff-7656-b00d-cbde9f3cf324",
  pageTypeSlug: "page-type",
  slug: "service",
  definition: "a program the system runs on its own",
  pluralSlug: "services",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is started by what runs it rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "What runs a service settles which kind of service it is.",
    },
    {
      invariantKind: "departure",
      statement: "A service states what it runs.",
    },
    {
      invariantKind: "departure",
      statement: "A service states whether it is to be running.",
    },
    {
      invariantKind: "absence",
      statement: "This adds no property of its own.",
    },
  ],
} as const satisfies PageType
