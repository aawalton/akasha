import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { picture } from "akasha/story/recorder/pages/picture.story-recorder.ts"
import {
  type Advanced,
  type Handed,
  type Held,
  memoryMerged,
  moved,
  PLAYER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { memoryOwed } from "akasha/story/world/stories/played/turns/properties/memory-owed.boolean-property.ts"

export const MEMORY_OWED = exportedAs(memoryOwed.propertySlug)

const NO_PICTURES = "a one-seat turn has no pictures, so its picture recorder hands in nothing"

const MEMORY_ALONE = `at ${PLAYER} a turn owing its memory takes that memory alone, from the \`${memory.slug}\` recorder`

function unrememberedOf(handed: Handed): string | null {
  if (handed.kind !== "record") return MEMORY_ALONE
  if (handed.recorder === picture.slug) return NO_PICTURES
  if (handed.recorder !== memory.slug) return MEMORY_ALONE
  if (handed.beat !== undefined) {
    return "a one-seat turn's memory is handed in once for the whole turn, naming no `--beat`"
  }
  const others = [...(handed.changes ?? []), ...(handed.issues ?? []), ...(handed.pictured ?? [])]
  return others.length === 0 ? null : MEMORY_ALONE
}

export function rememberedOn(held: Held, handed: Handed): Advanced {
  const unremembered = unrememberedOf(handed)
  if (unremembered !== null || handed.kind !== "record") return { refused: unremembered ?? "" }
  const flow = held.flow
  const many = flow?.beats.length ?? 0
  if (flow === undefined || many === 0) return { refused: "the turn has no beats for its memory" }
  const lines = handed.memory ?? []
  const far = lines.find((one) => one.beat < 1 || one.beat > many)
  if (far !== undefined) {
    return { refused: `a memory names beat ${far.beat}, and the turn has ${many} beats` }
  }
  const named = new Set(lines.map((one) => one.beat))
  const none = flow.beats.flatMap((_, at) =>
    named.has(at + 1) ? [] : [{ beat: at + 1, part: "memory" as const }]
  )
  const memoryOf = memoryMerged(flow.memory, lines)
  const after = { ...flow, memory: memoryOf, none: [...(flow.none ?? []), ...none] }
  return moved(PLAYER, { [MEMORY_OWED]: undefined }, { flow: after, landsKept: true })
}
