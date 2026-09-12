import type { Lenient } from "akasha/infrastructure/services/workstations/properties/lenient.boolean-property.types.ts"
import type { RunArgument } from "akasha/infrastructure/services/workstations/properties/run-argument.text-property.types.ts"
import type { RunCode } from "akasha/infrastructure/services/workstations/properties/run-code.relation-property.types.ts"
import type { RunPage } from "akasha/infrastructure/services/workstations/properties/run-page.relation-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Starts = List<{
  code: RunCode
  pages?: RunPage
  arguments?: RunArgument
  lenient?: Lenient
}>
