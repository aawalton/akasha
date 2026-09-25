import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/inbox-stoplights.route.code"

const GROUP = "inboxes"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
