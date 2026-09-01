import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../../pages-system/page-type/page-type.page-type.ts"
import type { RunsChecks } from "./properties/runs-checks.boolean-property.ts"
import type { RunsWarrants } from "./properties/runs-warrants.boolean-property.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  runsWarrants: RunsWarrants
}

export const changeKind = {
  id: "01a05e11-d3f8-72af-b104-6cdd1255b0eb",
  pageTypeSlug: "page-type",
  slug: "change-kind",
  definition: "which sort one change is",
  pluralSlug: "change-kinds",
  partSlugs: ["boolean-property/runs-checks", "boolean-property/runs-warrants"],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "runs-checks", required: true, many: false },
    { pagePropertySlug: "runs-warrants", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change has one kind.",
    },
  ],
} as const satisfies PageType
