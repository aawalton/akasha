import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { useChromeToggle } from "./use-chrome-toggle"

declare global {
  interface Window {
    happyDOM: { setViewport: (options: { width: number; height?: number }) => void }
  }
}
function setViewport(isDesktop: boolean) {
  window.happyDOM.setViewport({ width: isDesktop ? 1024 : 390 })
}

function Surface() {
  const { onSurfaceClick } = useChromeToggle()
  return (
    <article data-testid="surface" onClick={onSurfaceClick}>
      <p data-testid="prose">Non-interactive prose.</p>
      <button type="button" data-testid="control">
        Play
      </button>
      <div data-testid="board" data-chrome-toggle-ignore>
        <span data-testid="board-inner">drag board</span>
      </div>
    </article>
  )
}

const chromeHidden = () => document.documentElement.hasAttribute("data-chrome-hidden")

beforeEach(() => {
  setViewport(false)
})

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.chromeHidden
  window.happyDOM.setViewport({ width: 1024 })
})

describe("useChromeToggle — game-surface tap guard", () => {
  test("tap on a non-interactive area toggles chrome on, then off", () => {
    render(<Surface />)
    expect(chromeHidden()).toBe(false)
    fireEvent.click(screen.getByTestId("prose"))
    expect(chromeHidden()).toBe(true)
    fireEvent.click(screen.getByTestId("prose"))
    expect(chromeHidden()).toBe(false)
  })

  test("tap on an interactive control (button) never toggles", () => {
    render(<Surface />)
    fireEvent.click(screen.getByTestId("control"))
    expect(chromeHidden()).toBe(false)
  })

  test("tap on a data-chrome-toggle-ignore region (game board) never toggles", () => {
    render(<Surface />)
    fireEvent.click(screen.getByTestId("board"))
    expect(chromeHidden()).toBe(false)
    fireEvent.click(screen.getByTestId("board-inner"))
    expect(chromeHidden()).toBe(false)
  })

  test("desktop viewport (>=584px) never toggles", () => {
    setViewport(true)
    render(<Surface />)
    fireEvent.click(screen.getByTestId("prose"))
    expect(chromeHidden()).toBe(false)
  })
})
