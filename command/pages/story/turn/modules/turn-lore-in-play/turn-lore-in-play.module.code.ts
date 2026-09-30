import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { world } from "akasha/story/world/world.page-type.ts"

const HELD = "ts"

export type LoreLooking = {
  readonly pathOf: (page: string) => string | null
  readonly personaOf: (character: string) => string | null
  readonly about: Iterable<readonly [path: string, about: string | null]>
  readonly withheld: readonly string[]
}

type LoreAtHand = {
  readonly stated: readonly string[]
  readonly characters: readonly string[]
  readonly changed: readonly string[]
  readonly look: LoreLooking
}

function addressOf(path: string): string | null {
  const parted = partedIn(path)
  if (parted === null || parted.sections.length > 0 || parted.held !== HELD) return null
  return namedAs(parted.pageType, parted.slug, null)
}

function addressesIn(paths: readonly string[], look: LoreLooking): readonly string[] {
  const found: string[] = []
  for (const path of paths) {
    if (look.withheld.includes(path)) continue
    const address = addressOf(path)
    if (address !== null) found.push(address)
  }
  return found
}

function continuationsOf(stated: readonly string[], look: LoreLooking): readonly string[] {
  const abouts = [...look.about]
  const aboutAt = new Map(abouts)
  const targets = new Set<string>()
  for (const one of stated) {
    const path = look.pathOf(one)
    if (path === null) continue
    const target = aboutAt.get(path) ?? one
    const address = addressIn(target)
    if (address.kind === "qualified" && address.pageTypeSlug === world.slug) continue
    targets.add(target)
  }
  return abouts.flatMap(([path, said]) => (said !== null && targets.has(said) ? [path] : []))
}

function foundIn(
  stated: readonly string[],
  characters: readonly string[],
  look: LoreLooking
): readonly string[] {
  const about = new Set([...characters, ...characters.flatMap((one) => look.personaOf(one) ?? [])])
  const found = new Set(stated.flatMap((one) => look.pathOf(one) ?? []))
  for (const [path, said] of look.about) if (said !== null && about.has(said)) found.add(path)
  for (const path of continuationsOf(stated, look)) found.add(path)
  return [...found]
}

export function loreNamed(
  stated: readonly string[],
  characters: readonly string[],
  look: LoreLooking
): readonly string[] {
  return foundIn(stated, characters, look)
    .filter((path) => !look.withheld.includes(path))
    .sort()
}

export function loreKept(atHand: LoreAtHand): readonly string[] {
  const named = atHand.stated.filter((one) => atHand.look.pathOf(one) !== null)
  const about = [
    ...foundIn([], atHand.characters, atHand.look),
    ...continuationsOf(named, atHand.look),
  ]
  const added = addressesIn([...about, ...atHand.changed], atHand.look)
  return [...new Set([...named, ...added])].sort()
}
