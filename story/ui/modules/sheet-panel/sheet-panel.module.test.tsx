import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { render } from "@testing-library/react"
import { LayoutRouterProvider } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import type { ClientSheet } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import { SheetTabs } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"

const SHEET: ClientSheet = {
  attributes: { Strength: 100, Stamina: 100, Coordination: 100, Mental: 102, Fire: 3 },
  attributeGroups: [
    {
      title: "Basic Attributes",
      count: "4/4",
      names: ["Strength", "Stamina", "Coordination", "Mental"],
    },
    { title: "Affinities", count: "1/3", names: ["Fire"] },
  ],
  resources: { Health: "40 / 40" },
}

const ROUTED = { pathname: "/", searchParams: new URLSearchParams() }

function drawn() {
  return render(
    <LayoutRouterProvider value={ROUTED}>
      <SheetTabs sheet={SHEET} head={{ caption: null, cover: null }} />
    </LayoutRouterProvider>
  )
}

function rowOf(container: HTMLElement, name: string): HTMLElement | null {
  const label = [...container.querySelectorAll("span")].find((one) => one.textContent === name)
  return label?.parentElement ?? null
}

test("every stats section is one column, each stat on a row of its own", () => {
  const { container } = drawn()
  for (const name of ["Strength", "Stamina", "Coordination", "Mental", "Fire", "Health"]) {
    const rows = rowOf(container, name)?.parentElement
    expect(rows?.className).toContain("flex-col")
    expect(rows?.className).not.toContain("grid-cols-2")
  }
})

test("a stat's name sits at the left of its row and its value at the right", () => {
  const { container } = drawn()
  const row = rowOf(container, "Mental")
  expect(row?.className).toContain("justify-between")
  expect(row?.firstElementChild?.textContent).toBe("Mental")
  expect(row?.lastElementChild?.textContent).toBe("102")
})

test("each attribute group keeps its heading and its count", () => {
  const { container } = drawn()
  const text = container.textContent ?? ""
  expect(text).toContain("Basic Attributes")
  expect(text).toContain("4/4")
  expect(text).toContain("Affinities")
  expect(text).toContain("1/3")
})
