import { describe, expect, it, mock } from "bun:test"
import { act, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { restoreStuckBodyPointerEvents } from "./restore-body-pointer-events"

function flushFrames(): Promise<void> {
  return act(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(resolve, 0)
            })
          })
        })
      })
  )
}

describe("restoreStuckBodyPointerEvents", () => {
  it("clears a stuck `pointer-events: none` on body when no overlay is open", () => {
    document.body.style.pointerEvents = "none"
    restoreStuckBodyPointerEvents()
    expect(document.body.style.pointerEvents).toBe("")
  })

  it("leaves body untouched when an open dialog overlay remains", () => {
    document.body.style.pointerEvents = "none"
    const overlay = document.createElement("div")
    overlay.setAttribute("data-slot", "dialog-content")
    overlay.setAttribute("data-state", "open")
    document.body.appendChild(overlay)
    try {
      restoreStuckBodyPointerEvents()
      expect(document.body.style.pointerEvents).toBe("none")
    } finally {
      overlay.remove()
      document.body.style.pointerEvents = ""
    }
  })

  it("leaves body untouched when a popper overlay (menu/popover) remains open", () => {
    document.body.style.pointerEvents = "none"
    const popper = document.createElement("div")
    popper.setAttribute("data-radix-popper-content-wrapper", "")
    document.body.appendChild(popper)
    try {
      restoreStuckBodyPointerEvents()
      expect(document.body.style.pointerEvents).toBe("none")
    } finally {
      popper.remove()
      document.body.style.pointerEvents = ""
    }
  })

  it("is a no-op when body is not locked", () => {
    document.body.style.pointerEvents = "auto"
    restoreStuckBodyPointerEvents()
    expect(document.body.style.pointerEvents).toBe("auto")
    document.body.style.pointerEvents = ""
  })

  it("ignores a closed dialog overlay still present during its exit animation", () => {
    document.body.style.pointerEvents = "none"
    const closing = document.createElement("div")
    closing.setAttribute("data-slot", "dialog-content")
    closing.setAttribute("data-state", "closed")
    document.body.appendChild(closing)
    try {
      restoreStuckBodyPointerEvents()
      expect(document.body.style.pointerEvents).toBe("")
    } finally {
      closing.remove()
    }
  })
})

describe("Dialog wrapper restores stuck body pointer-events on close", () => {
  it("clears the stuck lock after a Radix-driven close (X / ESC / overlay) and still calls the consumer onOpenChange", async () => {
    const onOpenChange = mock((_open: boolean) => {})
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent showCloseButton>
          <DialogTitle>Rename View</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    document.body.style.pointerEvents = "none"

    fireEvent.click(screen.getByRole("button", { name: "Close" }))
    await flushFrames()

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(document.body.style.pointerEvents).toBe("")
  })

  it("clears the stuck lock on a controlled close that flips `open` directly (Cancel/Save/Delete buttons)", async () => {
    const { rerender } = render(
      <Dialog open onOpenChange={() => {}}>
        <DialogContent showCloseButton>
          <DialogTitle>Rename View</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    document.body.style.pointerEvents = "none"

    rerender(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent showCloseButton>
          <DialogTitle>Rename View</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    await flushFrames()

    expect(document.body.style.pointerEvents).toBe("")
  })
})
