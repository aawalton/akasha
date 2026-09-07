import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { refuseUncredentialedRingCaller } from "../../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"

const GROUP = "surplus"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, GROUP)
}
