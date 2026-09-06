import { NOT_WORKED_OUT } from "../../../pages/shadow/shadow.module.code.ts"
import { refusing } from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { shadowOver, type World } from "../change-shadow/change-shadow.module.code.ts"
import type { Guard, Guarding } from "./change-guarding.module.types.ts"

export const NOT_READ = "the index this guard reads could not be read"

export function unreadable(cause: unknown): string {
  return `${NOT_READ} — ${cause instanceof Error ? cause.message : String(cause)}`
}

export function takingIn(said: Answer): readonly string[] {
  return said.edits
    .filter((one) => one.body === null && one.from === undefined)
    .map((one) => one.path)
}

export function guardedBy(world: World, said: Answer, guards: readonly Guard[]): Answer {
  if (said.refused !== null || guards.length === 0) return said
  const cast = shadowOver(world.root, said)
  if ("refused" in cast) return refusing(NOT_WORKED_OUT)
  const given: Guarding = { said, shadow: cast.shadow, before: world }
  for (const guard of guards) {
    const why = guard(given)
    if (why !== null) return refusing(why)
  }
  return said
}
