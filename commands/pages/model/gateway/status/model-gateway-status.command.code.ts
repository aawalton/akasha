import { computeModelGatewayTreeVersion } from "akasha/agents/models/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import type { LiveProxySeat } from "akasha/agents/models/gateway/modules/proxy-seats/proxy-seats.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answeredWith,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { liveSeats } from "akasha/commands/pages/model/gateway/live-gateway-seats/live-gateway-seats.module.code.ts"
import { modelGatewayStatus as page } from "akasha/commands/pages/model/gateway/status/model-gateway-status.command.ts"

const SHORT = 12

const NONE = "—"

const LABEL = 8

type Drift = "current" | "lagging" | "unknown"

export function driftOf(running: string | null, onDisk: string | null): Drift {
  if (running == null || onDisk == null) return "unknown"
  return running === onDisk ? "current" : "lagging"
}

export function shortOf(version: string | null): string {
  if (version == null || version.length === 0) return NONE
  return version.slice(0, SHORT)
}

function labelOf(seat: LiveProxySeat): string {
  return seat.name ?? seat.agentId.slice(0, LABEL)
}

function statusing(asJson: boolean, report: string[]): Answer {
  const seats = liveSeats()
  const onDisk = computeModelGatewayTreeVersion()
  const rows = seats.map((seat) => ({ seat, drift: driftOf(seat.runningVersion, onDisk) }))
  if (asJson) {
    report.push(
      JSON.stringify({
        ok: true,
        onDiskVersion: onDisk,
        seats: rows.map(({ seat, drift }) => ({
          agentId: seat.agentId,
          name: seat.name,
          status: drift,
          runningVersion: seat.runningVersion,
        })),
      })
    )
    return told(report)
  }
  for (const { seat, drift } of rows) {
    report.push(`${labelOf(seat)}\t${drift}\t${shortOf(seat.runningVersion)}\t${shortOf(onDisk)}`)
  }
  return told(report)
}

export function modelGatewayStatus(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedBy(read.refused)
  const report: string[] = []
  try {
    return statusing(read.taken.json, report)
  } catch (thrown) {
    return answeredWith(report, [whyOf(thrown)], OPERATIONAL)
  }
}
