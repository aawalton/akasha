import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { inboxStoplights } from "akasha/alan/web/routes/inbox-stoplights/inbox-stoplights.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Route } from "./+types/inbox-stoplights.route.code"

export const SERVED_BY = namedAs(route.slug, inboxStoplights.slug, null)

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, SERVED_BY)
}
