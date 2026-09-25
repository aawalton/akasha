import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { surplus } from "akasha/alan/web/routes/surplus/surplus.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const SERVED_BY = namedAs(route.slug, surplus.slug, null)

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, SERVED_BY)
}
