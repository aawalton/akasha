import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/page-types/page-type.page-type.ts"
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
  partSlugs: [
    "change-kind/change-authored",
    "change-kind/change-mechanical",
    "change-kind/change-none",
    "boolean-property/runs-checks",
    "boolean-property/runs-warrants",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "runs-checks", required: true, many: false },
    { pagePropertySlug: "runs-warrants", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change has one kind.",
    },
    {
      invariantKind: "departure",
      statement: "What runs on a change of a kind is read off that kind's page.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the checks run and whether the warrants run are two answers.",
    },
  ],
} as const satisfies PageType
