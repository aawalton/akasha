import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import type { TurnSeating } from "akasha/story/world/stories/played/properties/turn-seating.select-property.types.ts"

const FLEX = "flex-"

const TURN_SEATING = "turnSeating"

const ONE_SEAT: TurnSeating = "one-seat"

export function oneSeatOf(story: Readonly<Record<string, unknown>>): boolean {
  return story[TURN_SEATING] === ONE_SEAT
}

const COORDINATING: readonly string[] = [gameMaster.slug, roleplay.slug]

const NOTICED: readonly string[] = [worldBuilder.slug, writer.slug]

type Coordinator = { readonly persona: string; readonly role: string }

export function coordinatorOf(master: string, game: string): Coordinator | null {
  for (const role of COORDINATING) {
    const tail = `-${role}-${game}`
    if (master.endsWith(tail) && master.length > tail.length) {
      return { persona: master.slice(0, -tail.length), role }
    }
  }
  return null
}

export function noticedOf(master: string, game: string, oneSeat = false): readonly string[] {
  const held = coordinatorOf(master, game)
  if (oneSeat || held === null || held.role !== gameMaster.slug) return [master]
  return [master, ...NOTICED.map((role) => `${held.persona}-${role}-${game}`)]
}

export function flexOf(seats: readonly string[], seat: string): string {
  const at = seats.toSorted().indexOf(seat)
  return `${FLEX}${at < 0 ? seats.length + 1 : at + 1}`
}
