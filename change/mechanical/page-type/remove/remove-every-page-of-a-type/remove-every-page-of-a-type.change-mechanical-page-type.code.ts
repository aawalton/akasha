import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  editsOver,
  type Page,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PARTS = "parts"

export type Asked = {
  readonly pageType: string
  readonly atMost?: number | null
}

export type Taking = {
  readonly going: readonly string[]
  readonly unnaming: readonly Page[]
}

export function namedIn(at: string): readonly string[] {
  const said = partedIn(at)
  return said === null ? [] : [`${said.pageType}/${said.slug}`, said.slug]
}

export function takingIn(world: World, listed: readonly string[]): Taking | string {
  const held = new Map<string, Written[]>()
  const going: string[] = []
  for (const at of listed) {
    const value = pageIn(world, at)
    if (value === null) return `\`${at}\` is refused, and names no page`
    const values = namedIn(at)
    for (const parent of namersIn(world, at, PARTS)) {
      const written = held.get(parent.path) ?? []
      written.push({ written: "valueGone", key: PARTS, values })
      held.set(parent.path, written)
    }
    const [own, ...beside] = claimedIn(world, at, value)
    going.push(...beside, own ?? at)
  }
  const unnaming = [...held].map(([path, written]) => ({ path, written }))
  return { going, unnaming }
}

export function removeEveryPageOfAType(world: World, given: Asked): Said {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const named = world.index.everyOfType(given.pageType)
  if (named.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const atMost = given.atMost ?? null
  const listed = (atMost === null ? named : named.slice(0, atMost)).map((one) => one.path)
  let taking: Taking | string
  try {
    taking = takingIn(world, listed)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside those pages were not worked out`)
  }
  if (typeof taking === "string") return refusing(taking)
  const unnamed = editsOver(world, taking.unnaming)
  if (typeof unnamed === "string") return refusing(unnamed)
  const gone: readonly FileChange[] = taking.going.map((path) => ({ kind: "remove", path }))
  return stating([...unnamed, ...gone])
}

export function runChange(world: World, given: Asked): Said {
  return removeEveryPageOfAType(world, given)
}
