import { afterEach, describe, expect, it } from "bun:test"
import { LayoutProvider } from "@shared/design-layout/components/layout-context"
import { LayoutRouterProvider } from "@shared/design-layout/router-context"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { useRef } from "react"
import { PageSystemShell } from "../src/components/page-system-shell"

afterEach(() => {
  cleanup()
})

const TABS = [{ id: "list", label: "Story Chapter", icon: null }] as const

const ROUTER = {
  pathname: "/",
  searchParams: { get: () => null, toString: () => "" },
} as const

function Harness({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}>
      <LayoutRouterProvider value={ROUTER}>
        <LayoutProvider containerRef={ref}>{children}</LayoutProvider>
      </LayoutRouterProvider>
    </div>
  )
}

describe("PageSystemShell header suppression", () => {
  it("renders the page header + heading for a string title (standalone listing)", () => {
    const { container, getByRole } = render(
      <Harness>
        <PageSystemShell title="Story Chapter" tabs={TABS}>
          <div>content</div>
        </PageSystemShell>
      </Harness>
    )
    expect(container.querySelector('[data-slot="page-header"]')).not.toBeNull()
    expect(getByRole("heading", { name: "Story Chapter" })).toBeDefined()
  })

  it("omits the page header entirely for a null title (embedded listing)", () => {
    const { container, queryByRole } = render(
      <Harness>
        <PageSystemShell title={null} tabs={TABS}>
          <div>content</div>
        </PageSystemShell>
      </Harness>
    )
    expect(container.querySelector('[data-slot="page-header"]')).toBeNull()
    expect(queryByRole("heading")).toBeNull()
  })
})
