import { resolve } from "node:path"
import { wholeNumberIn } from "akasha/code/type/narrowing/modules/whole-number-in/whole-number-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { char as charArgument } from "akasha/command/argument/pages/char.argument.ts"
import { charactersPath as charactersPathArgument } from "akasha/command/argument/pages/characters-path.argument.ts"
import { itemKey as itemKeyArgument } from "akasha/command/argument/pages/item-key.argument.ts"
import { json as jsonArgument } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  INPUT,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventoryKnowledge as page } from "akasha/command/pages/temper/inventory/knowledge/temper-inventory-knowledge.command.ts"
import {
  type CharacterKnowledge,
  knownMotifChapters,
  knownMotifStyleIds,
  knowsItem,
  loadTemperCharactersFromPath,
} from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import type { ItemKey } from "akasha/temper/items-rules-core/modules/use-destination-types/use-destination-types.module.code.ts"

const NAMED = [jsonArgument, charactersPathArgument, charArgument, itemKeyArgument]

const CHAR = charArgument.said

const ITEM_KEY = itemKeyArgument.said

const CHARACTERS_LUA = "TemperCharacters.lua"

const MASTER = "master"

export function itemKeyIn(raw: string): ItemKey | string {
  const colon = raw.indexOf(":")
  if (colon === -1) {
    return `\`${ITEM_KEY}\` takes \`<kind>:<args>\`, and \`${raw}\` carries no \`:\``
  }
  const kind = raw.slice(0, colon)
  const rest = raw.slice(colon + 1)
  if (kind === "recipe") {
    const resultItemId = wholeNumberIn(rest)
    if (resultItemId === null) {
      return `\`${ITEM_KEY} recipe:\` takes a whole number, and \`${rest}\` is none`
    }
    return { kind: "recipe", resultItemId }
  }
  if (kind === "script") {
    const scriptId = wholeNumberIn(rest)
    if (scriptId === null) {
      return `\`${ITEM_KEY} script:\` takes a whole number, and \`${rest}\` is none`
    }
    return { kind: "script", scriptId }
  }
  if (kind === "motif") {
    const sep = rest.indexOf(":")
    if (sep === -1) {
      return `\`${ITEM_KEY} motif:\` takes \`<styleId>:<chapterId|${MASTER}>\`, said \`motif:${rest}\``
    }
    const styleId = wholeNumberIn(rest.slice(0, sep))
    if (styleId === null) {
      return `\`${ITEM_KEY} motif:\` takes a whole number style, said \`motif:${rest}\``
    }
    const chapterRaw = rest.slice(sep + 1)
    if (chapterRaw === MASTER) return { kind: "motif", styleId, chapterId: null }
    const chapterId = wholeNumberIn(chapterRaw)
    if (chapterId === null) {
      return `\`${ITEM_KEY} motif:\` takes a whole number chapter or \`${MASTER}\`, said \`motif:${rest}\``
    }
    return { kind: "motif", styleId, chapterId }
  }
  return `\`${ITEM_KEY}\` carries \`recipe\`, \`motif\` and \`script\`, and \`${kind}\` is none of them`
}

function motifBookCount(one: CharacterKnowledge): number {
  let total = 0
  for (const styleId of knownMotifStyleIds(one)) {
    total += knownMotifChapters(one, styleId)?.size ?? 0
  }
  return total
}

export async function temperInventoryKnowledge(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const key = taken.itemKey === undefined ? null : itemKeyIn(taken.itemKey)
  if (typeof key === "string") return refused(key, INPUT)
  const root = resolve(given.root)
  const at =
    taken.charactersPath === undefined
      ? savedVarsFile(CHARACTERS_LUA)
      : resolve(root, taken.charactersPath)
  let characters: ReadonlyArray<CharacterKnowledge>
  try {
    characters = await loadTemperCharactersFromPath(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  let selected: ReadonlyArray<CharacterKnowledge> = characters
  if (taken.char !== undefined) {
    const match = characters.find((one) => one.id === taken.char)
    if (match === undefined) {
      return refused(
        `\`${CHAR} ${taken.char}\` names no character in ${CHARACTERS_LUA} at ${at}`,
        INPUT
      )
    }
    selected = [match]
  }
  if (key !== null) {
    const rows = selected.map((one) => ({
      id: one.id,
      name: one.name,
      knows: knowsItem(one, key),
    }))
    if (taken.json) return asJson(rows)
    return told(rows.map((one) => `${one.id}\t${one.name ?? ""}\t${one.knows}`))
  }
  const rows = selected.map((one) => ({
    id: one.id,
    name: one.name,
    recipeCount: one.recipeResultItemIds.size,
    motifCount: motifBookCount(one),
    scriptCount: one.unlockedScriptIds.size,
  }))
  if (taken.json) {
    const first = rows[0]
    const held = taken.char !== undefined && first !== undefined ? first : rows
    return asJson(held)
  }
  return told(
    rows.map(
      (one) =>
        `${one.id}\t${one.name ?? ""}\t${one.recipeCount}\t${one.motifCount}\t${one.scriptCount}`
    )
  )
}
