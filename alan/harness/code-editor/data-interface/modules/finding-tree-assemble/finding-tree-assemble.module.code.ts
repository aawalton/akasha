import { championTree } from "akasha/code/editor/extension/modules/champions-tree/champions-tree.module.code.ts"
import { domainRowsIn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FINDING = "finding"

const DOMAIN = "domain"

const CLAIM = "claim"

const KEYED = "finding/"

export type Found = {
  readonly slug: string
  readonly at: string
  readonly domain: string
  readonly said: string
}

export type FindingNode = {
  readonly key: string
  readonly label: string
  readonly at: string | null
  readonly findings: number
  readonly children: readonly FindingNode[]
}

export type FindingTree = {
  readonly roots: readonly FindingNode[]
  readonly unreached: readonly string[]
}

export type DomainNode = {
  readonly slug: string
  readonly relPath: string | null
  readonly children: readonly DomainNode[]
}

export function findingsIn(given: string | Reading): readonly Found[] {
  const found: Found[] = []
  for (const one of valuesOfType(readingIn(given), FINDING)) {
    const parted = partedIn(one.path)
    const domain = textAt(one.value, DOMAIN)
    const said = textAt(one.value, CLAIM)
    if (parted === null || domain === null || said === null) continue
    found.push({ slug: parted.slug, at: one.path, domain, said })
  }
  return found
}

function bySlug(one: Found, two: Found): number {
  return one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
}

function leavesOf(held: readonly Found[]): readonly FindingNode[] {
  return [...held].sort(bySlug).map((one) => ({
    key: `${KEYED}${one.slug}`,
    label: one.said,
    at: one.at,
    findings: 0,
    children: [],
  }))
}

function nodeOf(
  node: DomainNode,
  byDomain: ReadonlyMap<string, readonly Found[]>,
  reached: Set<string>
): FindingNode | null {
  reached.add(node.slug)
  const under = node.children
    .map((child) => nodeOf(child, byDomain, reached))
    .filter((child): child is FindingNode => child !== null)
  const own = byDomain.get(node.slug) ?? []
  const findings = own.length + under.reduce((total, child) => total + child.findings, 0)
  if (findings === 0) return null
  return {
    key: node.slug,
    label: node.slug,
    at: node.relPath,
    findings,
    children: [...under, ...leavesOf(own)],
  }
}

export function treeFrom(domains: readonly DomainNode[], found: readonly Found[]): FindingTree {
  const byDomain = Map.groupBy(found, (one) => one.domain)
  const reached = new Set<string>()
  const rooted = domains
    .map((node) => nodeOf(node, byDomain, reached))
    .filter((node): node is FindingNode => node !== null)
  const unreached = [...byDomain.keys()].filter((domain) => !reached.has(domain)).sort()
  const loose = unreached.map((domain) => {
    const held = byDomain.get(domain) ?? []
    return {
      key: domain,
      label: domain,
      at: null,
      findings: held.length,
      children: leavesOf(held),
    }
  })
  return { roots: [...rooted, ...loose], unreached }
}

export function assembleFindingTree(given: string | Reading): FindingTree {
  const reading = readingIn(given)
  const domains = championTree(domainRowsIn(reading)).roots
  return treeFrom(domains, findingsIn(reading))
}
