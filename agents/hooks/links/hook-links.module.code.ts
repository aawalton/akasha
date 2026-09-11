import {
  existsSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  renameSync,
  symlinkSync,
} from "node:fs"
import { dirname, isAbsolute, join, relative } from "node:path"
import { MOUNTED } from "akasha/code-system/test-overlay/test-overlay.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const MODULE = "module"

const DISPATCH = "hook-dispatch"

const CODE = "code"

const TS = "ts"

const HOME = "HOME"

const UNDER = [".local", "state", "akasha", "hooks"]

const OUTSIDE = ".."

const HALF_WRITTEN = ".tmp-"

export function linksAt(): string {
  const home = process.env[HOME]
  if (home === undefined || home === "") {
    throw new Error(`\`${HOME}\` names no folder, so where a hook is registered through is unknown`)
  }
  return join(home, ...UNDER)
}

export function linkFor(event: string): string {
  return join(linksAt(), event)
}

export function dispatchAt(root: string): string {
  const listed = listedAt(root, MODULE, DISPATCH)
  const page = listed.length === 1 ? listed[0]?.path : undefined
  if (page === undefined) {
    throw new Error(
      `the index answers no one page for \`${MODULE}/${DISPATCH}\`, and every hook is reached ` +
        "through the code that page sits beside"
    )
  }
  const beside = besideAt(page, CODE, TS)
  if (beside === null) {
    throw new Error(`\`${page}\` is the page for \`${MODULE}/${DISPATCH}\` and sits beside no code`)
  }
  const at = join(root, beside)
  if (!existsSync(at)) {
    throw new Error(`\`${MODULE}/${DISPATCH}\` names \`${beside}\`, and nothing is there to run`)
  }
  return at
}

function realOf(at: string): string | null {
  try {
    return realpathSync(at)
  } catch {
    return null
  }
}

function servedAt(): string | null {
  try {
    return realOf(akashaRoot())
  } catch {
    return null
  }
}

function mountedAt(): string | null {
  const at = process.env[MOUNTED]
  if (at === undefined || at === "") return null
  return realOf(at)
}

export function servedFrom(root: string): boolean {
  const served = servedAt()
  if (served === null) return false
  const real = realOf(root)
  if (real === null) return false
  if (real === mountedAt()) return false
  return real === served
}

export function anothersIn(held: string | null, root: string): boolean {
  if (held === null) return false
  const under = relative(root, held)
  if (under !== "" && !under.startsWith(OUTSIDE) && !isAbsolute(under)) return false
  return existsSync(held)
}

export function linkedTo(at: string, event: string, root: string): undefined {
  const link = linkFor(event)
  let held: string | null
  try {
    held = readlinkSync(link)
  } catch {
    held = null
  }
  if (held === at) return undefined
  if (anothersIn(held, root)) return undefined
  mkdirSync(dirname(link), { recursive: true })
  const tmp = `${link}${HALF_WRITTEN}${process.pid}`
  symlinkSync(at, tmp)
  renameSync(tmp, link)
  return undefined
}

export function linksMade(root: string, events: readonly string[]): undefined {
  if (!servedFrom(root)) return undefined
  const at = dispatchAt(root)
  for (const event of events) linkedTo(at, event, root)
  return undefined
}

function reaches(link: string): boolean {
  let held: string
  try {
    held = readlinkSync(link)
  } catch {
    return false
  }
  return existsSync(held)
}

export function danglingIn(): readonly string[] {
  let named: readonly string[]
  try {
    named = readdirSync(linksAt())
  } catch {
    return []
  }
  return named.filter((one) => !one.includes(HALF_WRITTEN) && !reaches(linkFor(one))).toSorted()
}

export function linksMended(root: string): undefined {
  const gone = danglingIn()
  if (gone.length === 0) return undefined
  return linksMade(root, gone)
}
