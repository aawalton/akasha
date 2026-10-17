import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { actionFile } from "akasha/command/argument/pages/action-file.argument.ts"
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
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import {
  type Turn as Placed,
  turnsIndexed,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import { storyTurnMake as page } from "akasha/command/pages/story/turn/make/story-turn-make.command.ts"
import {
  REACHED,
  type Reach,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  type Latest,
  LONGEST_ACTION,
  latestOf,
  stepIn,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  besideChapter,
  besideTurn,
  turnAfter,
} from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"
import { roleplayed } from "akasha/story/world/stories/played/turns/properties/roleplayed.boolean-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [storyArgument, actionFile] as const

const PARTED = "/"

const TRAILING_LINES = /(?:\r?\n)+$/

export type Chaptered = { readonly at: string; readonly latest: Latest }

export type Making = Pick<Reach, "hold" | "turnAt" | "reviewersIn" | "fold"> & {
  readonly turnsOf: (root: string, game: string) => readonly Placed[]
  readonly chapterLast: (root: string, game: string) => Chaptered | null
}

type Taken = { readonly game: string; readonly action: string }

function storyOf(game: string): string {
  return `${storyPlayed.slug}${PARTED}${game}`
}

export function chapterIndexed(root: string, game: string): Chaptered | null {
  const chapters = valuesOfType(root, storyChapterPlayed.slug).filter(
    (one) => one.value.story === storyOf(game) && typeof one.value.position === "number"
  )
  const last = chapters.toSorted(
    (one, other) => Number(other.value.position) - Number(one.value.position)
  )[0]
  if (last === undefined) return null
  const slug = textIn(last.value.lastTurn)
  const position = last.value.lastTurnPosition
  if (slug === null || typeof position !== "number") return null
  const unit = textIn(last.value.unit)
  return {
    at: last.path,
    latest: { slug, position, collections: [storyOf(game)], unit, status: null },
  }
}

const MADE: Making = { ...REACHED, turnsOf: turnsIndexed, chapterLast: chapterIndexed }

function taken(argv: readonly string[], calledAs: string, root: string): Taken | readonly string[] {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return read.refused
  const game = bareOf(read.taken.story.trim())
  if (game === "") return [`\`${storyArgument.said}\` names no story`]
  const file = heldAt(root, actionFile.said, read.taken.actionFile)
  if ("refused" in file) return file.refused
  const action = file.text.replace(TRAILING_LINES, "")
  if (action.trim() === "") {
    return [`\`${actionFile.said} ${read.taken.actionFile}\` holds no action`]
  }
  if (action.length > LONGEST_ACTION) {
    return [
      `an action is at most ${LONGEST_ACTION} characters, and \`${read.taken.actionFile}\` holds ${action.length}`,
    ]
  }
  return { game, action }
}

type Following = { readonly latest: Latest; readonly at: (slug: string) => string }

function followingOf(reach: Making, root: string, placed: Placed): Following | null {
  const turn = reach.turnAt(root, placed.slug)
  if (turn === null) return null
  const latest: Latest = {
    slug: placed.slug,
    position: placed.position,
    collections: stringsIn(turn.value.partOfCollections),
    unit: textIn(turn.value.unit),
    status: stepIn(turn.value.stepStatus),
  }
  return { latest, at: (slug) => besideTurn(turn.at, slug) }
}

function reviewedOf(reach: Making, root: string): readonly string[] {
  return reach.reviewersIn(root).map((one) => `${storyReviewer.slug}${PARTED}${one.slug}`)
}

async function madeAfter(
  done: string[],
  read: Taken,
  following: Following,
  given: Given,
  landing: Landing,
  reach: Making
): Promise<Answer> {
  const made = turnAfter(following.latest, read.action)
  if ("refused" in made) return refused(made.refused, DATA)
  if (reach.turnAt(given.root, made.slug) !== null) {
    return refused(`\`${made.slug}\` is a turn here already, so no turn is made again`, DATA)
  }
  const at = following.at(made.slug)
  const values = {
    ...made.values,
    [roleplayed.propertySlug]: true,
    reviewedBy: reviewedOf(reach, given.root),
  }
  const naming = { pageTypeSlug: storyTurnPlayed.slug, slug: made.slug, path: at, fresh: true }
  const asking = reach.fold(given.root, { ...naming, values })
  if ("refused" in asking) return refused(asking.refused, DATA)
  const by = { agentId: given.agentId, writer: given.writer, done }
  const message = `${made.slug} is made from a roleplay conversation`
  const landed = await landing(given.root, asking, message, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([`${storyTurnPlayed.slug}${PARTED}${made.slug}\t${WORLD_BUILDER}`, `at\t${at}`])
}

async function madeOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Making
): Promise<Answer> {
  const read = taken(argv, given.calledAs, given.root)
  if (!("game" in read)) return refusedBy(read, INPUT)
  const placed = latestOf(reach.turnsOf(given.root, read.game))
  if (placed !== null) {
    return await reach.hold(given.root, placed.at, async () => {
      const following = followingOf(reach, given.root, placed)
      if (following === null) return refused(`\`${placed.slug}\` is no played turn here`, DATA)
      return await madeAfter(done, read, following, given, landing, reach)
    })
  }
  const chapter = reach.chapterLast(given.root, read.game)
  if (chapter === null) {
    return refused(`\`${read.game}\` has no turn and no chapter for a new turn to follow`, DATA)
  }
  const following = {
    latest: chapter.latest,
    at: (slug: string) => besideChapter(chapter.at, slug),
  }
  return await reach.hold(
    given.root,
    chapter.at,
    async () => await madeAfter(done, read, following, given, landing, reach)
  )
}

export async function storyTurnMake(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Making = MADE
): Promise<Answer> {
  return await answering(async (done) => await madeOn(done, argv, given, landing, reach))
}
