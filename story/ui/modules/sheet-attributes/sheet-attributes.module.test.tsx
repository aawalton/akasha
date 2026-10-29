import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
import {
  AttributeSections,
  ScalarRows,
} from "akasha/story/ui/modules/sheet-attributes/sheet-attributes.module.code.tsx"

const ATTRIBUTES = { Strength: 100, Fire: 3, Luck: 7 }

const GROUPS = [
  { title: "Basic Attributes", count: "1/1", names: ["Strength"] },
  { title: "Affinities", count: "1/3", names: ["Fire"] },
]

function headingOf(container: HTMLElement, title: string): HTMLElement {
  const heading = [...container.querySelectorAll("button")].find((one) =>
    (one.textContent ?? "").startsWith(title)
  )
  if (heading === undefined) throw new Error(`no heading ${title}`)
  return heading as HTMLElement
}

test("each group a world names is a section titled as the world titles it, with its count", () => {
  const { container } = render(<AttributeSections attributes={ATTRIBUTES} groups={GROUPS} />)
  const text = container.textContent ?? ""
  expect(text.indexOf("Basic Attributes")).toBeLessThan(text.indexOf("Affinities"))
  expect(text).toContain("1/1")
  expect(text).toContain("1/3")
})

test("an attribute in no group comes under Attributes after the groups", () => {
  const { container } = render(<AttributeSections attributes={ATTRIBUTES} groups={GROUPS} />)
  const text = container.textContent ?? ""
  expect(text.indexOf("Attributes", text.indexOf("Affinities"))).toBeGreaterThan(-1)
  fireEvent.click(headingOf(container, "Attributes"))
  expect(container.textContent).toContain("Luck")
  expect(container.textContent).not.toContain("Strength")
})

test("every section starts closed and opens on its heading", () => {
  const { container } = render(<AttributeSections attributes={ATTRIBUTES} groups={GROUPS} />)
  for (const title of ["Basic Attributes", "Affinities", "Attributes"]) {
    expect(headingOf(container, title).getAttribute("aria-expanded")).toBe("false")
  }
  fireEvent.click(headingOf(container, "Basic Attributes"))
  expect(headingOf(container, "Basic Attributes").getAttribute("aria-expanded")).toBe("true")
  expect(container.textContent).toContain("Strength")
})

test("a row puts its name at the left and its value at the right", () => {
  const { container } = render(<ScalarRows record={{ Health: "40 / 40" }} />)
  const label = [...container.querySelectorAll("span")].find((one) => one.textContent === "Health")
  const row = label?.parentElement
  expect(row?.className).toContain("justify-between")
  expect(row?.firstElementChild?.textContent).toBe("Health")
  expect(row?.lastElementChild?.textContent).toBe("40 / 40")
})
