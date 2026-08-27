import { describe, expect, it } from "bun:test"
import { screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"

describe("design-system smoke", () => {
  it("renders a basic element", () => {
    render(<div data-testid="smoke">hello</div>)
    expect(screen.getByTestId("smoke").textContent).toBe("hello")
  })
})
