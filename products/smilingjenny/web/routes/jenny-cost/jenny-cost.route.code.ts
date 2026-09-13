import { answerCostAdmittedBy } from "akasha/alan/harness/cost/modules/stoplight/cost-stoplight.module.code.ts"
import { refuseUncredentialedRingCaller } from "akasha/products/smilingjenny/web/.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerCostAdmittedBy(request, refuseUncredentialedRingCaller)
}
