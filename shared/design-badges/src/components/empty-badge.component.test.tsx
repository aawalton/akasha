import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { EmptyBadge } from "./empty-badge"

afterEach(() => {
  cleanup()
})

describe("EmptyBadge", () => {
  it("renders the literal string 'Empty'", () => {
    render(<EmptyBadge />)
    expect(screen.getByText("Empty")).toBeDefined()
  })

  it("uses the elevation-muted variant (text-secondary class as the variant marker)", () => {
    render(<EmptyBadge />)
    const node = screen.getByText("Empty")
    expect(node.className).toContain("text-secondary")
  })
})
