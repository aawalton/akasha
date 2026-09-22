import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  addressFor,
  type SeatStated,
  seatBody,
} from "akasha/agent/seat/declaration/modules/seat-stating/seat-stating.module.code.ts"
import { seatPathForName } from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"

const PUT = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const TAKE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const TAKE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const UNFILED = "names no page, so no page is taken away"

export type Stating =
  | { readonly kind: "wrote" }
  | { readonly kind: "took" }
  | { readonly kind: "unchanged" }
  | { readonly kind: "unstated" }
  | { readonly kind: "refused"; readonly said: string }

function refusing(wrong: readonly string[], done: readonly string[]): Stating {
  return { kind: "refused", said: [wrong.join("; "), ...partWay(done)].join(" ") }
}

export async function statedSeat(
  root: string,
  stated: SeatStated,
  seatName: string,
  landing: Landing = runMechanicalChange
): Promise<Stating> {
  const page = seatPathForName(seatName)
  const there = existsSync(join(root, page))
  const was = there ? readFileSync(join(root, page), "utf8") : null
  const addressed = addressFor(stated, page, root, there)
  const body = seatBody(stated, seatName, root, addressed)
  if (body === null) return { kind: "unstated" }
  if (was === body) return { kind: "unchanged" }
  const given = was === null ? { at: page, body } : { at: page, body, old: was }
  const done: string[] = []
  const landed = await landing(
    root,
    [{ at: PUT, given }],
    `${seatName}: the seat is in akasha as what it states`,
    { done }
  )
  const refused = refusalsIn(landed)
  if (refused.length > 0) return refusing(refused, done)
  return { kind: "wrote" }
}

export function unfiled(wrong: readonly string[]): boolean {
  return wrong.length === 1 && wrong[0]?.includes(UNFILED) === true
}

export async function tookSeat(
  root: string,
  seatName: string,
  why: string,
  landing: Landing = runMechanicalChange
): Promise<Stating> {
  const page = seatPathForName(seatName)
  if (!existsSync(join(root, page))) return { kind: "unchanged" }
  const message = `${seatName} stopped, ${why}, so its page goes`
  const done: string[] = []
  const refused = refusalsIn(
    await landing(root, [{ at: TAKE, given: { at: page } }], message, { done })
  )
  if (refused.length === 0) return { kind: "took" }
  if (!unfiled(refused)) return refusing(refused, done)
  const taken: readonly Asking[] = [{ at: TAKE_FILE, given: { at: page } }]
  const left = refusalsIn(await landing(root, taken, message, { done }))
  if (left.length > 0) return refusing(left, done)
  return { kind: "took" }
}
