import { answerStoplightsAdmittedBy } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/inbox-stoplights.route.code"

const GROUP = "inboxes"

const WIRE_KEY_NAME = "inbox"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP, WIRE_KEY_NAME)
}
