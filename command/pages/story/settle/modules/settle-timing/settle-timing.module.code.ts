import type { Taken } from "akasha/command/pages/story/settle/modules/settle-taking/settle-taking.module.code.ts"
import {
  listedAt,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyOpensAt } from "akasha/story/world/stories/played/properties/story-opens-at.instant-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"

const TIME_PASSING = "-time-passing"

const FROM = "from"

const POSITION = "position"

const STORY = "story"

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const OPENS_AT = exportedAs(storyOpensAt.propertySlug)

export type Placed = { readonly at: string; readonly position: number }

export type Timed = { readonly held: Taken } | { readonly refused: string }

export function timedWith(held: Taken, start: string | null): Timed {
  if (held.check !== `${held.story}${TIME_PASSING}` || start === null) return { held }
  const said = held.reading[FROM]
  if (said === undefined) return { held: { ...held, reading: { ...held.reading, [FROM]: start } } }
  if (typeof said === "string" && Date.parse(said) === Date.parse(start)) return { held }
  return {
    refused: `this turn starts at \`${start}\`, where the turn before ended or the story opens, so \`${FROM}\` says that or is left out`,
  }
}

export function startIndexed(
  root: string,
  story: string,
  earlier: readonly Placed[]
): string | null {
  const named = `${storyPlayed.slug}/${story}`
  const ends = earlier
    .toSorted((one, two) => two.position - one.position)
    .map((one) => valueByPath(root, one.at)?.[ENDS_AT])
  const chapters = valuesOfType(root, storyChapterPlayed.slug)
    .filter((one) => one.value[STORY] === named && typeof one.value[POSITION] === "number")
    .toSorted((one, two) => (two.value[POSITION] as number) - (one.value[POSITION] as number))
    .map((one) => one.value[ENDS_AT])
  const listed = listedAt(root, storyPlayed.slug, story)[0]
  const opens = listed === undefined ? undefined : valueByPath(root, listed.path)?.[OPENS_AT]
  return firstInstant([...ends, ...chapters, opens])
}

export function firstInstant(said: readonly unknown[]): string | null {
  const found = said.find((one): one is string => typeof one === "string")
  return found ?? null
}

export function timedFor(root: string, held: Taken, turns: readonly Placed[], on: Placed): Timed {
  if (held.check !== `${held.story}${TIME_PASSING}`) return { held }
  const earlier = turns.filter((one) => one.position < on.position)
  return timedWith(held, startIndexed(root, held.story, earlier))
}
