import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/habit-stoplights.route.code"

const GROUP = "upkeep"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
