import { lstatSync, mkdirSync, readlinkSync, realpathSync, rmSync, symlinkSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  atHome,
  type Linking,
} from "akasha/command/modules/folder-linking/folder-linking.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import {
  indexThere,
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { carriedIn } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

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

const LAUNCHER = "akasha-launcher"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const BODY = "bodyPropertyId"

const PLACING = "install-path"

const PLACING_KIND = "text-property"

const PLACED_BY_PROPERTY = "placed-by"

type Kind = {
  readonly pageTypeSlug: string
  readonly propertySlug: string | null
  readonly placedBy: string | null
}

type Placing = {
  readonly page: string
  readonly file: string
  readonly at: string
}

type Weighing = {
  readonly placings: readonly Placing[]
  readonly wrong: readonly string[]
}

export function machineNow(platform: string = process.platform): string {
  return platform === DARWIN ? MACOS : LINUX
}

export function forMachine(said: string | null, on: string): boolean {
  return said === null || said === ANY_MACHINE || said === on
}

function kindOf(reading: Reading, type: Valued): Kind | null {
  const pageTypeSlug = textAt(type.value, SLUG)
  if (pageTypeSlug === null) return null
  const carried = carriedIn(type.value, reading, pageTypeSlug)
  const placing = carried.some(
    (one) => one.pageTypeSlug === PLACING_KIND && one.pagePropertySlug === PLACING
  )
  if (!placing) return null
  const body = textAt(type.value, BODY)
  return {
    pageTypeSlug,
    propertySlug: carried.find((one) => one.key === body)?.propertySlug ?? null,
    placedBy: carried.find((one) => one.pagePropertySlug === PLACED_BY_PROPERTY)?.fixed ?? null,
  }
}

function kindsIn(reading: Reading): readonly Kind[] {
  return valuesOfType(reading, PAGE_TYPE).flatMap((type) => kindOf(reading, type) ?? [])
}

function bodyOf(kind: Kind): string {
  if (kind.propertySlug !== null) return kind.propertySlug
  throw new Error(`\`${kind.pageTypeSlug}\` names no property holding its pages' body`)
}

function installedAt(one: Valued, kind: Kind, home: string, on: string): string | null {
  const said = textAt(one.value, INSTALLED_AT)
  if (said === null || !said.startsWith(UNDER_HOME)) return null
  if ((textAt(one.value, PLACED_BY) ?? kind.placedBy) !== BY_LINK) return null
  if (!forMachine(textAt(one.value, ONLY_ON), on)) return null
  return atHome(said, home)
}

export function weighedIn(root: string, home: string, on: string = machineNow()): Weighing {
  const placings: Placing[] = []
  const wrong: string[] = []
  const reading = readingIn(root)
  if (!indexThere(reading)) return { placings, wrong }
  const seen = new Set<string>()
  for (const kind of kindsIn(reading)) {
    for (const one of valuesOfType(reading, kind.pageTypeSlug)) {
      const at = installedAt(one, kind, home, on)
      if (at === null || seen.has(at)) continue
      seen.add(at)
      try {
        placings.push({
          page: one.path,
          file: fileOf(reading, one, kind.pageTypeSlug, bodyOf(kind)),
          at,
        })
      } catch (thrown) {
        wrong.push(`${one.path} is reached at ${at}, and nothing was linked — ${whyOf(thrown)}`)
      }
    }
  }
  return { placings, wrong }
}

function placedTo(root: string, placing: Placing): string | null {
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

function realOf(path: string): string {
  try {
    return realpathSync(path)
  } catch {
    return resolve(path)
  }
}

function elsewhereOf(root: string, placings: readonly Placing[]): string | null {
  const launcher = placings.find((one) => partedIn(one.page)?.slug === LAUNCHER)
  if (launcher === undefined) return null
  const held = lstatSync(launcher.at, { throwIfNoEntry: false })
  if (held === undefined || !held.isSymbolicLink()) return null
  const runs = realOf(resolve(dirname(launcher.at), readlinkSync(launcher.at)))
  const here = realOf(root)
  if (runs.startsWith(`${here}/`)) return null
  return (
    `nothing is linked from ${root}, because the launcher at ${launcher.at} runs ${runs},` +
    " and only the checkout this machine runs places links"
  )
}

export function ranElsewhere(root: string, home: string, on: string = machineNow()): string | null {
  return elsewhereOf(root, weighedIn(root, home, on).placings)
}

export function linkedInPlace(root: string, home: string, on: string = machineNow()): Linking {
  const weighed = weighedIn(root, home, on)
  const elsewhere = elsewhereOf(root, weighed.placings)
  if (elsewhere !== null) return { said: [elsewhere], wrong: [] }
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
