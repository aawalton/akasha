import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { cloneAs as cloneAsArgument } from "akasha/command/argument/pages/clone-as.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyClone as page } from "akasha/command/pages/story/clone/story-clone.command.ts"
import {
  addressOf,
  type Copy,
  cloneFolderOf,
  committedUnder,
  copied,
  copiesOf,
  folderOf,
  inTestWorld,
  isCode,
  latestOf,
  masterOf,
  referrersOf,
  slugsRenamed,
  TEST_WORLD,
} from "akasha/command/pages/story/modules/cloning/story-cloning.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { lowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [storyArgument, cloneAsArgument] as const

const ADD_FILE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const ADD_VALUE = `${changeMechanicalFileContent.slug}/${addPropertyValue.slug}` as const

const PAGE_TYPE_FILE = ".page-type.ts"

const PAGE_FILE = ".ts"

const PARTS = "parts"

const MASTER = "coordinatorAgent"

const ENDS = "endsAt"

const TAB = "\t"

const UTF8 = "utf8"

const ENDED: readonly string[] = [
  `.${storyTurnPlayed.slug}${PAGE_FILE}`,
  `.${storyChapterPlayed.slug}${PAGE_FILE}`,
]

export type Reach = {
  readonly storyAt: (root: string, slug: string) => string | null
  readonly there: (root: string, path: string) => boolean
  readonly committedUnder: (root: string, folder: string) => readonly string[]
  readonly textOf: (root: string, path: string) => string | null
  readonly valueOf: (root: string, path: string) => Value | null
  readonly partsNaming: (root: string, path: string) => readonly string[]
  readonly minted: () => string
}

function textOnDisk(root: string, path: string): string | null {
  const at = join(root, path)
  return existsSync(at) ? readFileSync(at, UTF8) : null
}

function partsIndexed(root: string, path: string): readonly string[] {
  return referrersOf(root, path)
    .filter((one) => one.propertySlug === PARTS)
    .map((one) => one.path)
}

const INDEXED: Reach = {
  storyAt: (root, slug) => listedAt(root, storyPlayed.slug, slug)[0]?.path ?? null,
  there: (root, path) => existsSync(join(root, path)),
  committedUnder,
  textOf: textOnDisk,
  valueOf: (root, path) => valueAt(path, root),
  partsNaming: partsIndexed,
  minted: () => uuidVersion7(),
}

type Taken = { readonly from: string; readonly to: string }

function taken(argv: readonly string[], calledAs: string): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const from = read.taken.story.trim()
  const to = read.taken.cloneAs.trim()
  if (!lowerKebabCase(to)) {
    return { refused: `\`${to}\` is no slug — \`${cloneAsArgument.said}\` takes lower kebab case` }
  }
  const fault = nameFaultIn(to)
  if (fault !== null) return { refused: fault }
  return { from, to }
}

export type Planned = {
  readonly asked: readonly Asking[]
  readonly copies: readonly Copy[]
  readonly master: string
  readonly opensAt: string | null
  readonly folder: string
}

function rank(at: string): number {
  if (at.endsWith(PAGE_TYPE_FILE)) return 0
  return isCode(at) ? 2 : 1
}

function partsAsked(
  root: string,
  sources: readonly string[],
  held: Taken,
  folder: string,
  reach: Reach
): readonly Asking[] {
  const asked: Asking[] = []
  for (const path of sources) {
    if (isCode(path) || !path.endsWith(PAGE_FILE)) continue
    const value = reach.valueOf(root, path)
    const address = value === null ? null : addressOf(value)
    if (address === null) continue
    const copy = slugsRenamed(address, held.from, held.to)
    for (const parent of reach.partsNaming(root, path)) {
      if (parent.startsWith(folder)) continue
      asked.push({ at: ADD_VALUE, given: { at: parent, key: PARTS, value: copy } })
    }
  }
  return asked
}

export function planned(
  root: string,
  held: Taken,
  reach: Reach
): Planned | { readonly refused: string; readonly code: number } {
  const storyPath = reach.storyAt(root, held.from)
  if (storyPath === null)
    return { refused: `\`${held.from}\` names no played story here`, code: DATA }
  if (!inTestWorld(storyPath)) {
    return {
      refused: `\`${held.from}\` sits at \`${storyPath}\`, outside \`${TEST_WORLD}\`, and only a story there is cloned`,
      code: INPUT,
    }
  }
  const folder = folderOf(storyPath)
  const cloneFolder = cloneFolderOf(folder, held.from, held.to)
  if (reach.storyAt(root, held.to) !== null || reach.there(root, cloneFolder)) {
    return { refused: `\`${held.to}\` is held already, so no clone is made under it`, code: INPUT }
  }
  const value = reach.valueOf(root, storyPath)
  const said = value === null ? null : textAt(value, MASTER)
  const master = said === null ? null : masterOf(said, held.from, held.to)
  if (master === null) {
    return {
      refused: `\`${held.from}\` names \`${said ?? "no game master"}\`, which is no game master named for it`,
      code: DATA,
    }
  }
  const files = reach.committedUnder(root, folder)
  const ends = files
    .filter((one) => ENDED.some((ending) => one.endsWith(ending)))
    .map((one) => {
      const ended = reach.valueOf(root, one)
      return ended === null ? null : textAt(ended, ENDS)
    })
  const opensAt = latestOf(ends)
  const sources: { path: string; text: string }[] = []
  for (const path of files.filter((one) => copied(folder, one))) {
    const text = reach.textOf(root, path)
    if (text !== null) sources.push({ path, text })
  }
  const copies = copiesOf(sources, {
    folder,
    storyPath,
    story: { from: held.from, to: held.to, master, opensAt },
  }).toSorted((one, two) => rank(one.at) - rank(two.at))
  const added: Asking[] = copies.map((one) => ({
    at: ADD_FILE,
    given: isCode(one.at)
      ? { at: one.at, body: one.body }
      : { at: one.at, body: one.body, id: reach.minted() },
  }))
  const parts = partsAsked(
    root,
    sources.map((one) => one.path),
    held,
    folder,
    reach
  )
  return { asked: [...added, ...parts], copies, master, opensAt, folder: cloneFolder }
}

function rowsOf(held: Taken, made: Planned, commit: string | null): readonly string[] {
  return [
    `story${TAB}${held.to}`,
    `clonedFrom${TAB}${held.from}`,
    `folder${TAB}${made.folder}`,
    `gameMaster${TAB}${made.master}`,
    ...(made.opensAt === null ? [] : [`opensAt${TAB}${made.opensAt}`]),
    `files${TAB}${String(made.copies.length)}`,
    ...(commit === null ? [] : [`commit${TAB}${commit}`]),
  ]
}

async function cloned(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const made = planned(given.root, held, reach)
  if ("refused" in made) return refused(made.refused, made.code)
  const landed = await landing(given.root, made.asked, `clone ${held.from} as ${held.to}`, {
    agentId: given.agentId,
    writer: given.writer,
    done,
  })
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(rowsOf(held, made, landed.commit))
}

export async function storyClone(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = INDEXED
): Promise<Answer> {
  return await answering(async (done) => await cloned(done, argv, given, landing, reach))
}
