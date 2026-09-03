import * as os from "node:os"
import * as path from "node:path"
import { duringOneCall } from "@akasha/command-system/during-call"
import * as vscode from "vscode"
import {
  drawGroup,
  type GroupDrawing,
  nameTheStore,
} from "../group-stoplights/group-stoplights.module.code.ts"
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
import { readUsage } from "../status-bar-usage/status-bar-usage.module.code.ts"

const FEATURE = "status-bar"

const POLL_INTERVAL_MS = 30_000

const UPKEEP_GROUP = "upkeep"

const INBOX_GROUP = "inboxes"

let output: vscode.OutputChannel

function glyphsSettled(settled: PromiseSettledResult<GroupDrawing>): PromiseSettledResult<string> {
  return settled.status === "fulfilled"
    ? { status: "fulfilled", value: settled.value.glyphs }
    : settled
}

function legendKept(
  settled: PromiseSettledResult<GroupDrawing>,
  held: string | undefined
): string | undefined {
  if (settled.status !== "fulfilled" || settled.value.legend === "") {
    return held
  }
  return settled.value.legend
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Status Bar")
  context.subscriptions.push(output)

  process.env.AKASHA_ROOT ??= path.join(os.homedir(), "repos", "akasha")
  nameTheStore()

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
    usage: undefined,
  }

  let legends: StoplightLegends = NO_LEGENDS

  const readOnce = async (trigger: string): Promise<undefined> => {
    const [inbox, upkeep, usage] = await duringOneCall(async () =>
      Promise.allSettled([drawGroup(INBOX_GROUP), drawGroup(UPKEEP_GROUP), readUsage()])
    )
    const outcomes: ReadOutcomes = {
      inbox: glyphsSettled(inbox),
      upkeep: glyphsSettled(upkeep),
      usage,
    }
    legends = {
      inbox: legendKept(inbox, legends.inbox),
      upkeep: legendKept(upkeep, legends.upkeep),
    }
    const reads = settleReads(outcomes, freshAts, Date.now())
    applyToItems(items, reads, legends)
    freshAts = {
      inbox: reads.inbox.lastFreshAt,
      upkeep: reads.upkeep.lastFreshAt,
      usage: reads.usage.lastFreshAt,
    }
    logRefresh(trigger, outcomes)
    return undefined
  }

  let reading: Promise<undefined> | undefined

  const refresh = async (trigger: string): Promise<undefined> => {
    const inFlight = reading
    if (inFlight !== undefined) {
      output.appendLine(`[${trigger}] a read is already in flight — waiting for it`)
      await inFlight
      return undefined
    }
    const started = readOnce(trigger)
    reading = started
    try {
      await started
    } finally {
      reading = undefined
    }
    return undefined
  }

  await refresh("activate")

  const timer = setInterval(() => void refresh("poll"), POLL_INTERVAL_MS)
  context.subscriptions.push({ dispose: () => clearInterval(timer) })

  context.subscriptions.push(
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
  if (outcomes.usage.status === "rejected") {
    failures.push(`usage: ${String(outcomes.usage.reason)}`)
  }
  if (failures.length === 0) {
    output.appendLine(`[${trigger}] refreshed`)
    recordObservation(FEATURE, { outcome: "ok", counts: { failedReads: 0 } })
  } else {
    output.appendLine(`[${trigger}] partial refresh — ${failures.join("; ")}`)
    recordObservation(FEATURE, {
      outcome: "failed",
      failure: failures.join("; "),
      counts: { failedReads: failures.length },
    })
  }
  return undefined
}
