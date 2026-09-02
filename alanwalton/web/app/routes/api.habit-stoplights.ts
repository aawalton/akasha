import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.habit-stoplights"

// Alan's upkeep tile. Which readouts the group holds, the label each carries, the scale each is
// read against and the colour a reading lands on are read off those pages rather than named here,
// so a readout joining the group reaches the tile without this file changing. The old engine this
// replaces resolved the same thing by parsing markdown frontmatter across the whole page tree,
// uncached, once per request.
//
// A readout in the group with no fresh reading carried in is left out of the answer rather than
// refused, so a group only part of the way in shows the rings it has. Only a group where nothing
// is fresh answers 503, which the widget reads as no signal. That is the right answer there: a
// colour shown for a reading nobody could take would tell Alan his upkeep is holding when the
// truth is that nothing looked.
const GROUP = "upkeep"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
