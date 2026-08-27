import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test"
import { type PagesUILinkProps, PagesUILinkProvider, PagesUIRouterProvider } from "@shared/pages-ui/router-context"
import { cleanup, fireEvent } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import type { ComponentType, ReactNode } from "react"

declare global {
  interface Window {
    happyDOM: { setViewport: (options: { width: number; height?: number }) => void }
  }
}

const realApiFetch = await import("../lib/api-fetch")
const realApiFetchFn = realApiFetch.apiFetch
const realBuildApiRequest = realApiFetch.buildApiRequest
let currentApiFetch: typeof realApiFetchFn = realApiFetchFn
mock.module("../lib/api-fetch", () => ({
  apiFetch: (input: string, init?: RequestInit) => currentApiFetch(input, init),
  buildApiRequest: realBuildApiRequest,
}))
beforeAll(() => {
  currentApiFetch = async () => new Response(null, { status: 401 })
})
afterAll(() => {
  currentApiFetch = realApiFetchFn
})

const { default: IdleGame } = await import("./idle-game")

const StubLink: ComponentType<PagesUILinkProps> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

function Harness({ children }: { children: ReactNode }) {
  return (
    <PagesUIRouterProvider value={{ pathname: "/game/idle", push: () => {}, replace: () => {} }}>
      <PagesUILinkProvider component={StubLink}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

const chromeHidden = () => document.documentElement.hasAttribute("data-chrome-hidden")

beforeEach(() => {
  window.happyDOM.setViewport({ width: 390 })
})

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.chromeHidden
  window.happyDOM.setViewport({ width: 1024 })
})

describe("IdleGame — DisplayFrame adoption (#15552)", () => {
  it("renders the game title in the frame's sticky header, with a back button", () => {
    const { container } = render(
      <Harness>
        <IdleGame title="Idle Ranks" />
      </Harness>
    )
    const view = within(container)
    const heading = view.getAllByRole("heading", { name: "Idle Ranks" })[0]
    expect(heading).toBeDefined()
    const header = heading?.closest("header")
    expect(header?.dataset.slot).toBe("frame-sticky-header")
    expect(header?.className).toContain("sticky")
    expect(view.getByLabelText("Back")).toBeTruthy()
  })

  it("falls back to 'Idle' when the row carries no title", () => {
    const { container } = render(
      <Harness>
        <IdleGame title={null} />
      </Harness>
    )
    expect(within(container).getAllByText("Idle").length).toBeGreaterThan(0)
  })

  it("keeps the header always visible — a canvas tap never toggles chrome (focusMode off)", () => {
    const { container } = render(
      <Harness>
        <IdleGame title="Idle Ranks" />
      </Harness>
    )
    const canvas = container.querySelector("article")
    expect(canvas).toBeTruthy()
    expect(chromeHidden()).toBe(false)
    if (canvas != null) fireEvent.click(canvas)
    expect(chromeHidden()).toBe(false)
  })
})
