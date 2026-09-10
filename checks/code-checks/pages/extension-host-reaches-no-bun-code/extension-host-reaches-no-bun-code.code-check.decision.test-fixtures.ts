import { nothingFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  MANIFEST,
  refusalsOver,
} from "./extension-host-reaches-no-bun-code.code-check.decision.code.ts"

export const ROOT = "/nowhere"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-host-bun-")
  nothingFiled(root)
  return root
}

export function tracked(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-host-bun-audit-")
  for (const [path, body] of Object.entries(bodies)) writing(root, path, body)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export const ENTRY = "editor-extension/ops-extension/extension-entry/extension-entry.module.code.ts"

export const NEXT = "editor-extension/ops-extension/extension-entry/next.module.code.ts"

export const FAR = "utils/far/far.module.code.ts"

export const PACKAGED = "seat-system/package.json"

export const NOTICED = "seat-system/compose-notices/compose-notices.module.code.ts"

export const MANIFEST_BODY = `${JSON.stringify({
  name: "ops",
  main: "./extension-entry/extension-entry.module.code.ts",
})}\n`

export const PACKAGED_BODY = `${JSON.stringify({
  name: "@akasha/seat-system",
  exports: { "./compose-notices": "./compose-notices/compose-notices.module.code.ts" },
})}\n`

const encoder = new TextEncoder()

export function bodied(root: string, bodies: Readonly<Record<string, string>>): Change {
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : encoder.encode(said)
  }
  return { root, changed: Object.keys(bodies).toSorted(), after: at, before: at }
}

export function change(bodies: Readonly<Record<string, string>>): Change {
  return bodied(ROOT, bodies)
}

export function withManifest(
  bodies: Readonly<Record<string, string>>
): Readonly<Record<string, string>> {
  return { [MANIFEST]: MANIFEST_BODY, ...bodies }
}

export function hosted(bodies: Readonly<Record<string, string>>): Change {
  return change(withManifest(bodies))
}

export function refused(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const held = hosted(bodies)
  return refusalsOver(held, held.changed)
}

export function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return refused(bodies).map((one) => one.path)
}
