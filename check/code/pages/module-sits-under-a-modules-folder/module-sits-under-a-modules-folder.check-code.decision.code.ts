import { dirname } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { textsAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const MODULE = "module"

const TS = "ts"

const MODULES = "modules"

const SERVER = ".server"

const PARTS = "parts"

export function moduleNamed(path: string): boolean {
  const said = partedIn(path)
  if (said === null) return false
  return said.pageType === MODULE && said.held === TS && said.sections.length === 0
}

export function underModules(path: string): boolean {
  return dirname(path)
    .split("/")
    .some((one) => one === MODULES || one === SERVER)
}

export function namesParts(text: string): boolean {
  const value = valueIn(text)
  if (value === null) return false
  return (textsAt(value, PARTS) ?? []).length > 0
}

export function reasonsAt(path: string, parted = false): readonly string[] {
  if (!moduleNamed(path) || underModules(path) || parted) return []
  return [
    `this module's folder \`${dirname(path)}\` sits under no \`${MODULES}\` folder, and a module's does`,
  ]
}

export function refusalsIn(
  paths: readonly string[],
  read: (path: string) => string | null
): readonly Judged[] {
  const found: Judged[] = []
  for (const path of paths) {
    if (!moduleNamed(path) || underModules(path)) continue
    const text = read(path)
    if (text === null) continue
    for (const reason of reasonsAt(path, namesParts(text))) found.push({ path, reason })
  }
  return found
}

export function refusalsOver(change: Change): readonly Judged[] {
  return refusalsIn(change.changed, (at) => textIn(change, at))
}
