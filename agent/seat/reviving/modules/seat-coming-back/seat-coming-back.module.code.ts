import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  addressFor,
  type SeatStated,
  seatBody,
} from "akasha/agent/seat/declaration/modules/seat-stating/seat-stating.module.code.ts"
import { resolveSeatTarget } from "akasha/agent/seat/fleet/modules/seat-handle/seat-handle.module.code.ts"
import { underOldKeys } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { seatPathForName } from "akasha/agent/seat/modules/reading/seat-reading.module.code.ts"
import {
  dataError,
  inputError,
} from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { pagesOriginHere } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import { akashaHere } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { writingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const HEAD = "HEAD"

const WRITER = "seat reviver <seat-reviver@alanwalton.com>"

export interface Held {
  readonly at: string
  readonly commit: string
  readonly body: string
}

export type CameBack =
  | { readonly kind: "wrote" }
  | { readonly kind: "unstated" }
  | { readonly kind: "refused"; readonly said: string }

export type StatingSeat = (
  root: string,
  stated: SeatStated,
  seatName: string,
  said: string
) => Promise<CameBack>

export function tookAway(root: string, name: string): string | null {
  const at = told(root, [
    "log",
    "--format=%H",
    "--diff-filter=D",
    "-1",
    HEAD,
    "--",
    seatPathForName(name),
  ])
  const one = at === null ? "" : at.trim()
  return one === "" ? null : one
}

export function heldBefore(root: string, name: string): Held | null {
  const at = seatPathForName(name)
  const commit = tookAway(root, name)
  if (commit === null) return null
  const body = told(root, ["show", `${commit}^:${at}`])
  if (body === null || body === "") return null
  return { at, commit, body }
}

export function saidOfBack(name: string, commit: string): string {
  return `${name} comes back from ${commit}, the commit that took its page away`
}

export function alreadyThere(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

function statedFrom(values: Record<string, unknown>): SeatStated | null {
  const agentId = textIn(values["id"])
  if (agentId === null) return null
  const assignment = textIn(values["domain-slug"])
  return {
    agentId,
    persona: textIn(values["persona-slug"]),
    domain: assignment === null ? null : slugOf(assignment),
    assignment,
    role: textIn(values["role-slug"]),
    principal: textIn(values["person-slug"]),
    mode: textIn(values["start-mode"]),
    registration: textIn(values["registration-account"]),
    onCall: values["on-call"] === true,
    session: textIn(values["claude-code-session-uuid"]),
    parentName: textIn(values["principal-seat-name"]),
  }
}

export function statedIn(body: string): SeatStated | null {
  const held = loadedFrom(body)
  if (held.failed !== null || held.value === null) return null
  return statedFrom(underOldKeys(held.value as Record<string, unknown>))
}

const statedBack: StatingSeat = async (root, stated, seatName, said) => {
  const page = seatPathForName(seatName)
  const body = seatBody(stated, seatName, root, addressFor(stated, page, root, false))
  if (body === null) return { kind: "unstated" }
  const wrote = await writingFor(
    { writer: WRITER, message: said, puts: [{ path: page, content: body }] },
    undefined,
    undefined,
    pagesOriginHere()
  )
  if ("refused" in wrote) return { kind: "refused", said: wrote.refused }
  return { kind: "wrote" }
}

export async function seatBackFromHistory(
  root: string,
  name: string,
  done: string[] = [],
  stating: StatingSeat = statedBack
): Promise<Held | null> {
  if (alreadyThere(root, seatPathForName(name))) return null
  const held = heldBefore(root, name)
  if (held === null) return null
  const stated = statedIn(held.body)
  if (stated === null) return null
  const said = await stating(root, stated, name, saidOfBack(name, held.commit))
  if (said.kind === "refused") throw dataError(said.said)
  if (said.kind === "unstated") return null
  done.push(saidOfBack(name, held.commit))
  return held
}

export async function seatTargetOrBack(named: string, done: string[]): Promise<string> {
  const found = resolveSeatTarget(named)
  if (!("error" in found)) return found.id
  const back = await seatBackFromHistory(akashaHere(), named, done)
  if (back === null) throw inputError(found.error)
  const again = resolveSeatTarget(named)
  if ("error" in again) throw dataError(again.error)
  return again.id
}
