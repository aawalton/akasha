import {
  type Answer,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { z } from "zod"

const CHARACTER = "character"

const READING = "reading"

const FROM = "from"

const lineShape = z.looseObject({
  id: z.string(),
  result: z.string(),
  character: z.string(),
  buildHash: z.string(),
  bar: z.string(),
  reading: z.record(z.string(), z.unknown()),
})

type Line = z.infer<typeof lineShape>

type Held = { readonly text: string; readonly line: Line }

type Asked = Readonly<Record<string, string>>

function heldOf(text: string): readonly Held[] {
  const held: Held[] = []
  for (const one of text.split("\n")) {
    if (one.trim() === "") continue
    const parsed = lineShape.safeParse(JSON.parse(one))
    if (parsed.success) held.push({ text: one, line: parsed.data })
  }
  return held
}

function picked(
  held: readonly Held[],
  pick: string,
  character: string
): Held | { readonly refused: string } {
  const matching = held.filter((one) => one.line.id.startsWith(pick))
  if (matching.length === 1 && matching[0] !== undefined) return matching[0]
  if (matching.length === 0) return { refused: `\`${character}\` holds no reading \`${pick}\`` }
  return {
    refused: `\`${pick}\` names ${String(matching.length)} readings of \`${character}\`, and a pick names one`,
  }
}

export function repairReadingLineCommand(world: World, given: Asked): Answer {
  const character = given[CHARACTER]
  if (character === undefined) return refusing(missing(CHARACTER))
  const pick = given[READING]
  if (pick === undefined) return refusing(missing(READING))
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, character)[0]?.path
  if (characterAt === undefined) return refusing(`\`${character}\` names no character page`)
  const readingsAt = besideAt(characterAt, readings.propertySlug, "jsonl")
  const text = readingsAt === null ? null : world.textOf(readingsAt)
  if (readingsAt === null || text === null) {
    return refusing(`\`${character}\` holds no readings to repair`)
  }
  const held = heldOf(text)
  const one = picked(held, pick, character)
  if ("refused" in one) return refusing(one.refused)
  const source = given[FROM]
  if (source === undefined) {
    return stating([
      { kind: "replace", path: readingsAt, contentFrom: `${one.text}\n`, contentTo: "" },
    ])
  }
  const from = picked(held, source, character)
  if ("refused" in from) return refusing(from.refused)
  if (from.line.bar !== one.line.bar) {
    return refusing(`\`${source}\` reads the ${from.line.bar} and \`${pick}\` the ${one.line.bar}`)
  }
  const buildHash = from.line.buildHash
  if (buildHash === one.line.buildHash) {
    return refusing(`\`${pick}\` carries the build hash of \`${source}\` already`)
  }
  const result = resultOf({ ...one.line, buildHash })
  const holder = held.find((other) => other.line.result === result)
  if (holder !== undefined) {
    return refusing(
      `\`${pick}\` under the build hash of \`${source}\` repeats \`${holder.line.id}\`, and a result lands once`
    )
  }
  const repaired = JSON.stringify({ ...one.line, result, buildHash })
  return stating([
    { kind: "replace", path: readingsAt, contentFrom: `${one.text}\n`, contentTo: `${repaired}\n` },
  ])
}

export const takes: readonly string[] = [CHARACTER, READING, FROM]

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(repairReadingLineCommand(world, given))
}
