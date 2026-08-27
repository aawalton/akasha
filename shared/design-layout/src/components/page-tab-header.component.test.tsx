import { afterEach, describe, expect, it } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PageTabHeader } from "./page-tab-header"

afterEach(() => {
  cleanup()
})

function hasHiddenAncestorWithin(el: Element, root: Element): boolean {
  let node: Element | null = el
  while (node != null && node !== root) {
    if (node.className.split(" ").includes("hidden")) return true
    node = node.parentElement
  }
  return false
}

describe("PageTabHeader mobile title hide", () => {
  it("hides only the h2 on mobile; count badge and toolbar stay visible", () => {
    const { container, getByText, getByTestId } = render(
      <PageTabHeader title="Story Chapter" titleTrailing={<span data-testid="count">3</span>}>
        <button type="button" data-testid="tool">
          Tool
        </button>
      </PageTabHeader>
    )

    const heading = getByText("Story Chapter")
    expect(heading.tagName).toBe("H2")
    expect(heading.className).toContain("hidden")
    expect(heading.className).toContain("sm:block")

    expect(hasHiddenAncestorWithin(getByTestId("count"), container)).toBe(false)

    expect(hasHiddenAncestorWithin(getByTestId("tool"), container)).toBe(false)
  })
})
