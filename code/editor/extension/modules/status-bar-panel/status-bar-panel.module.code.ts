import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type StatusBarState,
  type StatusBarStoplights,
  statusBarStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/status-bar/status-bar.code-editor-data-interface.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import {
  applyToItems,
  type FreshAts,
  type ReadOutcomes,
  settleReads,
} from "akasha/code/editor/extension/modules/status-bar-drawing/status-bar-drawing.module.code.ts"
import {
  NO_LEGENDS,
  type StoplightLegends,
} from "akasha/code/editor/extension/modules/status-bar-legends/status-bar-legends.module.code.ts"
import { SLOTS } from "akasha/code/editor/extension/modules/status-bar-slots/status-bar-slots.module.code.ts"
import {
  SEPARATOR_GLYPH,
  SEPARATOR_HEX,
} from "akasha/code/editor/extension/modules/status-bar-theme/status-bar-theme.module.code.ts"
import type { UsageReading } from "akasha/code/editor/extension/modules/status-bar-usage/status-bar-usage.module.code.ts"
import type { WorkstationReading } from "akasha/code/editor/extension/modules/status-bar-workstation/status-bar-workstation.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "status-bar"
const SLUG = "status-bar"

let output: vscode.OutputChannel

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
    resources: undefined,
    inbox: undefined,
    usage: undefined,
    workstation: undefined,
  }

  let legends: StoplightLegends = NO_LEGENDS

  const draw = (held: StatusBarState, trigger: string): undefined => {
    const outcomes: ReadOutcomes = {
      resources: sectionOf(held.resources?.glyphs),
      inbox: sectionOf(held.inbox?.glyphs),
      usage: sectionOf<UsageReading>(held.usage),
      workstation: sectionOf<WorkstationReading>(held.workstation),
    }
    legends = {
      resources: legendKept(held.resources, legends.resources),
      inbox: legendKept(held.inbox, legends.inbox),
    }
    const reads = settleReads(outcomes, freshAts, Date.now())
    applyToItems(items, reads, legends)
    freshAts = {
      resources: reads.resources.lastFreshAt,
      inbox: reads.inbox.lastFreshAt,
      usage: reads.usage.lastFreshAt,
      workstation: reads.workstation.lastFreshAt,
    }
    logRefresh(trigger, outcomes)
    return undefined
  }

  const refresh = (trigger: string): undefined => {
    const held = readState(stateAt(akashaRoot(), SLUG), statusBarStateSchema)
    if (held === null) {
      return undefined
    }
    return draw(held, trigger)
  }

  const reading = followState(akashaRoot(), SLUG, statusBarStateSchema, (held) =>
    draw(held, "status")
  )

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
  if (outcomes.workstation.status === "rejected") {
    failures.push(`workstation: ${String(outcomes.workstation.reason)}`)
  }
  if (outcomes.resources.status === "rejected") {
    failures.push(`resources: ${String(outcomes.resources.reason)}`)
  }
  if (outcomes.inbox.status === "rejected") {
    failures.push(`inbox: ${String(outcomes.inbox.reason)}`)
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
