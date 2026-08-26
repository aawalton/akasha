import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"

export const KEEP_KIND = "keep"

const SCRATCH = "/var/tmp"

export type Keep = {
  readonly keep: () => string
  readonly done: () => void
}

export function keepUnder(at: string, name: string, mark: string, trial: boolean): Keep {
  const held = join(at, KEEP_KIND, name, mark)
  if (!trial) {
    return {
      keep: () => {
        mkdirSync(held, { recursive: true })
        return held
      },
      done: () => {},
    }
  }
  let made: string | null = null
  return {
    keep: () => {
      if (made === null) {
        const at = mkdtempSync(`${SCRATCH}/keep-`)
        if (existsSync(held)) cpSync(held, at, { recursive: true })
        made = at
      }
      return made
    },
    done: () => {
      if (made !== null) rmSync(made, { recursive: true, force: true })
    },
  }
}
