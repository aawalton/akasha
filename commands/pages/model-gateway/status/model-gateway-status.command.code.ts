import { computeModelGatewayTreeVersion } from "@akasha/agents/gateway-tree-version"
import type { LiveProxySeat } from "@akasha/agents/proxy-seats"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../modules/fault-saying/fault-saying.module.code.ts"
import { liveSeats } from "./live-gateway-seats/live-gateway-seats.module.code.ts"

export const JSON_OUT = "--json"

const SHORT = 12

const NONE = "—"

const LABEL = 8

export type Read = { readonly on: ReadonlySet<string> } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const on = new Set<string>()
  for (const one of argv) {
    if (one === JSON_OUT) {
      on.add(one)
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag a status takes — it takes \`${JSON_OUT}\``)
      continue
    }
    refusals.push(`\`${one}\` names a seat, and a status reads every live seat`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { on }
}

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

function statusing(on: ReadonlySet<string>, report: string[]): Answer {
  const seats = liveSeats()
  const onDisk = computeModelGatewayTreeVersion()
  const rows = seats.map((seat) => ({ seat, drift: driftOf(seat.runningVersion, onDisk) }))
  if (on.has(JSON_OUT)) {
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
    return { report, refusals: [], code: 0 }
  }
  for (const { seat, drift } of rows) {
    report.push(`${labelOf(seat)}\t${drift}\t${shortOf(seat.runningVersion)}\t${shortOf(onDisk)}`)
  }
  return { report, refusals: [], code: 0 }
}

export function modelGatewayStatus(argv: readonly string[], given: Given): Answer {
  void given
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return statusing(read.on, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
