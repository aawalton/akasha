import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  CHAPTER,
  type Held,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const COLLECTIONS = "partOfCollections"

const STATUS = "stepStatus"

const LORE = "lore"

const ISSUES = "issues"

const REVIEWED_BY = "reviewedBy"

const RECORDED_BY = "recordedBy"

const BEATS = "beats"

const MECHANICS_ISSUES = "mechanicsIssues"

const PROSE = "prose"

const STORY = "story"

const OWN_LENGTH = "ownLength"

const PARTED = "/"

const WRITTEN_OPENING = `${storyWritten.slug}${PARTED}`

const OPENINGS = [`${storyPlayed.slug}${PARTED}`, WRITTEN_OPENING]

export function heldOf(turn: Turn): Held | { readonly refused: string } {
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
    issues: stringsIn(turn.value[ISSUES]),
    reviewedBy: stringsIn(turn.value[REVIEWED_BY]).map(bareOf),
    recordedBy: stringsIn(turn.value[RECORDED_BY]).map(bareOf),
    written: turn.value[PROSE] !== undefined && turn.value[OWN_LENGTH] !== 0,
    beats: stringsIn(turn.value[BEATS]).length,
    mechanicsIssues: stringsIn(turn.value[MECHANICS_ISSUES]),
  }
}
