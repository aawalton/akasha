import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { habitStoplights } from "akasha/alan/web/routes/habit-stoplights/habit-stoplights.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Route } from "./+types/habit-stoplights.route.code"

const SERVED_BY = namedAs(route.slug, habitStoplights.slug, null)

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, SERVED_BY)
}
