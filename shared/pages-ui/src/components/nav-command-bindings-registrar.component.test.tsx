import { afterEach, describe, expect, it } from "bun:test"
import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import { triggerBinding, useKeyboardBindings } from "@shared/design-primitives/hooks/use-keyboard-registry"
import { __resetKeyboardRegistryForTest } from "@shared/design-primitives/hooks/use-keyboard-registry"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { NavCommandBindings } from "./nav-command-bindings-registrar"

afterEach(() => {
  cleanup()
  __resetKeyboardRegistryForTest()
})

function route(id: string, href: string): AppNavItem {
  return { id, label: id, shortLabel: id, href }
}
function action(id: string, onClick: () => void): AppNavItem {
  return { id, label: id, shortLabel: id, onClick }
}
function toggleParent(id: string): AppNavItem {
  return { id, label: id, shortLabel: id, children: [] }
}

let navDescriptorIds: string[] = []
function Descriptors() {
  navDescriptorIds = useKeyboardBindings()
    .map((d) => d.id)
    .filter((id) => id.startsWith("nav."))
  return null
}

describe("NavCommandBindings — registrar", () => {
  it("registers exactly one binding per actionable entry, dropping non-actionable", () => {
    const nav: string[] = []
    let added = 0
    render(
      <>
        <NavCommandBindings
          entries={[
            route("view-1", "/a"),
            toggleParent("parent"),
            action("add", () => {
              added++
            }),
          ]}
          navigate={(href) => nav.push(href)}
        />
        <Descriptors />
      </>
    )
    expect([...navDescriptorIds].sort()).toEqual(["nav.add", "nav.view-1"])

    act(() => {
      triggerBinding("nav.view-1")
    })
    expect(nav).toEqual(["/a"])
    act(() => {
      triggerBinding("nav.add")
    })
    expect(added).toBe(1)
    act(() => {
      triggerBinding("nav.parent")
    })
    expect(nav).toEqual(["/a"])
    expect(added).toBe(1)
  })

  it("a route binding triggers navigate(href); an action binding triggers onClick", () => {
    const nav: string[] = []
    let clicked = 0
    render(
      <NavCommandBindings
        entries={[
          route("view-1", "/page/1"),
          action("add-view-page", () => {
            clicked++
          }),
        ]}
        navigate={(href) => nav.push(href)}
      />
    )
    act(() => {
      triggerBinding("nav.view-1")
    })
    expect(nav).toEqual(["/page/1"])
    act(() => {
      triggerBinding("nav.add-view-page")
    })
    expect(clicked).toBe(1)
  })

  it("DYNAMIC LIST: removing an entry unregisters exactly its binding; adding one registers it", () => {
    const nav: string[] = []
    const { rerender } = render(
      <NavCommandBindings
        entries={[route("A", "/a"), route("B", "/b")]}
        navigate={(href) => nav.push(href)}
      />
    )
    act(() => {
      triggerBinding("nav.A")
    })
    act(() => {
      triggerBinding("nav.B")
    })
    expect(nav).toEqual(["/a", "/b"])

    rerender(
      <NavCommandBindings entries={[route("A", "/a")]} navigate={(href) => nav.push(href)} />
    )
    nav.length = 0
    act(() => {
      triggerBinding("nav.B")
    })
    expect(nav).toEqual([])
    act(() => {
      triggerBinding("nav.A")
    })
    expect(nav).toEqual(["/a"])

    rerender(
      <NavCommandBindings
        entries={[route("A", "/a"), route("C", "/c")]}
        navigate={(href) => nav.push(href)}
      />
    )
    nav.length = 0
    act(() => {
      triggerBinding("nav.C")
    })
    expect(nav).toEqual(["/c"])
  })
})
