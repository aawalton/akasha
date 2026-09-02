import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.inbox-stoplights"

// Alan's inbox tile. Which readouts the group holds, the label each carries, the scale each is
// read against and the colour a reading lands on are read off those pages rather than named here,
// so an inbox joining the group reaches the tile without this file changing. The old engine this
// replaces resolved the same thing by parsing markdown frontmatter across the whole page tree,
// uncached, once per request.
//
// A readout in the group with no fresh reading carried in is left out of the answer rather than
// refused, so a group only part of the way in shows the rings it has. Only a group where nothing
// is fresh answers 503, which the widget reads as no signal.
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
