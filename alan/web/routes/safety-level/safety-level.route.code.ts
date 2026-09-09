import { answerStoplightsAdmittedBy } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/safety-level.route.code"

const GROUP = "safety"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
