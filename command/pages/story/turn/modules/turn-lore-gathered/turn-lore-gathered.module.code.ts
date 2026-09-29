import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  loreKept,
  loreNamed,
} from "akasha/command/pages/story/turn/modules/turn-lore-in-play/turn-lore-in-play.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  listedAt,
  valueByPath,
  valuesByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import {
  pathOf,
  withheldIn,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const HELD = "ts"

const LINES = /\r?\n/

const KINDS: readonly string[] = [lore.slug, place.slug]

const STORIES = "/stories/"

const LORE = "lore"

const CHARACTERS = "characters"

const PERSONA = "persona"

export type LoreGathered = {
  readonly values: Readonly<Record<string, unknown>>
  readonly named: readonly string[]
}

type Turned = {
  readonly at: string
  readonly value: Readonly<Record<string, unknown>>
}

function worldFolderOf(turnAt: string): string | null {
  const at = turnAt.indexOf(STORIES)
  return at < 1 ? null : turnAt.slice(0, at)
}

function lorePagesIn(paths: readonly string[]): readonly string[] {
  return paths.filter((one) => {
    const parted = partedIn(one)
    if (parted === null || parted.sections.length > 0 || parted.held !== HELD) return false
    return KINDS.includes(parted.pageType)
  })
}

function openedAt(root: string, at: string): string | null {
  const said = told(root, ["log", "--diff-filter=A", "-n", "1", "--format=%H", "--", at])
  const commit = said === null ? "" : said.trim()
  return commit === "" ? null : commit
}

export function loreChanged(root: string, at: string, folder: string): readonly string[] {
  const opened = openedAt(root, at)
  if (opened === null) return []
  const said = told(root, ["diff", "--name-only", opened, "HEAD", "--", folder])
  if (said === null) return []
  const paths = said.split(LINES).filter((one) => one !== "")
  return lorePagesIn(paths)
    .filter((one) => valueByPath(root, one) !== null)
    .sort()
}

function personaAt(root: string, character: string): string | null {
  const address = addressIn(character)
  if (address.kind !== "qualified") return null
  const listed = listedAt(root, address.pageTypeSlug, address.slug)[0]
  const value = listed === undefined ? null : valueAt(listed.path, root)
  return value === null ? null : textAt(value, PERSONA)
}

function loreAboutsIn(root: string): readonly (readonly [string, string | null])[] {
  return [...valuesByPath(root, lore.slug)].map(
    ([path, value]) => [path, textAt(value, loreAbout.propertySlug)] as const
  )
}

function loreLookIn(root: string) {
  return {
    pathOf: (page: string) => pathOf(root, page),
    personaOf: (character: string) => personaAt(root, character),
    about: loreAboutsIn(root),
    withheld: withheldIn(root),
  }
}

export function loreGathered(
  root: string,
  turn: Turned,
  values: Readonly<Record<string, unknown>>
): LoreGathered {
  const look = loreLookIn(root)
  const stated = stringsIn(values[LORE] ?? turn.value[LORE])
  const characters = stringsIn(values[CHARACTERS] ?? turn.value[CHARACTERS])
  const folder = worldFolderOf(turn.at)
  const kept = loreKept({
    stated,
    characters,
    changed: folder === null ? [] : loreChanged(root, turn.at, folder),
    look,
  })
  return {
    values: kept.length === 0 ? {} : { [LORE]: kept },
    named: loreNamed(kept, characters, look),
  }
}
