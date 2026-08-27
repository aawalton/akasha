import { describe, expect, test } from "bun:test"
import type { AppNavItem } from "../types/nav-types"
import { selectDrawerGroups } from "./select-drawer-groups"

function nav(id: string, label: string, extra: Partial<AppNavItem> = {}): AppNavItem {
  return { id, label, shortLabel: label, href: `/nav/${id}`, ...extra }
}

const claudeAccounts = nav("view-16", "Claude Accounts")
const personas: AppNavItem = { ...nav("view-17", "Personas"), children: [claudeAccounts] }
const workflows = nav("view-8", "Workflows")
const pipelines: AppNavItem = { ...nav("view-9", "Pipelines"), children: [workflows] }
const tracking = nav("view-91", "Tracking")
const tasks = nav("view-6", "Tasks")
const projects = nav("view-2", "Projects")
const home = nav("home", "Home")

const primaryItems: readonly AppNavItem[] = [
  home,
  tracking,
  tasks,
  projects,
  personas,
  claudeAccounts,
  pipelines,
  workflows,
]

const visibleIds = new Set(["view-91", "view-6", "view-2", "view-17"])

function flatEntryIds(groups: ReturnType<typeof selectDrawerGroups>): readonly string[] {
  return groups.flatMap((g) =>
    g.items.flatMap((it) => [it.id, ...(it.children ?? []).map((c) => c.id)])
  )
}

describe("selectDrawerGroups — overflow-only drawer", () => {
  const groups = selectDrawerGroups(primaryItems, visibleIds)

  test("no bar-visible LEAF appears in the drawer at all", () => {
    const ids = flatEntryIds(groups)
    expect(ids).not.toContain("view-91")
    expect(ids).not.toContain("view-6")
    expect(ids).not.toContain("view-2")
  })

  test("a bar-visible PARENT is not a tappable entry, but its children remain reachable under a group header", () => {
    const topLevelIds = groups.flatMap((g) => g.items.map((it) => it.id))
    expect(topLevelIds).not.toContain("view-17")
    const personasGroup = groups.find((g) => g.label === "Personas")
    expect(personasGroup).toBeDefined()
    expect(personasGroup?.items.map((it) => it.id)).toEqual(["view-16"])
  })

  test("non-bar items are kept once, parents nesting their children (no flat reappearance)", () => {
    const overflow = groups.find((g) => g.label == null)
    const ids = overflow?.items.map((it) => it.id) ?? []
    expect(ids).toEqual(["home", "view-9"])
    expect(ids).not.toContain("view-8")
    const pipelinesEntry = overflow?.items.find((it) => it.id === "view-9")
    expect(pipelinesEntry?.children?.map((c) => c.id)).toEqual(["view-8"])
  })

  test("every nav item stays reachable and nothing is a tappable entry twice", () => {
    const ids = flatEntryIds(groups)
    expect(new Set(ids)).toEqual(new Set(["home", "view-9", "view-8", "view-16"]))
    expect(ids.length).toBe(new Set(ids).size)
  })

  test("nothing pinned → whole list is overflow (single unlabeled group)", () => {
    const all = selectDrawerGroups([home, pipelines, workflows], new Set())
    expect(all).toHaveLength(1)
    expect(all[0]?.label).toBeUndefined()
    expect(all[0]?.items.map((it) => it.id)).toEqual(["home", "view-9"])
  })
})
