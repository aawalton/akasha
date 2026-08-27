import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PageResolverProvider, type PageResolverValue } from "../src/contexts/page-resolver"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { RelationPropertyBadge } from "../src/property-types/relation"
import type { PropertyValue } from "../src/property-types/types"
import { requireAnchor } from "./dom-helpers"

const PAGE_1: PropertyValue = "page-1"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "rel",
  title: "Rel",
  type: "relation",
  config: {},
}

const PAGES = [
  { id: "page-1", title: "Page One" },
  { id: "page-2", title: "Page Two" },
]

function makeResolver(): PageResolverValue {
  return {
    resolve: (id) => PAGES.find((p) => p.id === id) ?? null,
    listPages: () => PAGES,
  }
}

function renderWithResolver(node: React.ReactNode) {
  return render(<PageResolverProvider value={makeResolver()}>{node}</PageResolverProvider>)
}

describe("RelationPropertyBadge — card context", () => {
  it("renders the resolved page name and calls onPageNavigate on click", () => {
    const onPageNavigate = mock((_id: string) => {})

    renderWithResolver(
      <RelationPropertyBadge
        property={definition}
        value={PAGE_1}
        context="card"
        onPageNavigate={onPageNavigate}
      />
    )

    expect(screen.getByText("Page One")).toBeDefined()

    fireEvent.click(screen.getByRole("button"))
    expect(onPageNavigate).toHaveBeenCalledTimes(1)
    expect(onPageNavigate).toHaveBeenCalledWith("page-1")
  })

  it("renders a LinkBadge (anchor) with href when pageHref is provided and does not call onPageNavigate", () => {
    const onPageNavigate = mock((_id: string) => {})
    const pageHref = (id: string) => `/p/${id}`

    const { container } = renderWithResolver(
      <RelationPropertyBadge
        property={definition}
        value={PAGE_1}
        context="card"
        onPageNavigate={onPageNavigate}
        pageHref={pageHref}
      />
    )

    const anchor = requireAnchor(container, "a")
    expect(anchor.getAttribute("href")).toBe("/p/page-1")
    expect(screen.getByText("Page One")).toBeDefined()

    fireEvent.click(anchor)
    expect(onPageNavigate).not.toHaveBeenCalled()
  })

  it("returns null when value is null", () => {
    const { container } = renderWithResolver(
      <RelationPropertyBadge property={definition} value={null} context="card" />
    )
    expect(container.querySelector("a")).toBeNull()
    expect(container.querySelector("button")).toBeNull()
  })

  it("falls back to the bare id when no resolver is provided", () => {
    const onPageNavigate = mock((_id: string) => {})

    render(
      <RelationPropertyBadge
        property={definition}
        value={PAGE_1}
        context="card"
        onPageNavigate={onPageNavigate}
      />
    )
    expect(screen.getByText("page-1")).toBeDefined()
  })
})

describe("RelationPropertyBadge — detail context, editable", () => {
  it("opens popover and forwards adds to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    renderWithResolver(
      <RelationPropertyBadge
        property={definition}
        value={PAGE_1}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("Page One")).toBeDefined()

    fireEvent.click(screen.getByRole("button"))

    fireEvent.click(screen.getByText("Page Two"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("rel", "page-2")
  })

  it("renders an Empty placeholder badge when value is null and editable", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    renderWithResolver(
      <RelationPropertyBadge
        property={definition}
        value={null}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("Empty")).toBeDefined()
    expect(screen.getByRole("button")).toBeDefined()
  })

  it("falls back to a static badge when read-only", () => {
    const { container } = renderWithResolver(
      <RelationPropertyBadge property={definition} value={PAGE_1} context="detail" />
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getByText("Page One")).toBeDefined()
  })
})

const COLORED_PAGES = [
  { id: "page-1", title: "Page One", color: "purple" as const },
  { id: "page-2", title: "Page Two" },
  { id: "page-3", title: "Page Three", color: "default" as const },
]

function makeColoredResolver(): PageResolverValue {
  return {
    resolve: (id) => COLORED_PAGES.find((p) => p.id === id) ?? null,
    listPages: () => COLORED_PAGES,
  }
}

function renderWithColoredResolver(node: React.ReactNode) {
  return render(<PageResolverProvider value={makeColoredResolver()}>{node}</PageResolverProvider>)
}

describe("RelationPropertyBadge — target page color", () => {
  it("card: adopts the target page's color as the badge variant", () => {
    renderWithColoredResolver(
      <RelationPropertyBadge
        property={definition}
        value={PAGE_1}
        context="card"
        onPageNavigate={() => {}}
      />
    )

    expect(screen.getByRole("button").className).toContain("text-purple")
  })

  it("card: keeps the fallback variant when the target page has no color", () => {
    renderWithColoredResolver(
      <RelationPropertyBadge
        property={definition}
        value={"page-2" satisfies PropertyValue}
        context="card"
        onPageNavigate={() => {}}
      />
    )

    const className = screen.getByRole("button").className
    expect(className).toContain("text-secondary")
    expect(className).not.toContain("text-purple")
  })

  it("card: renders a 'default' color as the neutral fallback", () => {
    renderWithColoredResolver(
      <RelationPropertyBadge
        property={definition}
        value={"page-3" satisfies PropertyValue}
        context="card"
        onPageNavigate={() => {}}
      />
    )

    expect(screen.getByRole("button").className).toContain("text-secondary")
  })

  it("detail: adopts the target page's color on the read-only badge", () => {
    const { container } = renderWithColoredResolver(
      <RelationPropertyBadge property={definition} value={PAGE_1} context="detail" />
    )

    expect(container.querySelector('[class*="text-purple"]')).not.toBeNull()
  })
})
