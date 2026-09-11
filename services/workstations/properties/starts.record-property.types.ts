import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { Lenient } from "akasha/services/workstations/properties/lenient.boolean-property.types.ts"
import type { RunArgument } from "akasha/services/workstations/properties/run-argument.text-property.types.ts"
import type { RunBefore } from "akasha/services/workstations/properties/run-before.text-property.types.ts"
import type { RunCode } from "akasha/services/workstations/properties/run-code.relation-property.types.ts"
import type { RunPage } from "akasha/services/workstations/properties/run-page.relation-property.types.ts"

export type Starts = List<{
  code: RunCode
  before?: RunBefore
  pages?: RunPage
  arguments?: RunArgument
  lenient?: Lenient
}>
