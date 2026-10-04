import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { issues as issuesFile } from "akasha/story/chapter/properties/issues.file-property.ts"
import { mechanicsIssues as mechanicsIssuesFile } from "akasha/story/chapter/properties/mechanics-issues.file-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  CHAPTER,
  type Held,
  linesIn,
  type Moved,
  type Repair,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const COLLECTIONS = "partOfCollections"

const STATUS = "stepStatus"

const LORE = "lore"

const ISSUES = "issues"

const REVIEWED_BY = "reviewedBy"

const RECORDED_BY = "recordedBy"

const MECHANICS_ISSUES = "mechanicsIssues"

const MECHANICS_SENT_BACK = "mechanicsSentBack"

const PROSE = "prose"

const STORY = "story"

const OWN_LENGTH = "ownLength"

const PARTED = "/"

const WRITTEN_OPENING = `${storyWritten.slug}${PARTED}`

const OPENINGS = [`${storyPlayed.slug}${PARTED}`, WRITTEN_OPENING]

type TextOf = (path: string) => string

function linesBeside(turn: Turn, key: string, propertySlug: string, textOf: TextOf) {
  const ending = turn.value[key]
  const at = typeof ending === "string" ? besideAt(turn.at, propertySlug, ending) : null
  if (at === null) return []
  try {
    return linesIn(textOf(at))
  } catch {
    return []
  }
}

const ISSUES_HELD = "txt"

function linesLeft(
  said: Moved,
  key: string,
  lines: readonly string[] | null | undefined,
  was: readonly string[]
): readonly string[] {
  if (key in said.values && said.values[key] === undefined) return []
  return lines ?? was
}

export function repairsAfter(at: string, held: Held, said: Moved): readonly Repair[] {
  const left = [
    [issuesFile.propertySlug, linesLeft(said, ISSUES, said.issues, held.issues)],
    [
      mechanicsIssuesFile.propertySlug,
      linesLeft(said, MECHANICS_ISSUES, said.mechanicsIssues, held.mechanicsIssues ?? []),
    ],
  ] as const
  return left.flatMap(([slug, lines]) => {
    const file = besideAt(at, slug, ISSUES_HELD)
    return lines.length === 0 || file === null ? [] : [{ file, faults: lines.length }]
  })
}

export function heldOf(turn: Turn, textOf: TextOf = () => ""): Held | { readonly refused: string } {
  const of = turn.value[STORY]
  const named = [...stringsIn(turn.value[COLLECTIONS]), ...(typeof of === "string" ? [of] : [])]
  const story = named.find((one) => OPENINGS.some((opening) => one.startsWith(opening)))
  if (story === undefined) return { refused: `\`${turn.at}\` is part of no played story` }
  const status = stepIn(turn.value[STATUS])
  if (status === null) return { refused: `\`${turn.at}\` states no step status` }
  return {
    game: bareOf(story),
    ...(story.startsWith(WRITTEN_OPENING) ? { noun: CHAPTER } : {}),
    status,
    lore: stringsIn(turn.value[LORE]),
    issues: linesBeside(turn, ISSUES, issuesFile.propertySlug, textOf),
    reviewedBy: stringsIn(turn.value[REVIEWED_BY]).map(bareOf),
    recordedBy: stringsIn(turn.value[RECORDED_BY]).map(bareOf),
    written: turn.value[PROSE] !== undefined && turn.value[OWN_LENGTH] !== 0,
    mechanicsIssues: linesBeside(turn, MECHANICS_ISSUES, mechanicsIssuesFile.propertySlug, textOf),
    mechanicsSentBack: turn.value[MECHANICS_SENT_BACK] === true,
  }
}
