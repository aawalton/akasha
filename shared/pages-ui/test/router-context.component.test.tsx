import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType } from "react"
import { PagesUILink, type PagesUILinkProps, PagesUILinkProvider, type PagesUIRouter, PagesUIRouterProvider, usePagesUIRouter } from "../src/router-context"

afterEach(() => {
  cleanup()
})

function CapturedRouterPathname() {
  const { pathname } = usePagesUIRouter()
  return <span data-testid="pathname">{pathname}</span>
}

function ClickPushButton({ href }: { href: string }) {
  const { push } = usePagesUIRouter()
  return (
    <button type="button" onClick={() => push(href)}>
      go
    </button>
  )
}

function ClickReplaceButton({ href }: { href: string }) {
  const { replace } = usePagesUIRouter()
  return (
    <button type="button" onClick={() => replace(href)}>
      go
    </button>
  )
}

describe("PagesUIRouterProvider + usePagesUIRouter", () => {
  it("exposes the supplied pathname to descendants", () => {
    const value: PagesUIRouter = { pathname: "/projects", push: () => {}, replace: () => {} }
    render(
      <PagesUIRouterProvider value={value}>
        <CapturedRouterPathname />
      </PagesUIRouterProvider>
    )
    expect(screen.getByTestId("pathname").textContent).toBe("/projects")
  })

  it("forwards push(href) to the supplied callback", () => {
    let pushed: string | null = null
    const value: PagesUIRouter = {
      pathname: "/",
      push: (href) => {
        pushed = href
      },
      replace: () => {},
    }
    render(
      <PagesUIRouterProvider value={value}>
        <ClickPushButton href="/destination" />
      </PagesUIRouterProvider>
    )
    fireEvent.click(screen.getByRole("button"))
    expect(pushed).toBe("/destination")
  })

  it("forwards replace(href) to the supplied callback", () => {
    let replaced: string | null = null
    const value: PagesUIRouter = {
      pathname: "/",
      push: () => {},
      replace: (href) => {
        replaced = href
      },
    }
    render(
      <PagesUIRouterProvider value={value}>
        <ClickReplaceButton href="/destination?x=1" />
      </PagesUIRouterProvider>
    )
    fireEvent.click(screen.getByRole("button"))
    expect(replaced).toBe("/destination?x=1")
  })

  it("throws a clear error when used outside a Provider", () => {
    const originalConsoleError = console.error
    console.error = () => {}
    try {
      expect(() => render(<CapturedRouterPathname />)).toThrow(/PagesUIRouterProvider/)
    } finally {
      console.error = originalConsoleError
    }
  })
})

describe("PagesUILinkProvider + PagesUILink", () => {
  it("renders the host-supplied Link with the given props", () => {
    let receivedHref: string | null = null
    const HostLink: ComponentType<PagesUILinkProps> = ({ href, className, children }) => {
      receivedHref = href
      return (
        <a data-testid="host-link" className={className} href={href}>
          {children}
        </a>
      )
    }
    render(
      <PagesUILinkProvider component={HostLink}>
        <PagesUILink href="/somewhere" className="link-class">
          <span>label</span>
        </PagesUILink>
      </PagesUILinkProvider>
    )
    const anchor = screen.getByTestId("host-link")
    expect(receivedHref).toBe("/somewhere")
    expect(anchor.getAttribute("class")).toBe("link-class")
    expect(anchor.textContent).toBe("label")
  })

  it("forwards aria-current verbatim", () => {
    const HostLink: ComponentType<PagesUILinkProps> = ({ href, children, ...rest }) => (
      <a data-testid="host-link" href={href} aria-current={rest["aria-current"]}>
        {children}
      </a>
    )
    render(
      <PagesUILinkProvider component={HostLink}>
        <PagesUILink href="/x" aria-current="page">
          x
        </PagesUILink>
      </PagesUILinkProvider>
    )
    expect(screen.getByTestId("host-link").getAttribute("aria-current")).toBe("page")
  })

  it("throws a clear error when used outside a Provider", () => {
    const originalConsoleError = console.error
    console.error = () => {}
    try {
      expect(() => render(<PagesUILink href="/x">x</PagesUILink>)).toThrow(/PagesUILinkProvider/)
    } finally {
      console.error = originalConsoleError
    }
  })
})

describe("Provider pairing — each context is independent", () => {
  it("having only the router Provider does not satisfy <PagesUILink>", () => {
    const router: PagesUIRouter = { pathname: "/", push: () => {}, replace: () => {} }
    const originalConsoleError = console.error
    console.error = () => {}
    try {
      expect(() =>
        render(
          <PagesUIRouterProvider value={router}>
            <PagesUILink href="/x">x</PagesUILink>
          </PagesUIRouterProvider>
        )
      ).toThrow(/PagesUILinkProvider/)
    } finally {
      console.error = originalConsoleError
    }
  })

  it("having only the link Provider does not satisfy usePagesUIRouter", () => {
    const HostLink: ComponentType<PagesUILinkProps> = ({ href, children }) => (
      <a href={href}>{children}</a>
    )
    const originalConsoleError = console.error
    console.error = () => {}
    try {
      expect(() =>
        render(
          <PagesUILinkProvider component={HostLink}>
            <CapturedRouterPathname />
          </PagesUILinkProvider>
        )
      ).toThrow(/PagesUIRouterProvider/)
    } finally {
      console.error = originalConsoleError
    }
  })
})
