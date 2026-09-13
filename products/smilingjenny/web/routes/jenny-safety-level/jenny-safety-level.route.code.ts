import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readouts/modules/group-serving/readout-group-serving.module.code.ts"
import { refuseUncredentialedRingCaller } from "akasha/products/smilingjenny/web/.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import type { Route } from "./+types/jenny-safety-level.route.code"

const GROUP = "safety"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, GROUP)
}
