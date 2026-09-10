import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { ReadersOweReading } from "./properties/readers-owe-reading.boolean-property.types.ts"
import type { RunsChecks } from "./properties/runs-checks.boolean-property.types.ts"
import type { WriterOwesReading } from "./properties/writer-owes-reading.boolean-property.types.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
  readersOweReading: ReadersOweReading
}
