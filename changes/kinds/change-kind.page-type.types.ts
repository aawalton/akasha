import type { ReadersOweReading } from "akasha/changes/kinds/properties/readers-owe-reading.boolean-property.types.ts"
import type { RunsChecks } from "akasha/changes/kinds/properties/runs-checks.boolean-property.types.ts"
import type { WriterOwesReading } from "akasha/changes/kinds/properties/writer-owes-reading.boolean-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
  readersOweReading: ReadersOweReading
}
