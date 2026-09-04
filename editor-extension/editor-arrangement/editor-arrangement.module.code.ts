import { diskFileTree, type FileTree } from "@akasha/markdown-pages/file-tree"
import { type PageType, pagesOf, reposOf } from "@akasha/markdown-pages/page-types"
import { removePage, writePage } from "@akasha/markdown-pages/page-write"
import { statedIn, textIn } from "@akasha/markdown-pages/page-write-text"
import type { Value } from "@akasha/markdown-pages/page-write-values"
import { whereFor } from "@akasha/markdown-pages/page-write-where"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { readUncommitted } from "@akasha/markdown-pages/uncommitted"
import { isAddressable } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { pageStemOf } from "@akasha/pages-system/markdown-page-name"

export const WRITER = "editor-pages-writer"

export const WINDOW = "code-editor-window"

export const GROUP = "code-editor-group"

export const TAB = "code-editor-group-tab"

export const TERMINAL = "code-editor-terminal"

export interface Tab {
  readonly label: string
  readonly active: boolean
  readonly terminal?: string
  readonly seat?: string
}

export interface Group {
  readonly position: number
  readonly active: boolean
  readonly tabs: readonly Tab[]
}

export interface Arrangement {
  readonly window: string
  readonly groups: readonly Group[]
}

export interface Landing {
  readonly pageType: string
  readonly name: string
  readonly values: Readonly<Record<string, Value>>
}

export interface Named {
  readonly pageType: string
  readonly name: string
}

export function isArrangement(one: unknown): one is Arrangement {
  if (typeof one !== "object" || one === null) return false
  const held = one as Record<string, unknown>
  if (typeof held["window"] !== "string" || held["window"].trim() === "") return false
  const groups = held["groups"]
  if (!Array.isArray(groups)) return false
  return groups.every((group) => {
    if (typeof group !== "object" || group === null) return false
    const each = group as Record<string, unknown>
    return typeof each["position"] === "number" && Array.isArray(each["tabs"])
  })
}

export function pagesFor(arrangement: Arrangement): readonly Landing[] {
  const window = arrangement.window
  const groups: Landing[] = []
  const terminals: Landing[] = []
  const tabs: Landing[] = []
  for (const group of arrangement.groups) {
    const groupName = `${window}-${group.position}`
    groups.push({
      pageType: GROUP,
      name: groupName,
      values: {
        slug: groupName,
        title: groupName,
        "window-name": window,
        position: group.position,
        active: group.active,
      },
    })
    group.tabs.forEach((tab, index) => {
      const tabName = `${groupName}-${index + 1}`
      const terminal = tab.terminal
      tabs.push({
        pageType: TAB,
        name: tabName,
        values: {
          slug: tabName,
          title: tabName,
          "group-name": groupName,
          place: index + 1,
          label: tab.label,
          active: tab.active,
          ...(terminal === undefined ? {} : { "terminal-name": terminal }),
        },
      })
      if (terminal === undefined) return
      terminals.push({
        pageType: TERMINAL,
        name: terminal,
        values: {
          slug: terminal,
          title: terminal,
          process: terminal,
          ...(tab.seat === undefined ? {} : { "seat-name": tab.seat }),
        },
      })
    })
  }
  return [
    { pageType: WINDOW, name: window, values: { slug: window, title: window, process: window } },
    ...groups,
    ...terminals,
    ...tabs,
  ]
}

export function namesOf(
  roots: Roots,
  types: readonly PageType[],
  pageType: string
): readonly string[] {
  const type = types.find((one) => one.slug === pageType)
  if (type === undefined) return []
  return reposOf(type).flatMap((repo) => {
    const root = isAddressable(repo) ? roots[repo] : undefined
    return root === undefined ? [] : pagesOf(root, type, repo).map((relPath) => pageStemOf(relPath))
  })
}

export function goneFor(
  roots: Roots,
  arrangement: Arrangement,
  kept: readonly Landing[],
  tree: FileTree = diskFileTree(roots)
): readonly Named[] {
  const types = registryOf(tree)
  const held = new Set(kept.map((one) => `${one.pageType}/${one.name}`))
  const prefix = `${arrangement.window}-`
  const gone: Named[] = []
  for (const pageType of [GROUP, TAB]) {
    for (const name of namesOf(roots, types, pageType)) {
      if (!name.startsWith(prefix) || held.has(`${pageType}/${name}`)) continue
      gone.push({ pageType, name })
    }
  }
  return gone
}

export const ARRANGES =
  "an editor arrangement takes a JSON object naming a `window` and a list of `groups`, each stating a " +
  "`position`, whether it is `active`, and its `tabs`, each of those stating a `label`, whether it is " +
  "`active`, and where it holds one, its `terminal` and the `seat` standing in it"

export type Outcome =
  | { readonly kind: "written"; readonly wrote: number; readonly took: number }
  | { readonly kind: "refused"; readonly detail: string }

function same(stated: unknown, value: Value): boolean {
  if (Array.isArray(value)) {
    return (
      Array.isArray(stated) &&
      stated.length === value.length &&
      stated.every((one, index) => String(one) === String(value[index]))
    )
  }
  return stated !== undefined && !Array.isArray(stated) && String(stated) === String(value)
}

export function alreadyStands(
  roots: Roots,
  page: Landing,
  tree: FileTree = diskFileTree(roots)
): boolean {
  const at = whereFor(roots, page.pageType, page.name, tree)
  if (at === null) return false
  const text = textIn(at.path)
  if (text === "") return false
  const stated = { ...statedIn(text), ...(readUncommitted(at.path) ?? {}) }
  return Object.entries(page.values).every(([key, value]) => same(stated[key], value))
}

function landed(roots: Roots, page: Landing): string | null {
  const wrote = writePage(roots, page.pageType, page.name, page.values, WRITER)
  if (wrote === null) return `\`${page.pageType}\` is not a page type this service writes`
  if (wrote.refused !== undefined) return wrote.refused
  return wrote.commitError
}

function taken(roots: Roots, one: Named): string | null {
  const gone = removePage(roots, one.pageType, one.name, WRITER)
  if (gone === null) return `\`${one.pageType}\` is not a page type this service writes`
  if (gone.refused !== undefined) return gone.refused
  return gone.commitError
}

export function landArrangement(roots: Roots, arrangement: Arrangement): Outcome {
  const pages = pagesFor(arrangement)
  const tree = diskFileTree(roots)
  const gone = goneFor(roots, arrangement, pages, tree)
  const refusals: string[] = []
  let wrote = 0
  for (const page of pages) {
    if (alreadyStands(roots, page, tree)) continue
    const why = landed(roots, page)
    if (why === null) wrote += 1
    else refusals.push(`${page.pageType}/${page.name}: ${why}`)
  }
  for (const one of gone) {
    const why = taken(roots, one)
    if (why !== null) refusals.push(`${one.pageType}/${one.name}: ${why}`)
  }
  return refusals.length > 0
    ? { kind: "refused", detail: refusals.join("\n") }
    : { kind: "written", wrote, took: gone.length }
}

export function arrangedResponse(
  roots: Roots,
  parsed: unknown
): { readonly body: unknown; readonly status: number } {
  if (!isArrangement(parsed)) return { body: { error: ARRANGES }, status: 400 }
  const outcome = landArrangement(roots, parsed)
  if (outcome.kind === "refused") {
    return {
      body: { error: `the gates refused what this arrangement would land:\n${outcome.detail}` },
      status: 400,
    }
  }
  return {
    body: { ok: true, window: parsed.window, wrote: outcome.wrote, took: outcome.took },
    status: 200,
  }
}
