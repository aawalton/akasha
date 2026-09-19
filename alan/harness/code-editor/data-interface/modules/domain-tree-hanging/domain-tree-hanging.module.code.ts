import { championTree } from "akasha/code/editor/extension/modules/champions-tree/champions-tree.module.code.ts"
import { domainRowsIn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

export type DomainNode = {
  readonly slug: string
  readonly relPath: string | null
  readonly children: readonly DomainNode[]
}

export type Hung = {
  readonly key: string
  readonly label: string
  readonly at: string
  readonly domain: string
}

export type HungNode = {
  readonly key: string
  readonly label: string
  readonly at: string | null
  readonly count: number
  readonly children: readonly HungNode[]
}

export type HungTree = {
  readonly roots: readonly HungNode[]
  readonly unreached: readonly string[]
}

function leavesOf(held: readonly Hung[]): readonly HungNode[] {
  return held.map((one) => ({
    key: one.key,
    label: one.label,
    at: one.at,
    count: 0,
    children: [],
  }))
}

function nodeOf(
  node: DomainNode,
  byDomain: ReadonlyMap<string, readonly Hung[]>,
  reached: Set<string>
): HungNode | null {
  reached.add(node.slug)
  const under = node.children
    .map((child) => nodeOf(child, byDomain, reached))
    .filter((child): child is HungNode => child !== null)
  const own = byDomain.get(node.slug) ?? []
  const count = own.length + under.reduce((total, child) => total + child.count, 0)
  if (count === 0) return null
  return {
    key: node.slug,
    label: node.slug,
    at: node.relPath,
    count,
    children: [...under, ...leavesOf(own)],
  }
}

export function hungOnDomains(domains: readonly DomainNode[], hung: readonly Hung[]): HungTree {
  const byDomain = Map.groupBy(hung, (one) => one.domain)
  const reached = new Set<string>()
  const rooted = domains
    .map((node) => nodeOf(node, byDomain, reached))
    .filter((node): node is HungNode => node !== null)
  const unreached = [...byDomain.keys()].filter((domain) => !reached.has(domain)).sort()
  const loose = unreached.map((domain) => {
    const held = byDomain.get(domain) ?? []
    return {
      key: domain,
      label: domain,
      at: null,
      count: held.length,
      children: leavesOf(held),
    }
  })
  return { roots: [...rooted, ...loose], unreached }
}

export function domainsIn(given: string | Reading): readonly DomainNode[] {
  return championTree(domainRowsIn(readingIn(given))).roots
}
