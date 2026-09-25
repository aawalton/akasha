import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"

export const GROUP = "attributes"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
