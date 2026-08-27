import { describe, expect, it } from "bun:test"
import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import { PALETTE_ONLY } from "@shared/design-primitives/utils/keyboard-registry"
import { navItemsToCommandBindings } from "./nav-command-bindings"

function routeEntry(id: string, href: string, label = id): AppNavItem {
  return { id, label, shortLabel: label, href }
}
function actionEntry(id: string, onClick: () => void, label = id): AppNavItem {
  return { id, label, shortLabel: label, onClick }
}
function toggleParent(id: string, label = id): AppNavItem {
  return { id, label, shortLabel: label, children: [] }
}

const noopNavigate = (_href: string) => {}

describe("navItemsToCommandBindings", () => {
  it("projects a route entry (href, no onClick) whose onTrigger calls navigate(href)", () => {
    const navigated: string[] = []
    const bindings = navItemsToCommandBindings([routeEntry("view-1", "/pages/abc")], {
      navigate: (href) => {
        navigated.push(href)
      },
    })
    expect(bindings).toHaveLength(1)
    for (const b of bindings) b.onTrigger()
    expect(navigated).toEqual(["/pages/abc"])
  })

  it("projects an action entry (onClick, no href) whose onTrigger calls onClick", () => {
    let clicked = 0
    const bindings = navItemsToCommandBindings(
      [
        actionEntry("add-view-page", () => {
          clicked++
        }),
      ],
      { navigate: noopNavigate }
    )
    expect(bindings).toHaveLength(1)
    for (const b of bindings) b.onTrigger()
    expect(clicked).toBe(1)
  })

  it("drops an entry with neither href nor onClick (a toggle-only parent)", () => {
    const bindings = navItemsToCommandBindings([toggleParent("content")], {
      navigate: noopNavigate,
    })
    expect(bindings).toHaveLength(0)
  })

  it("prefers href over onClick when both are present — the route branch wins", () => {
    const navigated: string[] = []
    let clicked = 0
    const entry: AppNavItem = {
      id: "both",
      label: "Both",
      shortLabel: "Both",
      href: "/both",
      onClick: () => {
        clicked++
      },
    }
    const bindings = navItemsToCommandBindings([entry], {
      navigate: (href) => {
        navigated.push(href)
      },
    })
    for (const b of bindings) b.onTrigger()
    expect(navigated).toEqual(["/both"])
    expect(clicked).toBe(0)
  })

  it("sets chord to PALETTE_ONLY on every binding", () => {
    const bindings = navItemsToCommandBindings(
      [routeEntry("view-1", "/a"), actionEntry("add", () => {})],
      { navigate: noopNavigate }
    )
    expect(bindings).toHaveLength(2)
    for (const b of bindings) expect(b.chord).toBe(PALETTE_ONLY)
  })

  it("derives a stable row-derived id `nav.${entry.id}` by default", () => {
    const bindings = navItemsToCommandBindings([routeEntry("view-42", "/a")], {
      navigate: noopNavigate,
    })
    expect(bindings.map((b) => b.id)).toEqual(["nav.view-42"])
  })

  it("honors a custom idPrefix", () => {
    const bindings = navItemsToCommandBindings([routeEntry("view-42", "/a")], {
      navigate: noopNavigate,
      idPrefix: "atlas-nav",
    })
    expect(bindings.map((b) => b.id)).toEqual(["atlas-nav.view-42"])
  })

  it("uses entry.label as the binding label", () => {
    const bindings = navItemsToCommandBindings([routeEntry("view-1", "/a", "My Page")], {
      navigate: noopNavigate,
    })
    expect(bindings.map((b) => b.label)).toEqual(["My Page"])
  })

  it("omits group and layer when they are not passed", () => {
    const bindings = navItemsToCommandBindings([routeEntry("view-1", "/a")], {
      navigate: noopNavigate,
    })
    expect(bindings.map((b) => "group" in b)).toEqual([false])
    expect(bindings.map((b) => "layer" in b)).toEqual([false])
  })

  it("passes through group and layer when set", () => {
    const bindings = navItemsToCommandBindings([routeEntry("view-1", "/a")], {
      navigate: noopNavigate,
      group: "Navigation",
      layer: "conventional",
    })
    expect(bindings.map((b) => b.group)).toEqual(["Navigation"])
    expect(bindings.map((b) => b.layer)).toEqual(["conventional"])
  })

  it("emits one binding per actionable entry, preserving order and dropping non-actionable", () => {
    const bindings = navItemsToCommandBindings(
      [routeEntry("view-1", "/a"), toggleParent("parent"), actionEntry("add", () => {})],
      { navigate: noopNavigate }
    )
    expect(bindings.map((b) => b.id)).toEqual(["nav.view-1", "nav.add"])
  })
})
