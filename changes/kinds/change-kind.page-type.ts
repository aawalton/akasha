import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { ReadersOweReading } from "./properties/readers-owe-reading.boolean-property.ts"
import type { RunsChecks } from "./properties/runs-checks.boolean-property.ts"
import type { WriterOwesReading } from "./properties/writer-owes-reading.boolean-property.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
  readersOweReading: ReadersOweReading
}

export const changeKind = {
  id: "01a05e11-d3f8-72af-b104-6cdd1255b0eb",
  pageTypeSlug: "page-type",
  slug: "change-kind",
  definition: "which sort one change is",
  pluralSlug: "change-kinds",
  parts: [
    "change-kind/change-authored",
    "change-kind/change-checked",
    "change-kind/change-mechanical",
    "change-kind/change-none",
    "change-kind/change-restated",
    "boolean-property/readers-owe-reading",
    "boolean-property/runs-checks",
    "boolean-property/writer-owes-reading",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "boolean-property/runs-checks", required: true, many: false },
    { pageProperty: "boolean-property/writer-owes-reading", required: true, many: false },
    { pageProperty: "boolean-property/readers-owe-reading", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The checks a change runs and the readings a change owes are read off the change kind's page.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the checks run and whether the writer owes reading are two answers.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the writer owes reading and whether the readers do are two answers.",
    },
    {
      invariantKind: "departure",
      statement: "No change kind stales its readers without owing its writer reading.",
    },
  ],
} as const satisfies PageType
