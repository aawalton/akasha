import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType, ReactNode } from "react"
import type { PagesUILinkProps } from "../router-context"
import { PagesUILinkProvider, PagesUIRouterProvider } from "../router-context"
import { DisplayFrame } from "./display-frame"

declare global {
  interface Window {
    happyDOM: { setViewport: (options: { width: number; height?: number }) => void }
  }
}

const StubLink: ComponentType<PagesUILinkProps> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

function Harness({ children }: { children: ReactNode }) {
  return (
    <PagesUIRouterProvider value={{ pathname: "/persona/x", push: () => {}, replace: () => {} }}>
      <PagesUILinkProvider component={StubLink}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

const chromeHidden = () => document.documentElement.hasAttribute("data-chrome-hidden")
const frameFooter = () => document.documentElement.hasAttribute("data-frame-footer")

beforeEach(() => {
  window.happyDOM.setViewport({ width: 390 })
})

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.chromeHidden
  delete document.documentElement.dataset.frameFooter
  window.happyDOM.setViewport({ width: 1024 })
})

describe("DisplayFrame", () => {
  test("renders the display-declared header title, linked, with a back button", () => {
    render(
      <Harness>
        <DisplayFrame
          config={{ focusMode: true }}
          header={{ title: "Zadi", titleHref: "/persona/zadi", showBack: true }}
        >
          <p data-testid="canvas">chat</p>
        </DisplayFrame>
      </Harness>
    )
    expect(screen.getAllByText("Zadi").length).toBeGreaterThan(0)
    const link = screen.getAllByRole("link").find((a) => a.getAttribute("href") === "/persona/zadi")
    expect(link).toBeTruthy()
    expect(screen.getByLabelText("Back")).toBeTruthy()
  })

  test("the sticky header paints surface-0 (flush with the base canvas + safe-area mask)", () => {
    render(
      <Harness>
        <DisplayFrame config={{ focusMode: true }} header={{ title: "Zadi" }}>
          <p>chat</p>
        </DisplayFrame>
      </Harness>
    )
    const header = document.querySelector('[data-slot="frame-sticky-header"]')
    expect(header?.className).toContain("bg-surface-0")
    expect(header?.className).not.toContain("bg-surface-1")
  })

  test("the sticky footer paints surface-0 with a top hairline (mirrors the header)", () => {
    render(
      <Harness>
        <DisplayFrame footer={<div data-testid="composer">input</div>}>
          <p>canvas</p>
        </DisplayFrame>
      </Harness>
    )
    const footer = document.querySelector('[data-slot="frame-sticky-footer"]')
    expect(footer?.className).toContain("bg-surface-0")
    expect(footer?.className).not.toContain("bg-surface-1")
    expect(footer?.className).toContain("border-primary/10")
    expect(footer?.className).toContain("border-t")
  })

  test("a filled footer sets html[data-frame-footer] (displaces the thumb nav)", () => {
    expect(frameFooter()).toBe(false)
    render(
      <Harness>
        <DisplayFrame footer={<div data-testid="composer">input</div>}>
          <p>canvas</p>
        </DisplayFrame>
      </Harness>
    )
    expect(screen.getByTestId("composer")).toBeTruthy()
    expect(frameFooter()).toBe(true)
  })

  test("no footer leaves the thumb nav in place (attribute unset)", () => {
    render(
      <Harness>
        <DisplayFrame>
          <p>canvas</p>
        </DisplayFrame>
      </Harness>
    )
    expect(frameFooter()).toBe(false)
  })

  test("focus mode: tapping the canvas toggles data-chrome-hidden when supported", () => {
    render(
      <Harness>
        <DisplayFrame config={{ focusMode: true }}>
          <p data-testid="canvas">prose</p>
        </DisplayFrame>
      </Harness>
    )
    expect(chromeHidden()).toBe(false)
    fireEvent.click(screen.getByTestId("canvas"))
    expect(chromeHidden()).toBe(true)
    fireEvent.click(screen.getByTestId("canvas"))
    expect(chromeHidden()).toBe(false)
  })

  test("focus mode off: tapping the canvas never toggles", () => {
    render(
      <Harness>
        <DisplayFrame config={{ focusMode: false }}>
          <p data-testid="canvas">prose</p>
        </DisplayFrame>
      </Harness>
    )
    fireEvent.click(screen.getByTestId("canvas"))
    expect(chromeHidden()).toBe(false)
  })
})
