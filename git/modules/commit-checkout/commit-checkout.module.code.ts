import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import { bytes, endingOf, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { argvFor, told } from "akasha/git/modules/running/git-running.module.code.ts"

const AT = ".local/state/workstation-services/commit-checkouts"

const HOME = "HOME"

const MARK = ".at-commit"

const TAMED = /[^A-Za-z0-9._-]+/g

const NAMED = 16

const COMMIT = "^{commit}"

const APART = "\0"

const AWAY = "D"

const END = "--"

const LITERAL = ":(literal)"

const TAR = "tar"

const ARCHIVE = "archive"

const ASKED: readonly string[] = ["rev-parse", "--verify", "--quiet"]

const DIFF: readonly string[] = ["diff", "--name-status", "--no-renames", "-z"]

const WIDE_AT_MOST = 100_000

const WAITED_AT_MOST = 300_000

function baseAt(): string {
  return join(requireEnv(HOME), AT)
}

function namedFor(root: string): string {
  const full = resolve(root)
  return `${basename(full).replace(TAMED, "-")}-${sha256Hex(full).slice(0, NAMED)}`
}

function resolvedIn(root: string, named: string): string | null {
  const answered = told(root, [...ASKED, `${named}${COMMIT}`])
  return answered === null ? null : answered.trim()
}

function untarred(root: string, dir: string, argv: readonly string[]): undefined {
  const held = bytes(argvFor(root, argv))
  if (held.code !== 0) {
    throw new Error(
      `\`git ${ARCHIVE}\` over ${root} ${endingOf(held.code, held.signal)} — ${held.err.trim()}`
    )
  }
  const took = ran([TAR, "-x", "-C", dir], { stdin: held.out })
  if (took.code !== 0) {
    throw new Error(
      `\`${TAR}\` into ${dir} ${endingOf(took.code, took.signal)} — ${took.err.trim()}`
    )
  }
}

function filled(root: string, dir: string, want: string): undefined {
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  untarred(root, dir, [ARCHIVE, want])
}

function prunedTo(dir: string, from: string): undefined {
  let here = from
  while (here.length > dir.length && here.startsWith(dir)) {
    try {
      rmdirSync(here)
    } catch {
      return
    }
    here = dirname(here)
  }
}

function tookAway(dir: string, path: string): undefined {
  const at = join(dir, path)
  try {
    unlinkSync(at)
  } catch {
    return
  }
  prunedTo(dir, dirname(at))
}

function batchesOf(paths: readonly string[]): readonly (readonly string[])[] {
  const made: string[][] = []
  let held: string[] = []
  let wide = 0
  for (const one of paths) {
    if (held.length > 0 && wide + one.length > WIDE_AT_MOST) {
      made.push(held)
      held = []
      wide = 0
    }
    held.push(`${LITERAL}${one}`)
    wide += one.length + LITERAL.length
  }
  if (held.length > 0) made.push(held)
  return made
}

function movedTo(root: string, dir: string, from: string, want: string): boolean {
  const said = told(root, [...DIFF, from, want])
  if (said === null) return false
  const rows = said.split(APART)
  const wrote: string[] = []
  for (let at = 0; at + 1 < rows.length; at += 2) {
    const how = rows[at] ?? ""
    const path = rows[at + 1] ?? ""
    if (path === "") continue
    if (how === AWAY) tookAway(dir, path)
    else wrote.push(path)
  }
  for (const batch of batchesOf(wrote)) untarred(root, dir, [ARCHIVE, want, END, ...batch])
  return true
}

function heldIn(mark: string): string | null {
  try {
    return readFileSync(mark, "utf8").trim()
  } catch {
    return null
  }
}

function broughtTo(root: string, dir: string, want: string): undefined {
  const mark = `${dir}${MARK}`
  const was = heldIn(mark)
  if (was === want && existsSync(dir)) return
  rmSync(mark, { force: true })
  const from = was === null || !existsSync(dir) ? null : resolvedIn(root, was)
  if (from === null || !movedTo(root, dir, from, want)) filled(root, dir, want)
  writeFileSync(mark, want)
}

export function checkoutAt(root: string, commit: string): string {
  const want = resolvedIn(root, commit)
  if (want === null) {
    throw new Error(`\`${commit}\` names no commit in ${root}, so no checkout could be made of it`)
  }
  const base = baseAt()
  mkdirSync(base, { recursive: true })
  const dir = join(base, namedFor(root))
  exclusively(dir, () => broughtTo(root, dir, want), WAITED_AT_MOST)
  return dir
}
