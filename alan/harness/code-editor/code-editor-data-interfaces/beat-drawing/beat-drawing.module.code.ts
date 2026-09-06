// THE STATUS BAR, WHOSE STOPLIGHTS NO FILE CHANGE ANNOUNCES.
//
// A readout is written by a relay elsewhere and reached over HTTP, so the three stoplight sections
// are taken again on a beat rather than followed. What that buys is not fewer reads but fewer
// readers: every open window was paying for them, and they do not differ between windows.
//
// The fleet's spend rides the same beat though it is a page read, because the beat drawing it
// beside them has to run anyway.

import { readFleetUsage } from "@akasha/agents/claude-account-usage"
import { drawGroup } from "../../../../../editor-extension/group-stoplights/group-stoplights.module.code.ts"
import {
  readingOf,
  type UsageReading,
} from "../../../../../editor-extension/status-bar-usage/status-bar-usage.module.code.ts"

const INBOX_GROUP = "inboxes"
const UPKEEP_GROUP = "upkeep"
const ATTRIBUTES_GROUP = "attributes"

// Four reads, none of which is allowed to lose the other three. A section that threw is null, and
// the editor keeps what it last drew there rather than blanking it.
async function stoplightsOf(group: string): Promise<StatusBarStoplights | null> {
  try {
    const drawn = await drawGroup(group)
    // A store that cannot be reached answers no stoplights rather than throwing, so an empty
    // group is a read that failed rather than a group that is well. Every group names at least
    // one readout, and answering null here is what keeps the last good glyphs on the screen.
    if (drawn.glyphs === "") return null
    return { glyphs: drawn.glyphs, legend: drawn.legend }
  } catch {
    return null
  }
}

function usageNow(): UsageReading | null {
  try {
    const fleet = readFleetUsage()
    return readingOf(fleet.session, fleet.weekly)
  } catch {
    return null
  }
}

export async function statusBarLine(): Promise<string> {
  const [inbox, upkeep, attributes] = await Promise.all([
    stoplightsOf(INBOX_GROUP),
    stoplightsOf(UPKEEP_GROUP),
    stoplightsOf(ATTRIBUTES_GROUP),
  ])
  const usage = usageNow()
  return JSON.stringify({
    usage,
    inbox,
    upkeep,
    attributes,
  } satisfies StatusBarState)
}
