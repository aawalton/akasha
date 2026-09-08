import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const HOLD = "/var/tmp"

const PREFIX = "akasha-mirror-"

export type Mirror = {
  readonly root: string
  readonly sweep: () => undefined
}

function reaching<Held>(named: string, act: () => Held): Held {
  try {
    return act()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(`no mirror was written for \`${named}\` — ${why}`)
  }
}

export function mirroredOf(
  from: string,
  paths: readonly string[],
  at: (path: string) => Uint8Array | null,
  also: readonly string[]
): Mirror {
  const root = mkdtempSync(join(HOLD, PREFIX))
  try {
    for (const one of paths) {
      const bytes = reaching(one, () => at(one))
      if (bytes === null) continue
      reaching(one, () => {
        const to = join(root, one)
        mkdirSync(dirname(to), { recursive: true })
        writeFileSync(to, bytes)
      })
    }
    for (const one of also) {
      const there = join(from, one)
      if (!existsSync(there)) continue
      reaching(one, () => cpSync(there, join(root, one)))
    }
  } catch (thrown) {
    rmSync(root, { recursive: true, force: true })
    throw thrown
  }
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}
