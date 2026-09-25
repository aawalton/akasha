import { answerReadoutAdmittedBy } from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { categorization } from "akasha/alan/web/routes/categorization/categorization.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Route } from "./+types/categorization.route.code"

const SERVED_BY = namedAs(route.slug, categorization.slug, null)

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadoutAdmittedBy(request, guardReadout, SERVED_BY)
}
