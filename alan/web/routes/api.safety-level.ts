import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/api.safety-level"

// The one group of readings this route serves. Everything else about it — which readouts the
// group holds, the label each carries, the scale each is drawn against, the rungs of that scale
// and the color a reading lands on — is read off those pages rather than spelled here.
//
// The reading itself is taken on Alan's workstation and carried in, because the level lives in
// tracking rows no pod can see. A group with nothing carried in answers 200 and a stoplight
// carrying no figure: the colour below every rung, an empty reading, and `readingHeld` naming
// whether nothing was ever carried or what was carried went stale. The empty figure is what keeps
// a level off the ring, so Alan is never told where he is on evidence nobody has. Only a group no
// readout is left in answers 503.
const GROUP = "safety"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
