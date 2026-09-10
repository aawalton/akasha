import { answerCostAdmittedBy } from "akasha/alan/harness/cost/stoplight/cost-stoplight.module.code.ts"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerCostAdmittedBy(request, guardReadout)
}
