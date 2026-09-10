import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { ReadersOweReading } from "./properties/readers-owe-reading.boolean-property.ts"
import type { RunsChecks } from "./properties/runs-checks.boolean-property.ts"
import type { WriterOwesReading } from "./properties/writer-owes-reading.boolean-property.ts"

export type ChangeKind = Domain & {
  runsChecks: RunsChecks
  writerOwesReading: WriterOwesReading
  readersOweReading: ReadersOweReading
}
