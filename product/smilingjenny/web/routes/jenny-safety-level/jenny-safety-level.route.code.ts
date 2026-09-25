import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { refuseUncredentialedRingCaller } from "akasha/product/smilingjenny/web/.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import { jennySafetyLevel } from "akasha/product/smilingjenny/web/routes/jenny-safety-level/jenny-safety-level.route.ts"
import type { Route } from "./+types/jenny-safety-level.route.code"

const SERVED_BY = namedAs(route.slug, jennySafetyLevel.slug, null)

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, SERVED_BY)
}
