import type { WriteAct } from "@akasha/pages-system/page-landing-judge"
import { resolveSeatTarget } from "../../seat-handle/seat-handle.module.code.ts"
import { messagePageAddress } from "../message-page-address/message-page-address.module.code.ts"
import { names, undeclared } from "../message-to/message-to.module.code.ts"
import { reachSeat, resumeSeat } from "../message-to-start/message-to-start.module.code.ts"

const MESSAGE = "message"

const UNREACHABLE = 503

const UNREADABLE = 400

const DETAIL = 300

export interface ReachedSeat {
  readonly name: string
  readonly to: string
  readonly reviveId: string | null
}

export type Reaching =
  | { readonly kind: "unaddressed" }
  | { readonly kind: "reached"; readonly at: ReachedSeat }
  | { readonly kind: "refused"; readonly status: number; readonly reason: string }

function senderIn(values: Record<string, unknown>): string | null {
  const from = values.from
  if (typeof from !== "string" || from.trim() === "") return null
  try {
    const found = resolveSeatTarget(from.trim())
    return "error" in found ? null : found.id
  } catch {
    return null
  }
}

export async function reaching(
  root: string,
  act: WriteAct,
  pageType: string,
  name: string,
  values: Record<string, unknown>
): Promise<Reaching> {
  if (pageType !== MESSAGE || act !== "write") return { kind: "unaddressed" }
  const addressed = messagePageAddress(name, root)
  if (addressed === null) return { kind: "unaddressed" }
  const { stated } = addressed
  if (stated.kind === "refuse") {
    return { kind: "refused", status: UNREADABLE, reason: stated.reason }
  }
  const missing = undeclared(stated)
  if (missing !== null) return { kind: "refused", status: UNREADABLE, reason: missing }
  const reached = await reachSeat(stated, senderIn(values))
  if (reached.kind === "refuse") {
    return { kind: "refused", status: UNREACHABLE, reason: reached.reason }
  }
  const to = reached.seat.name
  if (to === null || to.trim() === "") {
    return {
      kind: "refused",
      status: UNREACHABLE,
      reason:
        `the seat reached for ${names(stated)} carries no name, so there is no directory to ` +
        "write its message in",
    }
  }
  return {
    kind: "reached",
    at: { name: `${to}/${addressed.id}`, to, reviveId: reached.revive ? reached.seat.id : null },
  }
}

export async function revived(reached: Reaching, relPath: string): Promise<string | null> {
  if (reached.kind !== "reached" || reached.at.reviveId === null) return null
  const woke = await resumeSeat(reached.at.reviveId)
  if (woke.code === 0) return null
  const detail = (woke.stderr.trim() !== "" ? woke.stderr : woke.stdout).trim()
  return (
    `the message stands at ${relPath} and reviving ${reached.at.reviveId} to read it exited ` +
    `${woke.code}: ${detail.slice(0, DETAIL)}`
  )
}
