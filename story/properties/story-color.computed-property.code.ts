import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { red } from "akasha/design/interface/color/pages/red.color.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import { chapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.ts"
import { player } from "akasha/story/chapter/step-status/pages/player.step-status.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import type { StoryColor } from "akasha/story/properties/story-color.computed-property.types.ts"
import type { Story } from "akasha/story/story.page-type.types.ts"

const PARTED = "/"

const PLAYER_STEP = `${stepStatus.slug}${PARTED}${player.slug}`

const WORKING = `${color.slug}${PARTED}${green.slug}`

const WAITING = `${color.slug}${PARTED}${red.slug}`

type Stepped = {
  readonly position?: number
  readonly stepStatus?: string
}

function furthest(held: readonly Stepped[]): Stepped | null {
  let last: Stepped | null = null
  for (const one of held) {
    if (last === null || (one.position ?? 0) > (last.position ?? 0)) last = one
  }
  return last
}

export const work: Work<Story, StoryColor> = (_page, reach) => {
  const turn = furthest(reach.naming<Stepped>(partOfCollections.slug))
  if (turn !== null) return turn.stepStatus === PLAYER_STEP ? WAITING : WORKING
  const making = reach
    .naming<Stepped>(chapterStory.slug)
    .filter((one) => typeof one.stepStatus === "string" && one.stepStatus !== "")
  const chapter = furthest(making)
  if (chapter === null || chapter.stepStatus === PLAYER_STEP) return null
  return WORKING
}
