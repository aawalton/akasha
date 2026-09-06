import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { RunsChecks } from "./properties/runs-checks.boolean-property.ts"
import type { WriterOwesReading } from "./properties/writer-owes-reading.boolean-property.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
}

export const changeKind = {
  id: "01a05e11-d3f8-72af-b104-6cdd1255b0eb",
  pageTypeSlug: "page-type",
  slug: "change-kind",
  definition: "which sort one change is",
  pluralSlug: "change-kinds",
  partSlugs: [
    "change-kind/change-authored",
    "change-kind/change-checked",
    "change-kind/change-mechanical",
    "change-kind/change-none",
    "change-kind/change-restated",
    "boolean-property/runs-checks",
    "boolean-property/writer-owes-reading",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "boolean-property/runs-checks", required: true, many: false },
    { pagePropertySlug: "boolean-property/writer-owes-reading", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change has one kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks a change runs and the reading its writer owes are read off the change kind's page.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the checks run and whether the writer owes reading are two answers.",
    },
  ],
} as const satisfies PageType
