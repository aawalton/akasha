import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/api.habit-stoplights"

// Alan's upkeep tile. Which readouts the group holds, the label each carries, the scale each is
// read against and the colour a reading lands on are read off those pages rather than named here,
// so a readout joining the group reaches the tile without this file changing. The old engine this
// replaces resolved the same thing by parsing markdown frontmatter across the whole page tree,
// uncached, once per request.
//
// A readout in the group with no fresh reading carried in is answered as a stoplight carrying no
// figure: the colour below every rung, an empty reading, and `readingHeld` naming whether no
// reading was ever taken or the one taken went stale. Alan ruled the ring shows even where no
// reading has come in yet, so the tile keeps its full count of six. The empty figure is what
// names the absence, and black is a colour a scale really gives, so the colour never names it.
//
// Only a group no readout is left in answers 503, which the widget reads as no signal. That is a
// group the store refuses, a group holding no readout, or a group whose every readout is stilled
// or whose page names no label, no scale or no wire key.
const GROUP = "upkeep"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP)
}
