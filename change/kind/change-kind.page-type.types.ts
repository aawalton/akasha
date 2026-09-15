import type { ReadersOweReading } from "akasha/change/kind/properties/readers-owe-reading.boolean-property.types.ts"
import type { RunsChecks } from "akasha/change/kind/properties/runs-checks.boolean-property.types.ts"
import type { WriterOwesReading } from "akasha/change/kind/properties/writer-owes-reading.boolean-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
  readersOweReading: ReadersOweReading
}
