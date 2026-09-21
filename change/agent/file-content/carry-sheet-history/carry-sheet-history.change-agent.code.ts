import { changeFileContentOfAnyKind } from "akasha/change/mechanical/file-content/change/change-file-content-of-any-kind/change-file-content-of-any-kind.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { storyDesignNote } from "akasha/story/world/design-notes/story-design-note.page-type.ts"

const HERE = "change/agent/file-content/carry-sheet-history"
const GAME = "game"
const CHARACTERS = "characters"
const LINES = "jsonl"
const PROSE = "prose"
const TXT = "txt"
const SHEET = "sheet"
const NAME = "name"
const ID = "id"
const SOURCE = "source"
const LADDERS = ["skills", "affinities"] as const

const CHANGE = `${changeMechanicalFileContent.slug}/${changeFileContentOfAnyKind.slug}` as const

type Swap = {
  readonly old: string
  readonly new: string
}

function parsedIn(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function namedIn(value: unknown): string | null {
  return isRecord(value) ? textAt(value, NAME) : null
}

function sheetsIn(world: World): ReadonlyMap<string, Record<string, unknown>> {
  const held = new Map<string, Record<string, unknown>>()
  for (const listed of world.index.everyOfType(storyDesignNote.slug)) {
    const at = besideAt(listed.path, PROSE, TXT)
    if (at === null) continue
    const text = world.textOf(at)
    if (text === null) continue
    const body = parsedIn(text)
    if (!isRecord(body) || !Array.isArray(body[LADDERS[0]])) continue
    const name = namedIn(body)
    if (name !== null) held.set(name, body)
  }
  return held
}

function entriesIn(
  value: Record<string, unknown>,
  ladder: string
): readonly Record<string, unknown>[] {
  const held = value[ladder]
  return Array.isArray(held) ? held.filter(isRecord) : []
}

function swapsFor(row: Record<string, unknown>, note: Record<string, unknown>): readonly Swap[] {
  const held: Swap[] = []
  for (const ladder of LADDERS) {
    const noted = new Map(entriesIn(note, ladder).map((one) => [textAt(one, ID), one]))
    for (const one of entriesIn(row, ladder)) {
      const ahead = noted.get(textAt(one, ID))
      if (ahead === undefined) continue
      const was = textAt(one, SOURCE)
      const now = textAt(ahead, SOURCE)
      if (was === null || now === null || was === now || !now.startsWith(was)) continue
      held.push({ old: JSON.stringify(one), new: JSON.stringify(ahead) })
    }
  }
  return held
}

function swapsIn(
  text: string,
  sheets: ReadonlyMap<string, Record<string, unknown>>
): readonly Swap[] {
  const held: Swap[] = []
  for (const line of text.split("\n")) {
    const row = parsedIn(line.trim())
    if (!isRecord(row)) continue
    const sheet = row[SHEET]
    if (!isRecord(sheet)) continue
    const name = namedIn(sheet)
    const note = name === null ? undefined : sheets.get(name)
    if (note === undefined) continue
    held.push(...swapsFor(sheet, note))
  }
  return held
}

function partedOn(text: string, said: string): number {
  return text.split(said).length - 1
}

async function carriedIn(world: World, at: string, swaps: readonly Swap[]): Promise<Answer> {
  const held: Answer[] = []
  let seen = world
  for (const one of swaps) {
    const done = await reach(seen, CHANGE, { at, old: one.old, new: one.new })
    if (done.said.refused !== null) return done.said
    held.push(done.said)
    seen = done.world
  }
  return gathered(held)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [GAME]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const named = given[GAME]
  if (named === undefined) return refusing(missing(GAME))
  const played = world.index.listedAt(game.slug, named)[0]
  if (played === undefined) return refusing(`\`${named}\` names no game, ${HERE}`)
  const at = besideAt(played.path, CHARACTERS, LINES)
  if (at === null) return refusing(`\`${named}\` keeps no characters, ${HERE}`)
  const text = world.textOf(at)
  if (text === null) return refusing(`\`${at}\` reads as nothing, ${HERE}`)
  const swaps = swapsIn(text, sheetsIn(world))
  for (const one of swaps) {
    const found = partedOn(text, one.old)
    if (found !== 1) return refusing(`a sheet entry sits ${found} times in \`${at}\`, ${HERE}`)
  }
  return await carriedIn(world, at, swaps)
}
