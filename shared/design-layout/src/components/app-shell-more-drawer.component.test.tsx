import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType } from "react"
import { type LayoutLinkProps, LayoutLinkProvider, LayoutRouterProvider } from "../router-context"
import type { MoreDrawerGroup } from "../types/nav-types"
import { AppShellMoreDrawer } from "./app-shell-more-drawer"

afterEach(() => {
  cleanup()
})

const TestLink: ComponentType<LayoutLinkProps> = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

function renderDrawer(groups: readonly MoreDrawerGroup[]) {
  return render(
    <LayoutRouterProvider
      value={{ pathname: "/", searchParams: { get: () => null, toString: () => "" } }}
    >
      <LayoutLinkProvider component={TestLink}>
        <AppShellMoreDrawer open onOpenChange={() => {}} groups={groups} />
      </LayoutLinkProvider>
    </LayoutRouterProvider>
  )
}

describe("AppShellMoreDrawer trailing slot", () => {
  it("renders a top-level item's trailing slot (count badge)", () => {
    renderDrawer([
      {
        items: [
          {
            id: "view-notifications",
            label: "Notifications",
            shortLabel: "Notifications",
            href: "/nav/notifications",
            trailing: <span data-testid="count-badge">1</span>,
          },
        ],
      },
    ])

    expect(screen.getByTestId("count-badge").textContent).toBe("1")
  })
})

describe("AppShellMoreDrawer collapsible item header", () => {
  it("opens the group when the header LABEL is tapped, not just the chevron", () => {
    renderDrawer([
      {
        items: [
          {
            id: "resources",
            label: "Resources",
            shortLabel: "Resources",
            children: [
              { id: "child", label: "Download App", shortLabel: "Download", href: "/watcher" },
            ],
          },
        ],
      },
    ])

    expect(screen.queryByText("Download App")).toBeNull()

    fireEvent.click(screen.getByText("Resources"))

    expect(screen.queryByText("Download App")).not.toBeNull()
  })
})
