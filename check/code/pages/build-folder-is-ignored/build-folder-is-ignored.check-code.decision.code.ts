import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { SCRATCH_AT } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { ranGit } from "akasha/git/modules/capping/git-capping.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  folderOf,
  foldersClaimedIn,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const IGNORES_AT = ".gitignore"

const SCRATCH_PREFIX = "akasha-build-folder-"

const APART = "\0"

const UNDER = "/"

const NO_EXCLUDES = "core.excludesFile=/dev/null"

const SOME_IGNORED = 0

const NONE_IGNORED = 1

const SAID = "a build folder is outside the commit, so a .gitignore rule ignores it"

type Carrier = {
  readonly path: string
  readonly pageTypeSlug: string
}

export type Declared = {
  readonly page: string
  readonly key: string
  readonly at: string
}

type Read = (path: string) => string | null

type Claiming = Pick<Answering, "kindsUnder" | "folderPropertiesAt">

type Indexed = Claiming & Pick<Answering, "everyOfType">

export function carriersIn(index: Indexed): readonly Carrier[] {
  const found = new Map<string, Carrier>()
  for (const [pageTypeSlug, held] of index.folderPropertiesAt()) {
    if (held.size === 0) continue
    for (const listed of index.everyOfType(pageTypeSlug)) {
      const kind = partedIn(listed.path)?.pageType ?? pageTypeSlug
      found.set(listed.path, { path: listed.path, pageTypeSlug: kind })
    }
  }
  return [...found.values()].sort((one, two) => (one.path < two.path ? -1 : 1))
}

export function declaredIn(
  page: string,
  value: Value | null,
  index: Claiming
): readonly Declared[] {
  if (value === null) return []
  return foldersClaimedIn(value, page, "", index.folderPropertiesAt(), index.kindsUnder)
    .filter((one) => one.built)
    .map((one) => ({ page, key: one.key, at: one.at }))
}

function rulesFor(folders: readonly string[], read: Read): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const asked = new Set<string>()
  for (const folder of folders) {
    for (let above = folderOf(folder); ; above = folderOf(above)) {
      const at = above === "" ? IGNORES_AT : `${above}${UNDER}${IGNORES_AT}`
      if (!asked.has(at)) {
        asked.add(at)
        const text = read(at)
        if (text !== null) found.set(at, text)
      }
      if (above === "") break
    }
  }
  return found
}

function decoded(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}

function unslashed(path: string): string {
  return path.endsWith(UNDER) ? path.slice(0, -UNDER.length) : path
}

export function ignoredAmong(folders: readonly string[], read: Read): ReadonlySet<string> {
  if (folders.length === 0) return new Set()
  const into = mkdtempSync(join(SCRATCH_AT, SCRATCH_PREFIX))
  try {
    const made = ranGit(into, ["init", "--quiet"])
    if (made.code !== 0) {
      throw new Error(
        `no repository was made to read the ignore rules in — ${decoded(made.stderr)}`
      )
    }
    for (const [at, text] of rulesFor(folders, read)) {
      const to = join(into, at)
      mkdirSync(dirname(to), { recursive: true })
      writeFileSync(to, text)
    }
    const asked = ranGit(into, ["-c", NO_EXCLUDES, "check-ignore", "--no-index", "--stdin", "-z"], {
      input: new TextEncoder().encode(folders.map((one) => `${one}${UNDER}`).join(APART)),
    })
    if (asked.code !== SOME_IGNORED && asked.code !== NONE_IGNORED) {
      throw new Error(`git would not say which build folders it ignores — ${decoded(asked.stderr)}`)
    }
    return new Set(
      decoded(asked.stdout)
        .split(APART)
        .filter((one) => one !== "")
        .map(unslashed)
    )
  } finally {
    rmSync(into, { recursive: true, force: true })
  }
}

export function refusalsOver(declared: readonly Declared[], read: Read): readonly Judged[] {
  const ignored = ignoredAmong([...new Set(declared.map((one) => one.at))].sort(), read)
  return declared
    .filter((one) => !ignored.has(one.at))
    .map((one) => ({
      path: one.page,
      reason: `states \`${one.key}\`, and no .gitignore rule ignores ${one.at}/ — ${SAID}`,
    }))
}
