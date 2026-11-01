import { spawn } from "node:child_process"
import { existsSync, mkdtempSync, renameSync } from "node:fs"
import { basename, join } from "node:path"

export const SCRATCH_AT = "/var/tmp"

const SWEPT = ".swept-"

function setAside(one: string): readonly string[] {
  if (!existsSync(one)) return []
  const aside = join(SCRATCH_AT, `${SWEPT}${basename(one)}`)
  renameSync(one, aside)
  return [aside]
}

function takenAway(aside: readonly string[]): undefined {
  if (aside.length === 0) return
  spawn("rm", ["-rf", "--", ...aside], { detached: true, stdio: "ignore" }).unref()
}

export type Scratch = {
  readonly rootFor: (prefix: string) => string
  readonly sweep: () => undefined
}

export function scratchWorld(): Scratch {
  const held: string[] = []
  return {
    rootFor: (prefix: string): string => {
      const root = mkdtempSync(join(SCRATCH_AT, prefix))
      held.push(root)
      return root
    },
    sweep: (): undefined => {
      takenAway(held.splice(0).flatMap(setAside))
    },
  }
}
