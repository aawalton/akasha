import { afterEach, describe, expect, it } from "bun:test"
import { __resetKeyboardRegistryForTest } from "@shared/design-primitives/hooks/use-keyboard-registry"
import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import { triggerBinding, useKeyboardBindings } from "@shared/design-primitives/hooks/use-keyboard-registry"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { createRoutesStub, Outlet, useLocation } from "react-router"
import { DynamicNavCommands, NavCommands } from "./nav-commands"

afterEach(() => {
  cleanup()
  __resetKeyboardRegistryForTest()
})

const dynamicEntries: readonly AppNavItem[] = [
  { id: "view-1", label: "Notifications", shortLabel: "Notifications", href: "/nav/notifications" },
  { id: "view-2", label: "Unanswered Questions", shortLabel: "Questions", href: "/nav/questions" },
  { id: "add-view-page", label: "Add Page", shortLabel: "Add", onClick: () => {} },
]

let registeredIds: string[] = []
let currentPath = ""
function Probe() {
  registeredIds = useKeyboardBindings().map((d) => d.id)
  currentPath = useLocation().pathname
  return null
}

function renderBothCommandSets() {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <>
          <NavCommands />
          <DynamicNavCommands entries={dynamicEntries} />
          <Probe />
          <Outlet />
        </>
      ),
      children: [
        { index: true, Component: () => null },
        { path: "nav/notifications", Component: () => null },
      ],
    },
  ])
  render(<Stub initialEntries={["/"]} />)
}

describe("nav commands — static + DB-driven sets in one registry", () => {
  it("registers every actionable dynamic entry under a prefix that cannot collide with the static ids", () => {
    renderBothCommandSets()

    const dynamicIds = registeredIds.filter((id) => id.startsWith("alanwalton.nav.dynamic."))
    expect(dynamicIds).toEqual([
      "alanwalton.nav.dynamic.view-1",
      "alanwalton.nav.dynamic.view-2",
      "alanwalton.nav.dynamic.add-view-page",
    ])

    const staticIds = registeredIds.filter(
      (id) => id.startsWith("alanwalton.nav.") && !id.startsWith("alanwalton.nav.dynamic.")
    )
    expect(staticIds).toContain("alanwalton.nav.home")
    expect(new Set(registeredIds).size).toBe(registeredIds.length)
  })

  it("navigates when a dynamic command is triggered", async () => {
    renderBothCommandSets()
    expect(currentPath).toBe("/")

    await act(async () => {
      triggerBinding("alanwalton.nav.dynamic.view-1")
    })

    expect(currentPath).toBe("/nav/notifications")
  })
})
