import {
  type FileChange,
  refusing,
  type Said,
  splicedIn,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { listIn, statedIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { namesIn } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SLUG = "slug"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly target: string
  readonly by: string
  readonly atMost?: number | null
}

export function addressesBy(
  world: World,
  target: string,
  by: string
): ReadonlyMap<string, string> | string {
  if (world.index.propertiesIfNamed(target) === null) return `\`${target}\` names no page type`
  const found = new Map<string, string>()
  for (const kind of world.index.kindsUnder(target)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      const slug = value[SLUG]
      if (typeof slug !== "string") continue
      const address = `${partedIn(path)?.pageType ?? kind}/${slug}`
      for (const name of namesIn(value[by])) {
        const one = name.trim()
        const already = found.get(one)
        if (already !== undefined && already !== address) {
          return `\`${one}\` under \`${by}\` names both \`${already}\` and \`${address}\``
        }
        found.set(one, address)
      }
    }
  }
  return found
}

export type Related = {
  readonly related: readonly string[]
  readonly unreached: readonly string[]
}

export function relatedIn(
  held: readonly string[],
  addresses: ReadonlyMap<string, string>
): Related {
  const reached = new Set(addresses.values())
  const found = new Set<string>()
  const unreached: string[] = []
  for (const one of held) {
    if (reached.has(one)) {
      found.add(one)
      continue
    }
    const address = addresses.get(one.trim())
    if (address === undefined) unreached.push(one.trim())
    else found.add(address)
  }
  return { related: [...found].sort(), unreached }
}

export function unreachedSaid(given: Asked, unreached: ReadonlyMap<string, string>): string {
  const named = [...unreached.keys()]
    .sort()
    .map((one) => `\`${one}\` (on \`${unreached.get(one) ?? ""}\`)`)
  return `no \`${given.target}\` states under \`${given.by}\` the names ${named.join(", ")}`
}

function spelledList(related: readonly string[]): string {
  return `[${related.map((one) => JSON.stringify(one)).join(", ")}]`
}

export function editsFor(
  world: World,
  path: string,
  key: string,
  related: readonly string[]
): readonly FileChange[] | string {
  const text = world.textOf(path)
  if (text === null) return `\`${path}\` could not be read`
  const source = parsedAs(path, text)
  const list = listIn(source, key)
  if (list !== null) {
    const spot = { from: list.getStart(source), to: list.getEnd(), put: spelledList(related) }
    return splicedIn(path, text, [spot])
  }
  const one = statedIn(source).get(key)
  if (one === undefined || related.length !== 1) {
    return `\`${path}\` states no name under \`${key}\` in its own body`
  }
  const spot = { from: one.getStart(source), to: one.getEnd(), put: JSON.stringify(related[0]) }
  return splicedIn(path, text, [spot])
}

type Rewritten = {
  readonly path: string
  readonly related: readonly string[]
}

function rewrittenOver(
  world: World,
  given: Asked,
  addresses: ReadonlyMap<string, string>
): readonly Rewritten[] | string {
  const seen = new Set<string>()
  const found: Rewritten[] = []
  const unreached = new Map<string, string>()
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (seen.has(path)) continue
      seen.add(path)
      const held = namesIn(value[given.key])
      if (held.length === 0) continue
      const { related, unreached: missed } = relatedIn(held, addresses)
      for (const one of missed) if (!unreached.has(one)) unreached.set(one, path)
      if (JSON.stringify(related) !== JSON.stringify(held)) found.push({ path, related })
    }
  }
  return unreached.size > 0 ? unreachedSaid(given, unreached) : found
}

export function relateNamesByKeyOnEveryPage(world: World, given: Asked): Said {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const addresses = addressesBy(world, given.target, given.by)
  if (typeof addresses === "string") return refusing(addresses)
  const rewritten = rewrittenOver(world, given, addresses)
  if (typeof rewritten === "string") return refusing(rewritten)
  const atMost = given.atMost ?? null
  const edits: FileChange[] = []
  for (const one of atMost === null ? rewritten : rewritten.slice(0, atMost)) {
    const made = editsFor(world, one.path, given.key, one.related)
    if (typeof made === "string") return refusing(made)
    edits.push(...made)
  }
  if (edits.length === 0) {
    return telling(stating([]), [
      `no \`${given.pageType}\` holds a name under \`${given.key}\` that is not written as its page`,
    ])
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return relateNamesByKeyOnEveryPage(world, given)
}
