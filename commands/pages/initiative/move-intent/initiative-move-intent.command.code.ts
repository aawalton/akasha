import { resolve } from "node:path"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { whyOf } from "@akasha/command-system/fault-saying"
import { initiativesDrawn } from "@akasha/domains/work-initiatives"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"

const CARRIES = "change-mechanical-file-content/move-property-value"

const INTENTS = "intents"

const TAKES = "this takes three words: an initiative, the place moved from and the place moved to"

export type Asked = {
  readonly slug: string
  readonly from: number
  readonly to: number
}

export type Read = Asked | { readonly refused: readonly string[] }

function placeOf(said: string): number | null {
  if (!/^[0-9]+$/.test(said)) return null
  const held = Number(said)
  return held >= 1 ? held : null
}

function noPlace(said: string): string {
  return `\`${said}\` is no place, a place being a whole number counted from one`
}

export function readIn(argv: readonly string[]): Read {
  const slug = argv[0]
  const from = argv[1]
  const to = argv[2]
  if (slug === undefined || from === undefined || to === undefined || argv.length !== 3) {
    return { refused: [`${TAKES}, and ${argv.length} arrived`] }
  }
  const away = placeOf(from)
  const onto = placeOf(to)
  const refusals = [
    ...(away === null ? [noPlace(from)] : []),
    ...(onto === null ? [noPlace(to)] : []),
  ]
  if (away === null || onto === null) return { refused: refusals }
  return { slug, from: away, to: onto }
}

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so it holds no intents to order`
}

export function messageFor(asked: Asked): string {
  return `move ${asked.slug} intent ${asked.from} to place ${asked.to}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const moved = `${asked.slug}: the intent at place ${asked.from} is now at place ${asked.to}`
  return commit === null ? [moved] : [moved, commit]
}

async function carried(root: string, at: string, asked: Asked, given: Given): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at, key: INTENTS, from: asked.from, to: asked.to } }],
    messageFor(asked),
    given.agentId,
    { writer: given.writer }
  )
  if ("refusals" in landed) return { report: [], refusals: [...landed.refusals], code: 2 }
  return { report: [...saidFor(asked, landed.commit)], refusals: [], code: 0 }
}

export async function initiativeMoveIntent(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: [...read.refused], code: 1 }
  try {
    const root = resolve(given.root)
    const one = initiativesDrawn(root).find((each) => each.slug === read.slug)
    if (one === undefined) return { report: [], refusals: [noInitiative(read.slug)], code: 2 }
    return await carried(root, one.path, read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
