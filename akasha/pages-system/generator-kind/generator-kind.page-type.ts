import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { AfterChecks } from "./properties/after-checks.boolean-property.ts"

export type GeneratorKind = Domain & {
  afterChecks: AfterChecks
}

export const generatorKind = {
  id: "01a04f17-5b78-7c66-9145-7a386e55406e",
  pageTypeSlug: "page-type",
  slug: "generator-kind",
  definition: "how a property's value is worked out when its page is created",
  pluralSlug: "generator-kinds",
  partSlugs: ["boolean-property/after-checks", "generator-kind/uuid-v7"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "after-checks", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated value is worked out when its page is created, never written by hand.",
    },
    {
      invariantKind: "departure",
      statement: "When a generated value is worked out is stated by its kind.",
    },
    {
      invariantKind: "constraint",
      statement: "A generator waiting for the checks works out a value no check sees.",
    },
  ],
} as const satisfies PageType
