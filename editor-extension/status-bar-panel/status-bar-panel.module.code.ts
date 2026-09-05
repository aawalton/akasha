import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import {
  applyToItems,
  type FreshAts,
  type ReadOutcomes,
  settleReads,
} from "../status-bar-drawing/status-bar-drawing.module.code.ts"
import {
  NO_LEGENDS,
  type StoplightLegends,
} from "../status-bar-legends/status-bar-legends.module.code.ts"
import { SLOTS } from "../status-bar-slots/status-bar-slots.module.code.ts"
import { SEPARATOR_GLYPH, SEPARATOR_HEX } from "../status-bar-theme/status-bar-theme.module.code.ts"
import type { UsageReading } from "../status-bar-usage/status-bar-usage.module.code.ts"

const FEATURE = "status-bar"
const SLUG = "status-bar"

let output: vscode.OutputChannel

// A SECTION THE SERVICE COULD NOT READ IS SAID TO HAVE FAILED. The drawing already knows what to
// do with a reading that failed — keep the text the slot last had and say since when it has been
// stale — so a null section is handed on as a rejection rather than as a blank.
function sectionOf<Held>(said: Held | null | undefined): PromiseSettledResult<Held> {
  return said === null || said === undefined
    ? { status: "rejected", reason: new Error("the service read nothing for this section") }
    : { status: "fulfilled", value: said }
}

function legendKept(
  said: StatusBarStoplights | null,
  held: string | undefined
): string | undefined {
  if (said === null || said.legend === "") {
    return held
  }
  return said.legend
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Status Bar")
  context.subscriptions.push(output)

  const items = SLOTS.map((slot) => {
    const item = vscode.window.createStatusBarItem(
      slot.id,
      vscode.StatusBarAlignment.Right,
      slot.priority
    )
    if (slot.kind === "separator") {
      item.text = SEPARATOR_GLYPH
      item.color = SEPARATOR_HEX
    } else {
      item.text = "—"
      if (slot.kind !== "stoplights") {
        item.color = slot.hex
        item.tooltip = slot.label
      }
      item.command = "opsStatusBar.refreshNow"
    }
    item.show()
    context.subscriptions.push(item)
    return item
  })

  let freshAts: FreshAts = {
    inbox: undefined,
    upkeep: undefined,
    attributes: undefined,
    usage: undefined,
  }

  let legends: StoplightLegends = NO_LEGENDS

  const draw = (held: StatusBarState, trigger: string): undefined => {
    const outcomes: ReadOutcomes = {
      inbox: sectionOf(held.inbox?.glyphs),
      upkeep: sectionOf(held.upkeep?.glyphs),
      attributes: sectionOf(held.attributes?.glyphs),
      usage: sectionOf<UsageReading>(held.usage),
    }
    legends = {
      inbox: legendKept(held.inbox, legends.inbox),
      upkeep: legendKept(held.upkeep, legends.upkeep),
      attributes: legendKept(held.attributes, legends.attributes),
    }
    const reads = settleReads(outcomes, freshAts, Date.now())
    applyToItems(items, reads, legends)
    freshAts = {
      inbox: reads.inbox.lastFreshAt,
      upkeep: reads.upkeep.lastFreshAt,
      attributes: reads.attributes.lastFreshAt,
      usage: reads.usage.lastFreshAt,
    }
    logRefresh(trigger, outcomes)
    return undefined
  }

  // Asking for the file again answers a click at once rather than waiting to be told.
  // A file the service has not written leaves the strip as it is.
  const refresh = (trigger: string): undefined => {
    const held = readState<StatusBarState>(stateAt(akashaRoot(), SLUG))
    if (held === null) {
      return undefined
    }
    return draw(held, trigger)
  }

  const reading = followState<StatusBarState>(akashaRoot(), SLUG, (held) => draw(held, "status"))

  context.subscriptions.push(
    {
      dispose: () => {
        reading.stop()
      },
    },
    vscode.commands.registerCommand("opsStatusBar.refreshNow", () => refresh("manual"))
  )
  return undefined
}

function logRefresh(trigger: string, outcomes: ReadOutcomes): undefined {
  const failures: string[] = []
  if (outcomes.inbox.status === "rejected") {
    failures.push(`inbox: ${String(outcomes.inbox.reason)}`)
  }
  if (outcomes.upkeep.status === "rejected") {
    failures.push(`upkeep: ${String(outcomes.upkeep.reason)}`)
  }
  if (outcomes.attributes.status === "rejected") {
    failures.push(`attributes: ${String(outcomes.attributes.reason)}`)
  }
  if (outcomes.usage.status === "rejected") {
    failures.push(`usage: ${String(outcomes.usage.reason)}`)
  }
  if (failures.length === 0) {
    output.appendLine(`[${trigger}] drawn`)
    recordObservation(FEATURE, { outcome: "ok", counts: { failedReads: 0 } })
  } else {
    output.appendLine(`[${trigger}] partly drawn — ${failures.join("; ")}`)
    recordObservation(FEATURE, {
      outcome: "failed",
      failure: failures.join("; "),
      counts: { failedReads: failures.length },
    })
  }
  return undefined
}
