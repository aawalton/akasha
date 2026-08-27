import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { Badge, badgeVariants } from "./badge"
import { BadgeLayoutProvider } from "./badge-layout-context"
import { ButtonBadge } from "./button-badge"
import { LinkBadge } from "./link-badge"

afterEach(() => {
  cleanup()
})

function classTokens(className: string): readonly string[] {
  return className.split(/\s+/)
}

describe("Badge cursor + selection contract", () => {
  describe("non-interactive Badge", () => {
    it("renders a <span> with cursor-default and select-text classes", () => {
      render(<Badge>label</Badge>)
      const badge = screen.getByText("label")
      expect(badge.tagName).toBe("SPAN")
      expect(badge.className).toContain("cursor-default")
      expect(badge.className).toContain("select-text")
    })

    it("does not apply select-none (would block drag/double-click selection)", () => {
      render(<Badge>label</Badge>)
      const badge = screen.getByText("label")
      expect(badge.className).not.toContain("select-none")
    })
  })

  describe("ButtonBadge", () => {
    it("renders a <button> with cursor-pointer", () => {
      render(<ButtonBadge>label</ButtonBadge>)
      const button = screen.getByRole("button", { name: "label" })
      expect(button.tagName).toBe("BUTTON")
      expect(button.className).toContain("cursor-pointer")
    })

    it("keeps select-text so drag-select still copies the label", () => {
      render(<ButtonBadge>label</ButtonBadge>)
      const button = screen.getByRole("button", { name: "label" })
      expect(button.className).toContain("select-text")
      expect(button.className).not.toContain("select-none")
    })

    it("calls preventDefault on mousedown when detail >= 2 (suppress word-select on double-click)", () => {
      render(<ButtonBadge>label</ButtonBadge>)
      const button = screen.getByRole("button", { name: "label" })
      const notCanceled = fireEvent.mouseDown(button, { detail: 2 })
      expect(notCanceled).toBe(false)
    })

    it("does NOT preventDefault on a single-click mousedown (drag-select still starts)", () => {
      render(<ButtonBadge>label</ButtonBadge>)
      const button = screen.getByRole("button", { name: "label" })
      const notCanceled = fireEvent.mouseDown(button, { detail: 1 })
      expect(notCanceled).toBe(true)
    })

    it("chains the consumer's onMouseDown for both single and double click", () => {
      const handleMouseDown = mock(() => {})
      render(<ButtonBadge onMouseDown={handleMouseDown}>label</ButtonBadge>)
      const button = screen.getByRole("button", { name: "label" })
      fireEvent.mouseDown(button, { detail: 1 })
      fireEvent.mouseDown(button, { detail: 2 })
      expect(handleMouseDown).toHaveBeenCalledTimes(2)
    })

    it("still fires onClick for a single click", () => {
      const handleClick = mock(() => {})
      render(<ButtonBadge onClick={handleClick}>label</ButtonBadge>)
      fireEvent.click(screen.getByRole("button", { name: "label" }))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("interactive affordance (rest/press distinction)", () => {
    const tintCases = [
      ["accent", "accent"],
      ["normal", "primary"],
      ["fine", "fine"],
      ["superior", "superior"],
      ["epic", "epic"],
      ["legendary", "legendary"],
      ["mythic", "mythic"],
      ["radiant", "radiant"],
      ["green", "green"],
      ["blue", "blue"],
      ["purple", "purple"],
      ["yellow", "yellow"],
      ["orange", "orange"],
      ["red", "red"],
    ] as const

    it("ButtonBadge carries the gated weight cue and /35 press fill, with no rest-fill strengthening", () => {
      render(<ButtonBadge variant="blue">label</ButtonBadge>)
      const tokens = classTokens(screen.getByRole("button", { name: "label" }).className)
      expect(tokens).toContain("[button&]:font-semibold")
      expect(tokens).toContain("bg-blue/15")
      expect(tokens).not.toContain("[button&]:bg-blue/25")
      expect(tokens).toContain("[button&]:active:bg-blue/35")
    })

    it("rest and press are distinct states — the press fill is gated behind active:", () => {
      render(<ButtonBadge variant="blue">label</ButtonBadge>)
      const tokens = classTokens(screen.getByRole("button", { name: "label" }).className)
      expect(tokens.filter((t) => t === "bg-blue/15")).toHaveLength(1)
      expect(tokens.filter((t) => t === "[button&]:active:bg-blue/35")).toHaveLength(1)
      expect(tokens).not.toContain("[button&]:bg-blue/35")
    })

    it("LinkBadge carries the [a&] twins of the treatment", () => {
      render(
        <LinkBadge href="/dest" variant="blue">
          label
        </LinkBadge>
      )
      const tokens = classTokens(screen.getByRole("link", { name: "label" }).className)
      expect(tokens).toContain("[a&]:font-semibold")
      expect(tokens).not.toContain("[a&]:bg-blue/25")
      expect(tokens).toContain("[a&]:active:bg-blue/35")
    })

    it("static Badge keeps the /15 fill and carries no ungated interactive token", () => {
      render(<Badge variant="blue">label</Badge>)
      const badge = screen.getByText("label")
      expect(badge.tagName).toBe("SPAN")
      const tokens = classTokens(badge.className)
      expect(tokens).toContain("bg-blue/15")
      expect(tokens).not.toContain("font-semibold")
      expect(tokens).not.toContain("bg-blue/25")
      expect(tokens).not.toContain("active:bg-blue/35")
    })

    it("every tint variant shares the /15 rest fill and declares the press fill for both button and anchor", () => {
      for (const [variant, color] of tintCases) {
        const tokens = classTokens(badgeVariants({ variant }))
        expect(tokens).toContain(`bg-${color}/15`)
        for (const gate of ["button&", "a&"] as const) {
          expect(tokens).not.toContain(`[${gate}]:bg-${color}/25`)
          expect(tokens).toContain(`[${gate}]:active:bg-${color}/35`)
        }
      }
    })

    it("non-tint variants keep their rest bg and gain only the press wash", () => {
      for (const variant of ["elevation", "elevation-muted", "surface", "destructive"] as const) {
        const tokens = classTokens(badgeVariants({ variant }))
        expect(tokens).toContain("[button&]:active:bg-primary/15")
        expect(tokens).toContain("[a&]:active:bg-primary/15")
        expect(
          tokens.some((t) => t === "[button&]:bg-primary/25" || t === "[a&]:bg-primary/25")
        ).toBe(false)
      }
    })

    it("keeps the hoisted hover wash in the base (check-component-layout boundary signal)", () => {
      const tokens = classTokens(badgeVariants({}))
      expect(tokens).toContain("[button&]:hover:bg-primary/8")
      expect(tokens).toContain("[a&]:hover:bg-primary/8")
    })
  })

  describe("LinkBadge", () => {
    it("renders an <a> with cursor-pointer and select-text", () => {
      render(<LinkBadge href="/dest">label</LinkBadge>)
      const link = screen.getByRole("link", { name: "label" })
      expect(link.tagName).toBe("A")
      expect(link.className).toContain("cursor-pointer")
      expect(link.className).toContain("select-text")
    })

    it("calls preventDefault on mousedown when detail >= 2", () => {
      render(<LinkBadge href="/dest">label</LinkBadge>)
      const link = screen.getByRole("link", { name: "label" })
      const notCanceled = fireEvent.mouseDown(link, { detail: 2 })
      expect(notCanceled).toBe(false)
    })

    it("does NOT preventDefault on a single-click mousedown", () => {
      render(<LinkBadge href="/dest">label</LinkBadge>)
      const link = screen.getByRole("link", { name: "label" })
      const notCanceled = fireEvent.mouseDown(link, { detail: 1 })
      expect(notCanceled).toBe(true)
    })

    it("chains the consumer's onMouseDown for both single and double click", () => {
      const handleMouseDown = mock(() => {})
      render(
        <LinkBadge href="/dest" onMouseDown={handleMouseDown}>
          label
        </LinkBadge>
      )
      const link = screen.getByRole("link", { name: "label" })
      fireEvent.mouseDown(link, { detail: 1 })
      fireEvent.mouseDown(link, { detail: 2 })
      expect(handleMouseDown).toHaveBeenCalledTimes(2)
    })
  })
})

describe("Badge layout-context icon (#14140)", () => {
  it("renders the context icon as a direct child of the badge root", () => {
    render(
      <BadgeLayoutProvider icon={<svg data-testid="ctx-icon" role="img" aria-label="icon" />}>
        <Badge>label</Badge>
      </BadgeLayoutProvider>
    )
    const badge = screen.getByText("label")
    const icon = screen.getByTestId("ctx-icon")
    expect(icon.parentElement).toBe(badge)
    expect(badge.firstElementChild).toBe(icon)
  })

  it("skips the context icon in inline display mode (no chip chrome, no svg slot)", () => {
    render(
      <BadgeLayoutProvider display="inline" icon={<svg data-testid="ctx-icon" />}>
        <Badge>label</Badge>
      </BadgeLayoutProvider>
    )
    expect(screen.queryByTestId("ctx-icon")).toBeNull()
  })

  it("renders no icon when the context provides none", () => {
    render(
      <BadgeLayoutProvider>
        <Badge>label</Badge>
      </BadgeLayoutProvider>
    )
    const badge = screen.getByText("label")
    expect(badge.querySelector("svg")).toBeNull()
  })
})
