import { readFileSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperSetTextCompare as page } from "akasha/command/pages/temper/set-text-compare/temper-set-text-compare.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  type CatalogSet,
  disagreeingLines,
  type SetLine,
  setLinesIn,
} from "akasha/temper/catalog/gear/temper-set/modules/set-text-agreement/set-text-agreement.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

const NAMED = [json]

type Disagreeing = SetLine & { readonly set: string; readonly catalog: readonly string[] }

type Gathered = { readonly lines: readonly SetLine[]; readonly characters: number }

function gathered(root: string): Gathered | { readonly refused: string } {
  const lines = new Map<string, SetLine>()
  let characters = 0
  for (const one of valuesOfType(root, temperAccountCharacter.slug)) {
    const at = besideAt(one.path, readings.propertySlug, "jsonl")
    if (at === null) continue
    let body: string
    try {
      body = readFileSync(join(root, at), "utf8")
    } catch (thrown) {
      if (thrown instanceof Error && "code" in thrown && thrown.code === "ENOENT") continue
      return { refused: `\`${at}\` does not read: ${saidBy(thrown)}` }
    }
    characters += 1
    for (const line of setLinesIn(body)) {
      lines.set(`${String(line.esoSetId)} ${String(line.count)} ${line.text}`, line)
    }
  }
  return { lines: [...lines.values()], characters }
}

function catalogOf(): readonly (CatalogSet & { readonly set: string })[] {
  return setsAll().list.map((one) => ({
    set: one.name,
    esoSetId: one.esoSetId,
    lines: one.bonuses.map(({ count, description }) => ({ count, description })),
  }))
}

function disagreeingOf(lines: readonly SetLine[]): readonly Disagreeing[] {
  const catalog = catalogOf()
  const bySet = new Map(catalog.map((one) => [one.esoSetId, one]))
  return disagreeingLines(lines, catalog)
    .map((line) => {
      const held = bySet.get(line.esoSetId)
      return {
        ...line,
        set: held?.set ?? `set ${String(line.esoSetId)}, no page`,
        catalog: (held?.lines ?? [])
          .filter((one) => one.count === line.count)
          .map((one) => one.description),
      }
    })
    .sort(
      (one, other) =>
        one.set.localeCompare(other.set) ||
        one.count - other.count ||
        one.text.localeCompare(other.text)
    )
}

function disagreeingLinesSaid(one: Disagreeing): readonly string[] {
  const catalog = one.catalog.length === 0 ? ["  catalog: no line for that count"] : one.catalog
  return [
    `${one.set} (${String(one.esoSetId)}), ${String(one.count)} pieces`,
    `  game:    ${one.text}`,
    ...catalog.map((text, at) =>
      one.catalog.length === 0 ? text : `  catalog${at === 0 ? ":" : " "} ${text}`
    ),
    "",
  ]
}

export async function temperSetTextCompare(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const found = gathered(given.root)
  if ("refused" in found) return refused(found.refused, DATA)
  await loadSetCatalog()
  const disagreeing = disagreeingOf(found.lines)
  if (read.taken.json) {
    return asJson({ characters: found.characters, lines: found.lines.length, disagreeing })
  }
  return told([
    ...disagreeing.flatMap(disagreeingLinesSaid),
    `${String(disagreeing.length)} of ${String(found.lines.length)} set lines on the readings of ${String(found.characters)} characters disagree with the catalog`,
  ])
}
