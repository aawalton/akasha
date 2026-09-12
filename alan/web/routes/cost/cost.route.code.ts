import { answerCostAdmittedBy } from "akasha/alan/harness/cost/modules/stoplight/cost-stoplight.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerCostAdmittedBy(request, guardReadout)
}
