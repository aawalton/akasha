import { NOT_WORKED_OUT } from "../../../pages/shadow/shadow.module.code.ts"
import { gathered, refusing } from "../change-answer/change-answer.module.code.ts"
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

export function judging(
  given: Guarding,
  hanging: (asked: Guarding, paths: readonly string[]) => string | null
): string | null {
  const taken = takingIn(given.said)
  if (taken.length === 0) return null
  try {
    return hanging(given, taken)
  } catch (cause) {
    return unreadable(cause)
  }
}

export function holdsAfter(given: Guarding, path: string): boolean {
  let moved = false
  for (const one of given.said.edits) {
    if (one.path === path) return one.body !== null
    if (one.from === path) moved = true
  }
  return moved ? false : given.before.textOf(path) !== null
}

export function guardedBy(world: World, said: Answer, guards: readonly Guard[]): Answer {
  if (said.refused !== null || guards.length === 0) return said
  const whole = gathered([world.over, said])
  if (whole.refused !== null) return refusing(whole.refused)
  const cast = shadowOver(world.root, whole)
  if ("refused" in cast) return refusing(NOT_WORKED_OUT)
  const given: Guarding = { said, shadow: cast.shadow, before: world }
  for (const guard of guards) {
    const why = guard(given)
    if (why !== null) return refusing(why)
  }
  return said
}
