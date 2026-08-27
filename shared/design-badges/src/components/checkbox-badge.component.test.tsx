import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { CheckboxBadge } from "./checkbox-badge"

afterEach(() => {
  cleanup()
})

describe("CheckboxBadge accessibility contract", () => {
  describe("interactive (onChange provided)", () => {
    it("exposes role='checkbox' with aria-checked reflecting the checked prop", () => {
      const { rerender } = render(
        <CheckboxBadge checked={false} onChange={() => {}} aria-label="Visible on card" />
      )
      const node = screen.getByRole("checkbox", { name: "Visible on card" })
      expect(node.getAttribute("aria-checked")).toBe("false")
      rerender(<CheckboxBadge checked={true} onChange={() => {}} aria-label="Visible on card" />)
      expect(
        screen.getByRole("checkbox", { name: "Visible on card" }).getAttribute("aria-checked")
      ).toBe("true")
    })

    it("is keyboard-focusable (tabIndex 0) and not aria-readonly", () => {
      render(<CheckboxBadge checked={false} onChange={() => {}} aria-label="x" />)
      const node = screen.getByRole("checkbox", { name: "x" })
      expect(node.getAttribute("tabindex")).toBe("0")
      expect(node.hasAttribute("aria-readonly")).toBe(false)
    })

    it("Space toggles via onChange and prevents default scroll", () => {
      const onChange = mock((_next: boolean) => {})
      render(<CheckboxBadge checked={false} onChange={onChange} aria-label="x" />)
      const node = screen.getByRole("checkbox", { name: "x" })
      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true })
      const dispatched = node.dispatchEvent(event)
      expect(onChange).toHaveBeenCalledTimes(1)
      const [firstCall] = onChange.mock.calls
      expect(firstCall?.[0]).toBe(true)
      expect(dispatched).toBe(false)
    })

    it("Enter toggles via onChange", () => {
      const onChange = mock((_next: boolean) => {})
      render(<CheckboxBadge checked={true} onChange={onChange} aria-label="x" />)
      const node = screen.getByRole("checkbox", { name: "x" })
      fireEvent.keyDown(node, { key: "Enter" })
      expect(onChange).toHaveBeenCalledTimes(1)
      const [firstCall] = onChange.mock.calls
      expect(firstCall?.[0]).toBe(false)
    })

    it("ignores other keys (e.g. ArrowDown does not toggle)", () => {
      const onChange = mock((_next: boolean) => {})
      render(<CheckboxBadge checked={false} onChange={onChange} aria-label="x" />)
      const node = screen.getByRole("checkbox", { name: "x" })
      fireEvent.keyDown(node, { key: "ArrowDown" })
      expect(onChange).not.toHaveBeenCalled()
    })

    it("click still toggles via onChange (unchanged behaviour)", () => {
      const onChange = mock((_next: boolean) => {})
      render(<CheckboxBadge checked={false} onChange={onChange} aria-label="x" />)
      fireEvent.click(screen.getByRole("checkbox", { name: "x" }))
      expect(onChange).toHaveBeenCalledTimes(1)
      const [firstCall] = onChange.mock.calls
      expect(firstCall?.[0]).toBe(true)
    })
  })

  describe("read-only (no onChange)", () => {
    it("exposes role='checkbox' with aria-checked and aria-readonly='true'", () => {
      render(<CheckboxBadge checked={true} aria-label="Foo" />)
      const node = screen.getByRole("checkbox", { name: "Foo" })
      expect(node.getAttribute("aria-checked")).toBe("true")
      expect(node.getAttribute("aria-readonly")).toBe("true")
    })

    it("is not keyboard-focusable (no tabIndex 0)", () => {
      render(<CheckboxBadge checked={false} aria-label="Foo" />)
      const node = screen.getByRole("checkbox", { name: "Foo" })
      expect(node.getAttribute("tabindex")).not.toBe("0")
    })

    it("does not invoke any handler on Space", () => {
      render(<CheckboxBadge checked={false} aria-label="Foo" />)
      const node = screen.getByRole("checkbox", { name: "Foo" })
      fireEvent.keyDown(node, { key: " " })
    })
  })
})
