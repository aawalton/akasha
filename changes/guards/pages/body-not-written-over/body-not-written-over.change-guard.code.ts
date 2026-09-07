import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"

export function bodyNotWrittenOver(given: Guarding): string | null {
  for (const one of given.said.edits) {
    if (one.body === null || one.from !== undefined) continue
    if (given.before.textOf(one.path) === null) continue
    return `\`${one.path}\` already holds a body, so this change writes over it`
  }
  return null
}

export const runGuard: Guard = bodyNotWrittenOver
