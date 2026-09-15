import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { refuseUncredentialedRingCaller } from "akasha/product/smilingjenny/web/.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"

const GROUP = "surplus"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, GROUP)
}
