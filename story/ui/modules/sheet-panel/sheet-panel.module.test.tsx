import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
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

function headingOf(container: HTMLElement, title: string): HTMLElement {
  const heading = [...container.querySelectorAll("[data-slot=card] button")].find((one) =>
    (one.textContent ?? "").startsWith(title)
  )
  if (heading === undefined) throw new Error(`no heading ${title}`)
  return heading as HTMLElement
}

test("the stats tab holds one panel and every stats section sits in it", () => {
  const { container } = drawn()
  const cards = container.querySelectorAll("[data-slot=card]")
  expect(cards.length).toBe(1)
  const panel = cards[0]
  expect(panel?.textContent).toContain("Stats")
  for (const title of ["Resources", "Basic Attributes", "Affinities"]) {
    expect(panel?.contains(headingOf(container, title))).toBe(true)
  }
})

test("every stats section starts closed, as a Temper completion panel's group does", () => {
  const { container } = drawn()
  for (const title of ["Resources", "Basic Attributes", "Affinities"]) {
    expect(headingOf(container, title).getAttribute("aria-expanded")).toBe("false")
  }
  expect(container.textContent).not.toContain("Strength")
})

test("a section's heading carries its count in the accent and a chevron", () => {
  const { container } = drawn()
  const heading = headingOf(container, "Basic Attributes")
  const count = heading.querySelector("span.text-accent")
  expect(count?.textContent).toBe("4/4")
  expect(count?.className).toContain("font-mono")
  expect(heading.querySelector("svg")).not.toBeNull()
})

test("a section opens to its rows and folds them away again", () => {
  const { container } = drawn()
  const heading = headingOf(container, "Basic Attributes")
  fireEvent.click(heading)
  expect(heading.getAttribute("aria-expanded")).toBe("true")
  expect(container.textContent).toContain("Strength")
  fireEvent.click(heading)
  expect(heading.getAttribute("aria-expanded")).toBe("false")
  expect(container.textContent).not.toContain("Strength")
})

test("every stat sits on a row of its own in one column across the panel", () => {
  const { container } = drawn()
  for (const title of ["Resources", "Basic Attributes", "Affinities"]) {
    fireEvent.click(headingOf(container, title))
  }
  for (const name of ["Strength", "Stamina", "Coordination", "Mental", "Fire", "Health"]) {
    const rows = rowOf(container, name)?.parentElement
    expect(rows?.className).toContain("flex-col")
    expect(rows?.className).not.toContain("grid-cols-2")
  }
})

test("a stat's name sits at the left of its row and its value at the right", () => {
  const { container } = drawn()
  fireEvent.click(headingOf(container, "Basic Attributes"))
  const row = rowOf(container, "Mental")
  expect(row?.className).toContain("justify-between")
  expect(row?.className).toContain("pl-6")
  expect(row?.firstElementChild?.textContent).toBe("Mental")
  expect(row?.lastElementChild?.textContent).toBe("102")
})

test("a heading is the same gap from its first row as two rows are apart", () => {
  const { container } = drawn()
  fireEvent.click(headingOf(container, "Basic Attributes"))
  const heading = headingOf(container, "Basic Attributes")
  const section = heading.parentElement
  expect(section?.className).toContain("flex-col")
  expect(section?.className).toContain("gap-1")
  const rows = rowOf(container, "Strength")?.parentElement
  expect(rows?.className).toContain("gap-1")
})
