import { afterEach, describe, expect, test } from "bun:test"
import { LayoutRouterProvider } from "@shared/design-layout/router-context"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ClientSheet } from "../lib/client-session"
import { SheetPanel } from "./sheet-panel"

afterEach(() => {
  cleanup()
})

const ROUTER = { pathname: "/", searchParams: new URLSearchParams() }

const SHEET: ClientSheet = {
  name: "Vael",
  kind: "Seeker",
  level: 3,
  attributes: { Might: 4 },
}

describe("SheetPanel — surface elevation (paint-and-provide)", () => {
  test("tabs list renders one level above the level-1 card (surface 2, not 1)", () => {
    render(
      <LayoutRouterProvider value={ROUTER}>
        <SurfaceProvider level={0}>
          <SheetPanel sheet={SHEET} />
        </SurfaceProvider>
      </LayoutRouterProvider>
    )
    const tablist = screen.getByRole("tablist")
    expect(tablist.className).toContain("bg-surface-2")
    expect(tablist.className).not.toContain("bg-surface-1")
  })
})

describe("SheetPanel — Equipped section (Items tab)", () => {
  const EQUIPPED: ClientSheet = {
    name: "Vael",
    attributes: { INTELLECT: 4 },
    equipment: { armor: { name: "Leather Vest" } },
  }

  test("Items tab surfaces the Equipped section with item name and slot", () => {
    render(
      <LayoutRouterProvider value={ROUTER}>
        <SurfaceProvider level={0}>
          <SheetPanel sheet={EQUIPPED} />
        </SurfaceProvider>
      </LayoutRouterProvider>
    )
    fireEvent.click(screen.getByRole("tab", { name: "Items" }))
    expect(screen.getByText("Equipped")).toBeDefined()
    expect(screen.getByText("Leather Vest")).toBeDefined()
    expect(screen.getByText("armor")).toBeDefined()
  })
})
