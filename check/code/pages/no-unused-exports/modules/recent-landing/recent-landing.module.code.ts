import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"

const A_DAY = 86_400_000

const A_SECOND = 1000

export const LATELY_SECONDS = A_DAY / A_SECOND

const APART = "\0"

const NOTHING = ""

const HEAD = "HEAD"

const END = "--"

const LINE = "\n"

const WHOLE = "false"

const CUT = "true"

const NOT = "^"

function pathsIn(said: string): ReadonlySet<string> {
  return new Set(said.split(APART).filter((one) => one !== NOTHING))
}

function cutsIn(root: string): readonly string[] | null {
  const shallow = told(root, ["rev-parse", "--is-shallow-repository"])?.trim()
  if (shallow === WHOLE) return []
  if (shallow !== CUT) return null
  const said = told(root, ["rev-list", "--max-parents=0", HEAD])
  if (said === null) return null
  return said
    .split(LINE)
    .filter((one) => one !== NOTHING)
    .map((one) => `${NOT}${one}`)
}

function landedLately(
  root: string,
  paths: readonly string[],
  now: number
): ReadonlySet<string> | null {
  const cuts = cutsIn(root)
  if (cuts === null) return null
  const from = Math.floor((now - A_DAY) / A_SECOND)
  const said = told(root, [
    "log",
    `--since=@${String(from)}`,
    "--format=",
    "--name-only",
    "--no-renames",
    "-z",
    HEAD,
    ...cuts,
    END,
    ...paths,
  ])
  return said === null ? null : pathsIn(said)
}

function landedEver(root: string, paths: readonly string[]): ReadonlySet<string> | null {
  const said = told(root, ["ls-tree", "-r", "-z", "--name-only", HEAD, END, ...paths])
  return said === null ? null : pathsIn(said)
}

export function sparingLately(
  root: string,
  found: readonly Judged[],
  now: number = Date.now()
): readonly Judged[] {
  if (found.length === 0) return found
  const paths = [...new Set(found.map((one) => one.path))]
  const ever = landedEver(root, paths)
  const lately = ever === null ? null : landedLately(root, paths, now)
  if (ever === null || lately === null) return found
  return found.filter((one) => ever.has(one.path) && !lately.has(one.path))
}
