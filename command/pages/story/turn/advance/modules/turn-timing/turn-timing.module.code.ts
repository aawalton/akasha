import { readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { module as modulePageType } from "akasha/code/module/module.page-type.ts"
import { playedTurn as turnArgument } from "akasha/command/argument/pages/played-turn.argument.ts"
import { reading as readingArgument } from "akasha/command/argument/pages/reading.argument.ts"
import { settledCheck as checkArgument } from "akasha/command/argument/pages/settled-check.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  IMPORT,
  type Reference,
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { BeatScene } from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { settling } from "akasha/story/world/mechanics/checks/properties/settling.module-property-group.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import { timePassing } from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import type { Handed } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"

const SETTLING = `.${worldCheck.slug}.${settling.propertySlug}.code.ts`

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const SETTLE = "akasha story settle"

const READING = `'{"from":"<when the turn before ended>","minutes":<the minutes the beats take>}'`

const PARTED = "/"

const BREAK = "\n"

const UTF8 = "utf8"

export function timeCheckIn(story: string, references: readonly Reference[]): string | null {
  const within = `${dirname(story)}${PARTED}`
  const found = references.find(
    (one) =>
      one.propertySlug === IMPORT && one.path.startsWith(within) && one.path.endsWith(SETTLING)
  )
  return found === undefined ? null : basename(found.path).slice(0, -SETTLING.length)
}

export function timeCheckIndexed(root: string, game: string): string | null {
  const story = listedAt(root, storyPlayed.slug, game)[0]
  const rule = listedAt(root, modulePageType.slug, timePassing.slug)[0]
  const at = rule === undefined ? null : referencesAt(rule.path)
  if (story === undefined || at === null) return null
  const lines = readFileSync(join(root, at), UTF8).split(BREAK)
  return timeCheckIn(story.path, referencesEach(lines))
}

export function untimedRefused(
  check: string | null,
  game: string,
  turn: string,
  value: Value
): string | null {
  if (check === null || typeof value[ENDS_AT] === "string") return null
  const call = [
    SETTLE,
    `${storyArgument.said} ${game}`,
    `${checkArgument.said} ${check}`,
    `${turnArgument.said} ${turn}`,
    `${readingArgument.said} ${READING}`,
  ].join(" ")
  return `\`${game}\` settles its time by \`${check}\`, and \`${turn}\` states no \`${ENDS_AT}\`, so settle it before advancing: \`${call}\``
}

type Refused = { readonly refused: string }

function closedOn(scenes: readonly BeatScene[], last: number, at: string): readonly BeatScene[] {
  if (!scenes.some((one) => one.beat === last)) return [...scenes, { beat: last, at }]
  return scenes.map((one) => (one.beat === last ? { ...one, at } : one))
}

export function endTaken(
  check: string | null,
  turn: string,
  value: Value,
  handed: Handed
): Handed | Refused {
  const ends = value[ENDS_AT]
  if (check === null || handed.kind !== "beats" || typeof ends !== "string") return handed
  const scenes = handed.scenes ?? []
  if (!scenes.some((one) => one.at !== undefined)) return handed
  const settled = new Date(Date.parse(ends)).toISOString()
  const late = scenes.find((one) => one.at !== undefined && Date.parse(one.at) > Date.parse(ends))
  if (late !== undefined) {
    return {
      refused: `\`${turn}\` settled its \`${ENDS_AT}\` as \`${settled}\`, and beat ${late.beat} states its time as \`${late.at}\`, after that, so no beat states a time after \`${settled}\``,
    }
  }
  const last = handed.beats.length
  const stated = scenes.find((one) => one.beat === last)?.at
  if (stated === settled) return handed
  if (stated !== undefined) {
    return {
      refused: `\`${turn}\` settled its \`${ENDS_AT}\` as \`${settled}\`, and beat ${last}, the last, states its time as \`${stated}\`, so beat ${last} states \`"at":"${settled}"\` or no \`at\``,
    }
  }
  return { ...handed, scenes: closedOn(scenes, last, settled) }
}
