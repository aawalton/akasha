import { extname } from "node:path"
import { landingOf, placedIn } from "@akasha/code/code-specifier"
import { holdsAfter, writtenIn } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const CODE = new Set([".ts", ".tsx"])

function reachingIn(given: Guarding, path: string, body: string): string | null {
  for (const one of placedIn(path, body)) {
    const landed = landingOf(path, one.text)
    if (landed === null || holdsAfter(given, landed)) continue
    return `\`${path}\` imports \`${one.text}\`, and \`${landed}\` holds no body`
  }
  return null
}

export function importReachesAFile(given: Guarding): string | null {
  for (const [path, body] of writtenIn(given)) {
    if (!CODE.has(extname(path))) continue
    const why = reachingIn(given, path, body)
    if (why !== null) return why
  }
  return null
}

export const runGuard: Guard = importReachesAFile
