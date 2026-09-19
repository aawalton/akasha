import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { processorsOver } from "akasha/code/spawning/modules/running/running.module.code.ts"

const MAX = "cpu.max"

const UNDER = "under"

const MADE = "made"

const HELD = "/var/tmp/akasha-running-quota-"

export const NOTHING = "-"

export function processorsFor(stating: readonly string[]): number | null {
  const mount = mkdtempSync(HELD)
  try {
    let at = mount
    for (const stated of stating) {
      at = join(at, UNDER)
      mkdirSync(at)
      if (stated !== NOTHING) writeFileSync(join(at, MAX), `${stated}\n`)
    }
    const leaf = join(at, MADE)
    mkdirSync(leaf)
    return processorsOver(leaf, mount)
  } finally {
    rmSync(mount, { recursive: true, force: true })
  }
}
