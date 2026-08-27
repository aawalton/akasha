import { describe, expect, it, mock } from "bun:test"
import { fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { Button } from "./button"
import { SurfaceProvider } from "./surface-provider"

describe("Button", () => {
  it("renders a <button> with the given children and the data-slot identifier", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button.tagName).toBe("BUTTON")
    expect(button.dataset.slot).toBe("button")
  })

  it("fires onClick when the user clicks an enabled button", () => {
    const handleClick = mock(() => {})
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button", { name: "Click me" }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("does not fire onClick when disabled", () => {
    const handleClick = mock(() => {})
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )
    fireEvent.click(screen.getByRole("button", { name: "Click me" }))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it("renders the child element directly when asChild is set, preserving its attributes", () => {
    render(
      <Button asChild>
        <a href="/dest">Go</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "Go" })
    expect(link.tagName).toBe("A")
    expect(link.getAttribute("href")).toBe("/dest")
    expect(link.dataset.slot).toBe("button")
  })

  describe("surface stepping", () => {
    it("steps one level above the ambient surface for solid-background variants", () => {
      render(
        <SurfaceProvider level={2} background={false}>
          <Button variant="primary">P</Button>
        </SurfaceProvider>
      )
      expect(screen.getByRole("button").className).toContain("bg-surface-3")
    })

    it("opts out of surface stepping for tertiary", () => {
      render(
        <SurfaceProvider level={2} background={false}>
          <Button variant="tertiary">T</Button>
        </SurfaceProvider>
      )
      expect(screen.getByRole("button").className).not.toMatch(/\bbg-surface-\d/)
    })
  })
})
