import { existsSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically, slugComposedIn } from "@akasha/command-system/asking"
import { landedChecked } from "@akasha/command-system/checked-landing"
import type { Composed, Landing } from "../landing/migration-landing.module.code.ts"

const INSIDE = "akasha/"

const ENCODER = new TextEncoder()

function bytesOf(body: string | Uint8Array): Uint8Array {
  return typeof body === "string" ? ENCODER.encode(body) : body
}

export function takesAway(composed: readonly Composed[]): boolean {
  return composed.some((one) => one.body === null)
}

export function makesAPage(root: string, composed: readonly Composed[]): boolean {
  return composed.some((one) => {
    if (one.body === null || !one.path.startsWith(INSIDE)) return false
    if (slugComposedIn(one.path, bytesOf(one.body)) === null) return false
    return !existsSync(join(root, one.path))
  })
}

export function landingFor(root: string, composed: readonly Composed[]): Landing {
  if (takesAway(composed)) return landedChecked
  return makesAPage(root, composed) ? landedChecked : landedMechanically
}
