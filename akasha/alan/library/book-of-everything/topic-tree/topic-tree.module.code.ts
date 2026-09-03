import { valuesOfType } from "@akasha/indexes"
import type { CoverageNode } from "../coverage-fold/coverage-fold.module.code.ts"
import type { StatusNode } from "../coverage-status/coverage-status.module.code.ts"
import { displayTitle, type ProfileStatus } from "../node-profile/node-profile.module.code.ts"

const TOPIC = "learn-everything-topic"

const STATUSES: readonly string[] = ["live", "resting", "unopened"]

const UNOPENED: ProfileStatus = "unopened"

export type Topic = {
  readonly slug: string
  readonly at: string
  readonly label: string
  readonly title: string
  readonly depth: number
  readonly coverage: number
  readonly status: ProfileStatus
  readonly children: readonly Topic[]
}

export type Row = {
  readonly slug: string
  readonly at: string
  readonly order: string
  readonly label: string
  readonly depth: number
  readonly coverage: number
  readonly status: ProfileStatus
  readonly parent: string | null
}

function statusOf(said: unknown): ProfileStatus {
  return STATUSES.includes(said as string) ? (said as ProfileStatus) : UNOPENED
}

function numberOf(said: unknown): number {
  return typeof said === "number" && Number.isFinite(said) ? said : 0
}

export function orderOf(at: string): string {
  const above = at.split("/").at(-2)
  return above === undefined || above === "" ? at : above
}

function parentIn(said: unknown): string | null {
  if (!Array.isArray(said)) return null
  const first = said.find((one) => typeof one === "string")
  return typeof first === "string" ? first : null
}

export function rowsIn(root: string): readonly Row[] {
  return valuesOfType(root, TOPIC).flatMap((one) => {
    const held = one.value as Record<string, unknown>
    const slug = held["slug"]
    if (typeof slug !== "string") return []
    const label = held["node"]
    return [
      {
        slug,
        at: one.path,
        order: orderOf(one.path),
        label: typeof label === "string" ? label : slug,
        depth: numberOf(held["depth"]),
        coverage: numberOf(held["coverage"]),
        status: statusOf(held["status"]),
        parent: parentIn(held["partOfSlugs"]),
      },
    ]
  })
}

export function treeOf(rows: readonly Row[]): Topic {
  const roots = rows.filter((one) => one.parent === null)
  const first = roots[0]
  if (roots.length !== 1 || first === undefined) {
    return failing(
      `the topic pages name ${roots.length} topics above every other, and a book has one`
    )
  }
  const kin = new Map<string, Row[]>()
  for (const one of rows) {
    if (one.parent === null) continue
    const held = kin.get(one.parent) ?? []
    held.push(one)
    kin.set(one.parent, held)
  }
  for (const held of kin.values()) {
    held.sort((one, two) => (one.order < two.order ? -1 : one.order > two.order ? 1 : 0))
  }
  const open = new Set<string>()
  const built = (one: Row): Topic => {
    open.add(one.slug)
    return {
      slug: one.slug,
      at: one.at,
      label: one.label,
      title: displayTitle(one.label),
      depth: one.depth,
      coverage: one.coverage,
      status: one.status,
      children: (kin.get(one.slug) ?? []).filter((held) => !open.has(held.slug)).map(built),
    }
  }
  return built(first)
}

function failing(why: string): never {
  throw new Error(why)
}

export function topicTreeIn(root: string): Topic {
  return treeOf(rowsIn(root))
}

export function topicAt(from: Topic, slug: string): Topic | null {
  if (from.slug === slug) return from
  for (const child of from.children) {
    const found = topicAt(child, slug)
    if (found !== null) return found
  }
  return null
}

export function leavesOf(from: Topic): readonly Topic[] {
  return from.children.length === 0 ? [from] : from.children.flatMap(leavesOf)
}

export function everyTopic(from: Topic): readonly Topic[] {
  return [from, ...from.children.flatMap(everyTopic)]
}

export function statusNodeOf(from: Topic): StatusNode {
  return {
    path: from.slug,
    label: from.label,
    title: from.title,
    status: from.status,
    children: from.children.map(statusNodeOf),
  }
}

export function coverageNodeOf(from: Topic): CoverageNode {
  return { d: from.depth, children: from.children.map(coverageNodeOf) }
}
