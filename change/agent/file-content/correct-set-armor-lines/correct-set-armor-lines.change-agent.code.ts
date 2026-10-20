import {
  type Answer,
  type FileChange,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { metricResistance } from "akasha/temper/player/progress/temper-metric-tree/pages/metric-resistance.temper-metric-tree.ts"
import {
  jsonlBodyOf,
  jsonlLinesOf,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const SETS = "temper/catalog/gear/temper-set/pages/"

const BONUSES = ".temper-set.bonuses.jsonl"

const ADDS_ARMOR = /^Adds (\d+) Armor$/

const ARMOR = `${metricResistance.type.slice("page-type/".length)}/${metricResistance.slug}`

type Json = Record<string, unknown>

type Counts = { sets: number; halved: number; whole: number; other: string[] }

function soleArmorEffect(bonus: Json): Json | null {
  const effects = bonus["effects"]
  if (!Array.isArray(effects) || effects.length !== 1) return null
  const [effect] = effects as unknown[]
  if (!isRecord(effect)) return null
  if (effect["metricId"] !== ARMOR || effect["type"] !== "integer") return null
  return typeof effect["value"] === "number" ? effect : null
}

function correctedLine(text: string, at: string, counts: Counts): string {
  const bonus = JSON.parse(text) as unknown
  if (!isRecord(bonus) || typeof bonus["description"] !== "string") return text
  const adds = ADDS_ARMOR.exec(bonus["description"])?.[1]
  if (adds === undefined) return text
  const armor = Number(adds)
  const effect = soleArmorEffect(bonus)
  if (effect !== null && effect["value"] === armor) {
    counts.whole += 1
    return text
  }
  if (effect === null || effect["value"] !== Math.floor(armor / 2)) {
    counts.other.push(`${at} ${String(bonus["count"])}`)
    return text
  }
  if (JSON.stringify(bonus) !== text) {
    counts.other.push(`${at} ${String(bonus["count"])}`)
    return text
  }
  effect["value"] = armor
  counts.halved += 1
  return JSON.stringify(bonus)
}

export function correctSetArmorLinesCommand(world: World): Answer {
  const paths = world
    .under(SETS)
    .filter((path) => path.endsWith(BONUSES))
    .sort()
  if (paths.length === 0) return refusing(`no set under \`${SETS}\` states its bonuses`)
  const counts: Counts = { sets: 0, halved: 0, whole: 0, other: [] }
  const edits: FileChange[] = []
  for (const path of paths) {
    const text = world.textOf(path)
    if (text === null) continue
    const held = jsonlLinesOf(text)
    const set = path.slice(SETS.length).split("/")[0] ?? path
    const corrected = held.map((one) => correctedLine(one, set, counts))
    if (corrected.every((one, at) => one === held[at])) continue
    counts.sets += 1
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: jsonlBodyOf(corrected) })
  }
  return telling(stating(edits), [
    `${String(counts.halved)} Armor lines in ${String(counts.sets)} sets set from half to the Armor their description adds`,
    `${String(counts.whole)} Armor lines already add the Armor their description adds`,
    `${String(counts.other.length)} Armor lines holding neither left as they are${counts.other.length === 0 ? "" : `: ${counts.other.join(", ")}`}`,
  ])
}

export const takes: readonly string[] = []

export function runChange(world: World, given: Readonly<Record<string, string>>): Promise<Answer> {
  const asked = Object.keys(given)[0]
  if (asked !== undefined)
    return Promise.resolve(refusing(`\`${asked}\` is no argument this change takes`))
  return Promise.resolve(correctSetArmorLinesCommand(world))
}
