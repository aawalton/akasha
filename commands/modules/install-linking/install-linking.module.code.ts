import { lstatSync, mkdirSync, readlinkSync, rmSync, symlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  atHome,
  type Linking,
} from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import {
  indexThere,
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const INSTALLED_AT = "installPath"

const PLACED_BY = "placedBy"

const ONLY_ON = "onlyOn"

const BY_LINK = "link"

const ANY_MACHINE = "any"

const MACOS = "macos"

const LINUX = "linux"

const DARWIN = "darwin"

const UNDER_HOME = "~/"

const A_FILE = "file"

type Kind = {
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly placedBy: string | null
}

const KINDS: readonly Kind[] = [
  { pageTypeSlug: "shell-script", propertySlug: "shell", placedBy: null },
  { pageTypeSlug: "provisioned-file", propertySlug: "content", placedBy: BY_LINK },
]

export type Placing = {
  readonly page: string
  readonly file: string
  readonly at: string
}

export type Weighing = {
  readonly placings: readonly Placing[]
  readonly wrong: readonly string[]
}

export function machineNow(platform: string = process.platform): string {
  return platform === DARWIN ? MACOS : LINUX
}

function forMachine(said: string | null, on: string): boolean {
  return said === null || said === ANY_MACHINE || said === on
}

function installedAt(one: Valued, kind: Kind, home: string, on: string): string | null {
  const said = textAt(one.value, INSTALLED_AT)
  if (said === null || !said.startsWith(UNDER_HOME)) return null
  if (kind.placedBy !== null && textAt(one.value, PLACED_BY) !== kind.placedBy) return null
  if (!forMachine(textAt(one.value, ONLY_ON), on)) return null
  return atHome(said, home)
}

export function weighedIn(root: string, home: string, on: string = machineNow()): Weighing {
  const placings: Placing[] = []
  const wrong: string[] = []
  const reading = readingIn(root)
  if (!indexThere(reading)) return { placings, wrong }
  const seen = new Set<string>()
  for (const kind of KINDS) {
    for (const one of valuesOfType(reading, kind.pageTypeSlug)) {
      const at = installedAt(one, kind, home, on)
      if (at === null || seen.has(at)) continue
      seen.add(at)
      try {
        placings.push({
          page: one.path,
          file: fileOf(reading, one, kind.pageTypeSlug, kind.propertySlug),
          at,
        })
      } catch (thrown) {
        wrong.push(`${one.path} is reached at ${at}, and nothing was linked — ${whyOf(thrown)}`)
      }
    }
  }
  return { placings, wrong }
}

export function placedTo(root: string, placing: Placing): string | null {
  const to = join(root, placing.file)
  if (lstatSync(to, { throwIfNoEntry: false }) === undefined) {
    throw new Error(`${placing.file} is not there for ${placing.at} to be linked to`)
  }
  const held = lstatSync(placing.at, { throwIfNoEntry: false })
  if (held !== undefined && !held.isSymbolicLink()) {
    throw new Error(`${placing.at} is a file of its own rather than a link, and stands as it is`)
  }
  if (held !== undefined) {
    if (readlinkSync(placing.at) === to) return null
    rmSync(placing.at)
  }
  mkdirSync(dirname(placing.at), { recursive: true })
  symlinkSync(to, placing.at, A_FILE)
  return `linked ${placing.at} to ${placing.file}`
}

export function linkedInPlace(root: string, home: string, on: string = machineNow()): Linking {
  const weighed = weighedIn(root, home, on)
  const said: string[] = []
  const wrong: string[] = [...weighed.wrong]
  for (const one of weighed.placings) {
    try {
      const done = placedTo(root, one)
      if (done !== null) said.push(done)
    } catch (thrown) {
      wrong.push(
        `${one.page} is reached at ${one.at}, and the link stands as it was — ${whyOf(thrown)}`
      )
    }
  }
  return { said, wrong }
}
