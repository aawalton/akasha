import { dirname } from "node:path"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"

const MODULE = "module"

const TS = "ts"

const MODULES = "modules"

const SERVER = ".server"

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

export function reasonsAt(path: string): readonly string[] {
  if (!moduleNamed(path) || underModules(path)) return []
  return [
    `this module's folder \`${dirname(path)}\` sits under no \`${MODULES}\` folder, and a module's does`,
  ]
}

export function refusalsOver(change: Change): readonly Judged[] {
  const found: Judged[] = []
  for (const path of change.changed) {
    if (change.after(path) === null) continue
    for (const reason of reasonsAt(path)) found.push({ path, reason })
  }
  return found
}
