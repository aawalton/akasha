import { dirname, join } from "node:path"
import {
  appsIn,
  routesOf,
  servedAlone,
} from "akasha/check/code/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.check-code.decision.code.ts"
import {
  APP,
  serverNamed,
} from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"
import { componentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { code } from "akasha/code/module/properties/code.code-file-property.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { routeTable } from "akasha/code/router-app/properties/route-table.code-file-property.ts"
import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { drawn } from "akasha/story/game/game-panel/properties/drawn.file-property.ts"

const TESTED: ReadonlySet<string> = new Set(["test", "test-fixtures"])

const STATED = "runsInABrowser"

const PROPERTY_SLUG = "propertySlug"

const PAGE_HELD = "ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export type Reach = {
  readonly index: Answering
  readonly holds: (path: string) => boolean
  readonly textAt: (path: string) => string | null
}

type Linked = {
  readonly from: string
  readonly to: string
}

export type Graph = {
  readonly nodes: readonly string[]
  readonly edges: readonly Linked[]
}

export type Marks = {
  readonly seeded: (path: string) => boolean
  readonly stated: (path: string) => boolean
  readonly subjectOf: (path: string) => string | null
}

export type Split = {
  readonly browser: ReadonlySet<string>
  readonly apart: ReadonlySet<string>
}

export function tested(path: string): boolean {
  return (partedIn(path)?.sections ?? []).some((one) => TESTED.has(one))
}

function flooded(
  from: readonly string[],
  onward: ReadonlyMap<string, readonly string[]>,
  passes: (path: string) => boolean
): Set<string> {
  const found = new Set(from.filter(passes))
  const taking = [...found]
  for (let at = 0; at < taking.length; at += 1) {
    const one = taking[at]
    if (one === undefined) continue
    for (const next of onward.get(one) ?? []) {
      if (found.has(next) || !passes(next)) continue
      found.add(next)
      taking.push(next)
    }
  }
  return found
}

function onwardIn(edges: readonly Linked[]): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of edges) {
    if (tested(one.from)) continue
    const held = found.get(one.from)
    if (held === undefined) found.set(one.from, [one.to])
    else held.push(one.to)
  }
  return found
}

export function splitIn(graph: Graph, marks: Marks): Split {
  const onward = onwardIn(graph.edges)
  const inner = graph.nodes.filter((one) => !tested(one))
  const browser = flooded(
    inner.filter(marks.seeded),
    onward,
    (one) => !serverNamed(one) && !tested(one)
  )
  const plain = flooded(
    inner.filter((one) => !browser.has(one)),
    onward,
    (one) => !marks.stated(one) && !tested(one)
  )
  const apart = new Set([...browser].filter((one) => !plain.has(one)))
  for (const one of graph.nodes) {
    if (!tested(one)) continue
    const subject = marks.subjectOf(one)
    if (subject === null || !apart.has(subject)) continue
    apart.add(one)
    browser.add(one)
  }
  return { browser, apart }
}

export function subjectIn(path: string, holds: (at: string) => boolean): string | null {
  const said = partedIn(path)
  if (said === null) return null
  const at = said.sections.findIndex((one) => TESTED.has(one))
  if (at === -1) return null
  const sections = [...said.sections.slice(0, at), code.propertySlug]
  const named = [said.slug, said.pageType, ...sections].join(".")
  for (const held of code.extensions) {
    const one = join(dirname(path), `${named}.${held}`)
    if (holds(one)) return one
  }
  return null
}

function routedIn(reach: Reach): ReadonlySet<string> {
  const filed = reach.index.everyOfType(APP).map((one) => one.path)
  const found = new Set<string>()
  const tabled = reach.index.filePropertiesAt().get(APP)?.get(routeTable.propertySlug) ?? null
  if (filed.length === 0 || tabled === null) return found
  const asking = {
    appsFiled: () => filed,
    namedFilesOf: (slug: string) => reach.index.filePropertiesAt().get(slug) ?? NONE,
    pathsUnder: () => [],
    textAt: reach.textAt,
  }
  for (const app of appsIn(asking)) {
    for (const one of routesOf(app, asking)) {
      const text = reach.textAt(one)
      if (text === null || servedAlone(parsedAs(one, text))) continue
      found.add(one)
    }
  }
  return found
}

function groupsIn(index: Answering): ReadonlySet<string> {
  const found = new Set<string>()
  for (const value of index.valuesByPath(componentPropertyGroup.slug).values()) {
    const slug = textAt(value, PROPERTY_SLUG)
    if (slug !== null) found.add(slug)
  }
  return found
}

function statedIn(index: Answering): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [page, value] of index.valuesByPath(module.slug)) {
    if (value[STATED] !== true) continue
    const held = textAt(value, code.propertySlug)
    const at = held === null ? null : besideAt(page, code.propertySlug, held)
    if (at !== null) found.add(at)
  }
  return found
}

function drawnFor(path: string, holds: (at: string) => boolean): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.join(".") !== code.propertySlug) return false
  const page = join(dirname(path), `${said.slug}.${said.pageType}.${PAGE_HELD}`)
  return drawn.extensions.some((held) => {
    const at = besideAt(page, drawn.propertySlug, held)
    return at !== null && holds(at)
  })
}

function drawingFor(path: string, groups: ReadonlySet<string>): boolean {
  const sections = partedIn(path)?.sections ?? []
  const [group, held] = sections
  return (
    sections.length === 2 && held === code.propertySlug && group !== undefined && groups.has(group)
  )
}

function marksOf(reach: Reach): Marks {
  const routed = routedIn(reach)
  const groups = groupsIn(reach.index)
  const stated = statedIn(reach.index)
  return {
    seeded: (one) =>
      routed.has(one) || stated.has(one) || drawingFor(one, groups) || drawnFor(one, reach.holds),
    stated: (one) => stated.has(one),
    subjectOf: (one) => subjectIn(one, reach.holds),
  }
}

export function splitOver(named: readonly string[], reach: Reach): Split {
  const marks = marksOf(reach)
  const subjects: string[] = []
  for (const one of named) {
    if (!tested(one)) continue
    const subject = marks.subjectOf(one)
    if (subject !== null) subjects.push(subject)
  }
  const taken = takenIn(importers, [...named, ...subjects], {
    index: reach.index,
    through: compiled,
  })
  return splitIn({ nodes: taken.nodes, edges: taken.edges }, marks)
}
