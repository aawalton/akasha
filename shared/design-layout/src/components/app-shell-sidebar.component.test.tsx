import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType } from "react"
import { SidebarStateContext } from "../hooks/use-sidebar-state"
import { type LayoutLinkProps, LayoutLinkProvider, LayoutRouterProvider } from "../router-context"
import type { AppNavConfig } from "../types/nav-types"
import { AppShellSidebar } from "./app-shell-sidebar"

afterEach(() => {
  cleanup()
})

const TestLink: ComponentType<LayoutLinkProps> = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const sidebarState = {
  isCollapsed: false,
  isHydrated: true,
  isHidden: false,
  isForcedCollapsed: false,
  effectiveIsCollapsed: false,
  toggleCollapsed: () => {},
  setCollapsed: () => {},
}

function renderSidebar(config: AppNavConfig) {
  return render(
    <LayoutRouterProvider
      value={{ pathname: "/", searchParams: { get: () => null, toString: () => "" } }}
    >
      <LayoutLinkProvider component={TestLink}>
        <SidebarStateContext.Provider value={sidebarState}>
          <AppShellSidebar config={config} />
        </SidebarStateContext.Provider>
      </LayoutLinkProvider>
    </LayoutRouterProvider>
  )
}

describe("AppShellSidebar collapsible group header", () => {
  const groupWithoutHref = {
    id: "resources",
    label: "Resources",
    shortLabel: "Resources",
    children: [{ id: "child", label: "Download App", shortLabel: "Download", href: "/watcher" }],
  }

  it("opens the group when the header LABEL is clicked, not just the chevron", () => {
    renderSidebar({ primaryItems: [groupWithoutHref], brandLabel: "TEST" })

    expect(screen.queryByText("Download App")).toBeNull()

    fireEvent.click(screen.getByText("Resources"))

    expect(screen.queryByText("Download App")).not.toBeNull()
  })

  it("exposes the hrefless header as a real button announcing its expanded state", () => {
    renderSidebar({ primaryItems: [groupWithoutHref], brandLabel: "TEST" })

    const header = screen.getByText("Resources").closest("button")
    expect(header).not.toBeNull()
    expect(header?.getAttribute("aria-expanded")).toBe("false")

    fireEvent.click(screen.getByText("Resources"))

    expect(header?.getAttribute("aria-expanded")).toBe("true")
  })

  it("keeps a group header WITH an href a navigating link", () => {
    renderSidebar({
      primaryItems: [
        {
          id: "parent",
          label: "Parent",
          shortLabel: "Parent",
          href: "/parent",
          children: [{ id: "kid", label: "Kid", shortLabel: "Kid", href: "/kid" }],
        },
      ],
      brandLabel: "TEST",
    })

    const header = screen.getByText("Parent").closest("a")
    expect(header?.getAttribute("href")).toBe("/parent")
  })
})
