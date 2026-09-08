import { NOT_WORKED_OUT } from "../../../pages/shadow/shadow.module.code.ts"
import { beyond, gathered, refusing, replayed } from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { shadowOver, type World } from "../change-shadow/change-shadow.module.code.ts"
import type { Guard, Guarding } from "./change-guarding.module.types.ts"

export const NOT_READ = "the index this guard reads could not be read"

export function unreadable(cause: unknown): string {
  return `${NOT_READ} — ${cause instanceof Error ? cause.message : String(cause)}`
}

export function takingIn(said: Answer): readonly string[] {
  const taken: string[] = []
  for (const one of said.edits) {
    if (one.kind === "remove") taken.push(one.path)
  }
  return taken
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
  const held = replayed(given.said, given.before.textOf)
  if ("refused" in held || !held.has(path)) return given.before.textOf(path) !== null
  return held.get(path) !== null
}

export function writtenIn(given: Guarding): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const held = replayed(given.said, given.before.textOf)
  if ("refused" in held) return found
  for (const [path, body] of held) if (body !== null) found.set(path, body)
  return found
}

export function guardedBy(world: World, said: Answer, guards: readonly Guard[]): Answer {
  if (said.refused !== null || guards.length === 0) return said
  const whole = gathered([world.over, beyond(world.over, said)])
  if (whole.refused !== null) return refusing(whole.refused)
  const bodies = replayed(whole, world.base)
  if ("refused" in bodies) return refusing(bodies.refused)
  const cast = shadowOver(world.root, whole, world.base)
  if ("refused" in cast) return refusing(NOT_WORKED_OUT)
  const given: Guarding = { said, shadow: cast.shadow, before: world }
  for (const guard of guards) {
    const why = guard(given)
    if (why !== null) return refusing(why)
  }
  return said
}
