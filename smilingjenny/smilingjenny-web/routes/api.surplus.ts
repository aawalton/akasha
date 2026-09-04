import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { refuseUncredentialedRingCaller } from "../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import type { Route } from "./+types/api.surplus"

// The one group of readings this route serves. Everything else about it — which readouts the
// group holds, the label each carries, the scale each is drawn against, the rungs of that scale
// and the color a reading lands on — is read off those pages rather than spelled here.
//
// The surplus is Alan's, which is what Jenny's tile says it shows: hours of sleep left after
// what Alan's day cost. It is taken on Alan's workstation and carried in, because it lives in
// tracking rows no pod can see. A group with nothing carried in answers 503, which the widget
// reads as no signal. That is the right answer: hours shown for a reading nobody could take
// would tell Jenny about a night Alan does not have.
const GROUP = "surplus"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, refuseUncredentialedRingCaller, GROUP)
}
