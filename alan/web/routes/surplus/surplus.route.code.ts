import { answerStoplightsAdmittedBy } from "@akasha/readouts/readout-group-serving"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"

const GROUP = "surplus"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
