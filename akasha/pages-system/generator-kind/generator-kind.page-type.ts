import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type GeneratorKind = Domain

export const generatorKind = {
  id: "01a04f17-5b78-7c66-9145-7a386e55406e",
  pageTypeSlug: "page-type",
  slug: "generator-kind",
  definition: "how a property's value is worked out when its page is created",
  partSlugs: ["generator-kind/uuid-v7", "generator-kind/next-seq"],
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated value is worked out when its page is created, never written by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A generated value is worked out after the checks pass, so a refusal spends none.",
    },
  ],
} as const satisfies PageType
