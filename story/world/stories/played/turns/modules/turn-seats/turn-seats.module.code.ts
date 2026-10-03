import { beatEditor } from "akasha/agent/role/pages/beat-editor.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { proseEditor } from "akasha/agent/role/pages/prose-editor.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"

const FLEX = "flex-"

const NOTICED: readonly string[] = [worldBuilder.slug, writer.slug]

const EDITORS: readonly string[] = [beatEditor.slug, proseEditor.slug]

export function personaOf(master: string, game: string): string | null {
  const tail = `-${gameMaster.slug}-${game}`
  if (!master.endsWith(tail) || master.length === tail.length) return null
  return master.slice(0, -tail.length)
}

export function noticedOf(master: string, game: string, editors = false): readonly string[] {
  const persona = personaOf(master, game)
  if (persona === null) return [master]
  const roles = editors ? [...NOTICED, ...EDITORS] : NOTICED
  return [master, ...roles.map((role) => `${persona}-${role}-${game}`)]
}

export function flexOf(seats: readonly string[], seat: string): string {
  const at = seats.toSorted().indexOf(seat)
  return `${FLEX}${at < 0 ? seats.length + 1 : at + 1}`
}
