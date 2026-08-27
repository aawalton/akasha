import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PageResolverProvider, type PageResolverValue } from "../contexts/page-resolver"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "./property-badge"

afterEach(() => {
  cleanup()
})

const relationDef: PropertyDefinition = {
  id: "character",
  title: "Character",
  type: "relation",
  config: { targetPageTypeId: "tt_character" },
}

function buildResolver(): PageResolverValue {
  const pages = [
    { id: "page_a", title: "Aanya" },
    { id: "page_b", title: "Borek" },
  ]
  const byId = new Map(pages.map((p) => [p.id, p]))
  return {
    resolve: (id) => byId.get(id) ?? null,
    listPages: () => pages,
  }
}

describe("PropertyBadge dispatcher — relation card editable", () => {
  it("with PageResolverProvider + editable + onPropertyChange, click opens picker popover", () => {
    const onPropertyChange = mock((_id: string, _value: unknown) => {})
    render(
      <PageResolverProvider value={buildResolver()}>
        <PropertyBadge
          property={relationDef}
          value="page_a"
          context="card"
          editable
          onPropertyChange={onPropertyChange}
        />
      </PageResolverProvider>
    )
    const trigger = screen.getByRole("button")
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })
    fireEvent.click(trigger)
    expect(screen.getByPlaceholderText("Search pages...")).toBeDefined()
  })

  it("with PageResolverProvider + editable + onPropertyChange, an unset value renders an Empty badge whose click opens the picker", () => {
    const onPropertyChange = mock((_id: string, _value: unknown) => {})
    render(
      <PageResolverProvider value={buildResolver()}>
        <PropertyBadge
          property={relationDef}
          value={null}
          context="card"
          editable
          onPropertyChange={onPropertyChange}
        />
      </PageResolverProvider>
    )
    expect(screen.getByText("Empty")).toBeDefined()
    const trigger = screen.getByRole("button")
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })
    fireEvent.click(trigger)
    expect(screen.getByPlaceholderText("Search pages...")).toBeDefined()
  })

  it("without onPropertyChange, renders the navigate-only badge (no popover)", () => {
    const onPageNavigate = mock((_id: string) => {})
    render(
      <PageResolverProvider value={buildResolver()}>
        <PropertyBadge
          property={relationDef}
          value="page_a"
          context="card"
          editable
          onPageNavigate={onPageNavigate}
        />
      </PageResolverProvider>
    )
    expect(screen.getByText("Aanya")).toBeDefined()
    const trigger = screen.getByRole("button")
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })
    fireEvent.click(trigger)
    expect(screen.queryByPlaceholderText("Search pages...")).toBeNull()
    expect(onPageNavigate).toHaveBeenCalledTimes(1)
    expect(onPageNavigate.mock.calls[0]?.[0]).toBe("page_a")
  })
})

const rollupRelationDef: PropertyDefinition = {
  id: "rel",
  title: "Project",
  type: "relation",
  config: { targetPageTypeId: "tt_project" },
}

const rollupDef: PropertyDefinition = {
  id: "rollup_title",
  title: "Project Title",
  type: "rollup",
  config: { relationPropertyId: "rel", targetPropertyId: "title" },
}

describe("PropertyBadge dispatcher — rollup click-to-source navigation", () => {
  it("with single-relation hop + pageHref + pageData[relationPropertyId]=string, renders an anchor whose href routes via pageHref", () => {
    const pageHref = mock((id: string, _opts?: { targetPageTypeId?: string }) => `/projects/${id}`)
    render(
      <PropertyBadge
        property={rollupDef}
        value="Project A title"
        context="card"
        pageData={{ rel: "page_a", rollup_title: "Project A title" }}
        propertyDefinitions={[rollupRelationDef, rollupDef]}
        pageHref={pageHref}
      />
    )
    const link = screen.getByRole("link")
    expect(link.getAttribute("href")).toBe("/projects/page_a")
    expect(pageHref).toHaveBeenCalledWith("page_a", { targetPageTypeId: "tt_project" })
  })

  it("without pageHref but with onPageNavigate, click fires onPageNavigate(relatedPageId)", () => {
    const onPageNavigate = mock((_id: string) => {})
    render(
      <PropertyBadge
        property={rollupDef}
        value="Project A title"
        context="card"
        pageData={{ rel: "page_a", rollup_title: "Project A title" }}
        propertyDefinitions={[rollupRelationDef, rollupDef]}
        onPageNavigate={onPageNavigate}
      />
    )
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)
    expect(onPageNavigate).toHaveBeenCalledTimes(1)
    expect(onPageNavigate.mock.calls[0]?.[0]).toBe("page_a")
  })

  it("with non-string relation value (multi-relation array, missing), renders plain read-only — no link, no button", () => {
    const onPageNavigate = mock((_id: string) => {})
    render(
      <PropertyBadge
        property={rollupDef}
        value="Project A title"
        context="card"
        pageData={{ rel: ["page_a", "page_b"], rollup_title: "Project A title" }}
        propertyDefinitions={[rollupRelationDef, rollupDef]}
        onPageNavigate={onPageNavigate}
      />
    )
    expect(screen.queryByRole("link")).toBeNull()
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("editable=true + onPropertyChange does not dispatch a write — rollup is read-only inline", () => {
    const onPropertyChange = mock((_id: string, _value: unknown) => {})
    const pageHref = mock((id: string) => `/projects/${id}`)
    render(
      <PropertyBadge
        property={rollupDef}
        value="Project A title"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
        pageData={{ rel: "page_a", rollup_title: "Project A title" }}
        propertyDefinitions={[rollupRelationDef, rollupDef]}
        pageHref={pageHref}
      />
    )
    const link = screen.getByRole("link")
    fireEvent.click(link)
    expect(onPropertyChange).not.toHaveBeenCalled()
  })
})
