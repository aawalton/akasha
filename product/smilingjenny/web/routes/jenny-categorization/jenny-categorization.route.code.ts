import { answerReadout } from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { ringCredential } from "akasha/product/smilingjenny/web/.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import { jennyCategorization } from "akasha/product/smilingjenny/web/routes/jenny-categorization/jenny-categorization.route.ts"
import type { Route } from "./+types/jenny-categorization.route.code"

const SERVED_BY = namedAs(route.slug, jennyCategorization.slug, null)

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadout(request, ringCredential(), SERVED_BY)
}
