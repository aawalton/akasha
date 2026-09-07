import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"

const GROUP = "surplus"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
