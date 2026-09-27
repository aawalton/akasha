import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"

const FLEX = "flex-"

const NOTICED: readonly string[] = [worldBuilder.slug, writer.slug]

export function personaOf(master: string, game: string): string | null {
  const tail = `-${gameMaster.slug}-${game}`
  if (!master.endsWith(tail) || master.length === tail.length) return null
  return master.slice(0, -tail.length)
}

export function noticedOf(master: string, game: string): readonly string[] {
  const persona = personaOf(master, game)
  if (persona === null) return [master]
  return [master, ...NOTICED.map((role) => `${persona}-${role}-${game}`)]
}

export function flexOf(seats: readonly string[], seat: string): string {
  const at = seats.toSorted().indexOf(seat)
  return `${FLEX}${at < 0 ? seats.length + 1 : at + 1}`
}
