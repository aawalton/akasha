import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { Lenient } from "akasha/services/workstation-services/properties/lenient.boolean-property.types.ts"
import type { RunArgument } from "akasha/services/workstation-services/properties/run-argument.text-property.types.ts"
import type { RunBefore } from "akasha/services/workstation-services/properties/run-before.text-property.types.ts"
import type { RunCode } from "akasha/services/workstation-services/properties/run-code.relation-property.types.ts"
import type { RunPage } from "akasha/services/workstation-services/properties/run-page.relation-property.types.ts"

export type Starts = List<{
  code: RunCode
  before?: RunBefore
  pages?: RunPage
  arguments?: RunArgument
  lenient?: Lenient
}>
