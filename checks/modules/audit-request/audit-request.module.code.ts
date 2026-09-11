import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { lowerKebabCase } from "akasha/pages/name-formats/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { isMissing } from "akasha/utils/fs/missing/missing.module.code.ts"

const ASKED = ".local/state/workstation-services/audit-asked"

export function requestsAt(home: string): string {
  return join(home, ASKED)
}

export function requestPut(home: string, check: string): string | null {
  if (!lowerKebabCase(check)) {
    return `\`${check}\` is no check slug, and a request is named for one check`
  }
  const at = requestsAt(home)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, check), "")
  return null
}

export function requestsIn(home: string): readonly string[] {
  try {
    return readdirSync(requestsAt(home)).sort()
  } catch (thrown) {
    if (isMissing(thrown)) return []
    throw thrown
  }
}

export function requestDone(home: string, check: string): undefined {
  rmSync(join(requestsAt(home), check), { force: true })
}
