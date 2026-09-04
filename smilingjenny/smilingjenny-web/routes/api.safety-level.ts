import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { refuseUncredentialedRingCaller } from "../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import type { Route } from "./+types/api.safety-level"

// The one group of readings this route serves. Everything else about it — which readouts the
// group holds, the label each carries, the scale each is drawn against, the rungs of that scale
// and the color a reading lands on — is read off those pages rather than spelled here.
//
// The level is Alan's, which is what Jenny's tile says it shows. It is taken on Alan's
// workstation and carried in, because the level lives in tracking rows no pod can see. A group
// with nothing carried in answers 503, which the widget reads as no signal. That is the right
// answer: a level shown for a reading nobody could take would say where Alan is on evidence
// nobody has.
const GROUP = "safety"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, GROUP)
}
