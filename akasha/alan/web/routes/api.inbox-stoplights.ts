import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/api.inbox-stoplights"

// Alan's inbox tile. Which readouts the group holds, the label each carries, the scale each is
// read against and the colour a reading lands on are read off those pages rather than named here,
// so an inbox joining the group reaches the tile without this file changing. The old engine this
// replaces resolved the same thing by parsing markdown frontmatter across the whole page tree,
// uncached, once per request.
//
// A readout in the group with no fresh reading carried in is answered as a stoplight carrying no
// figure: the colour below every rung, an empty reading, and `readingHeld` naming whether no
// reading was ever taken or the one taken went stale. The tile keeps its full count of three, and
// the empty figure is what names the absence. Black is a colour both inbox scales really give — a
// hundred waiting is black — so the colour never names it.
//
// Only a group no readout is left in answers 503, which the widget reads as no signal.
//
// The fourth argument is the whole difference between this route and the upkeep one beside it.
// The shipped Swift decodes `let inbox: String`, non-optional, where the upkeep widget decodes
// `habit`. Emitting `habit` here would throw on every element, fail the array decode, and leave
// the tile showing the last good payload — stale rather than broken, which is the failure nobody
// would report. The route test pins the literal.
const GROUP = "inboxes"

const WIRE_KEY_NAME = "inbox"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP, WIRE_KEY_NAME)
}
