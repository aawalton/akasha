import { answerCostAdmittedBy } from "akasha/alan/harness/cost/stoplight/cost-stoplight.module.code.ts"
import { refuseUncredentialedRingCaller } from "../../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerCostAdmittedBy(request, refuseUncredentialedRingCaller)
}
