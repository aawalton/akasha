import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { Badge } from "./badge"
import { BadgeLayoutProvider } from "./badge-layout-context"

afterEach(() => {
  cleanup()
})

describe("Badge + BadgeLayoutContext truncation contract", () => {
  it("does not apply max-w-32 when no provider wraps the badge", () => {
    render(<Badge>foo</Badge>)
    const node = screen.getByText("foo")
    expect(node.className).not.toContain("max-w-32")
  })

  it("applies max-w-32 when wrapped in a provider with truncate='fixed'", () => {
    render(
      <BadgeLayoutProvider truncate="fixed">
        <Badge>foo</Badge>
      </BadgeLayoutProvider>
    )
    const node = screen.getByText("foo")
    expect(node.className).toContain("max-w-32")
  })

  it("does not apply max-w-32 when wrapped in a provider with truncate='fluid'", () => {
    render(
      <BadgeLayoutProvider truncate="fluid">
        <Badge>foo</Badge>
      </BadgeLayoutProvider>
    )
    const node = screen.getByText("foo")
    expect(node.className).not.toContain("max-w-32")
  })

  it("left-justifies content (justify-start, not justify-center) when truncate='fixed'", () => {
    render(
      <BadgeLayoutProvider truncate="fixed">
        <Badge>foo</Badge>
      </BadgeLayoutProvider>
    )
    const node = screen.getByText("foo")
    expect(node.className).toContain("justify-start")
    expect(node.className).not.toContain("justify-center")
  })

  it("keeps justify-center when not truncating (truncate='fluid')", () => {
    render(
      <BadgeLayoutProvider truncate="fluid">
        <Badge>foo</Badge>
      </BadgeLayoutProvider>
    )
    const node = screen.getByText("foo")
    expect(node.className).toContain("justify-center")
    expect(node.className).not.toContain("justify-start")
  })
})
