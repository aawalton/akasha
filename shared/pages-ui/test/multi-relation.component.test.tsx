import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PageResolverProvider, type PageResolverValue } from "../src/contexts/page-resolver"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { MultiRelationPropertyBadge } from "../src/property-types/multi-relation"
import type { PropertyValue } from "../src/property-types/types"
import { asHTMLElement, requireAnchor } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "rels",
  title: "Tasks",
  type: "multi-relation",
  config: {},
}

const stubResolver: PageResolverValue = {
  resolve: (id) => ({ id, title: `Page ${id}` }),
  listPages: () => [
    { id: "x", title: "Existing X" },
    { id: "y", title: "Existing Y" },
  ],
}

describe("MultiRelationPropertyBadge — card context", () => {
  it("renders count badge with title and forwards click to onRelationNavigate", () => {
    const onRelationNavigate = mock((_id: string) => {})

    render(
      <MultiRelationPropertyBadge
        property={definition}
        value={["a", "b", "c"]}
        context="card"
        onRelationNavigate={onRelationNavigate}
      />
    )

    const trigger = screen.getByRole("button")
    expect(trigger.textContent).toContain("3")
    expect(trigger.textContent).toContain("Tasks")

    fireEvent.click(trigger)
    expect(onRelationNavigate).toHaveBeenCalledTimes(1)
    expect(onRelationNavigate).toHaveBeenCalledWith("rels")
  })

  it("renders LinkBadge with relationHref and stops propagation on click", () => {
    const onRelationNavigate = mock((_id: string) => {})
    const onCardNavigate = mock(() => {})

    const { container } = render(
      <MultiRelationPropertyBadge
        property={definition}
        value={["a", "b"]}
        context="card"
        onRelationNavigate={onRelationNavigate}
        onCardNavigate={onCardNavigate}
        relationHref={(id) => `/r/${id}`}
      />
    )

    const link = requireAnchor(container, "a")
    expect(link.getAttribute("href")).toBe("/r/rels")
    expect(link.textContent).toContain("2")
    expect(link.textContent).toContain("Tasks")

    const evt = new MouseEvent("click", { bubbles: true, cancelable: true })
    const stopSpy = mock(evt.stopPropagation.bind(evt))
    evt.stopPropagation = stopSpy
    link.dispatchEvent(evt)
    expect(stopSpy).toHaveBeenCalled()
    expect(onCardNavigate).not.toHaveBeenCalled()
    expect(onRelationNavigate).not.toHaveBeenCalled()
  })

  it("returns null when value has no relations", () => {
    const { container } = render(
      <MultiRelationPropertyBadge
        property={definition}
        value={[]}
        context="card"
        onRelationNavigate={() => {}}
      />
    )
    expect(container.textContent).toBe("")
  })
})

describe("MultiRelationPropertyBadge — detail context, editable", () => {
  it("opens popover and forwards adds to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <PageResolverProvider value={stubResolver}>
        <MultiRelationPropertyBadge
          property={definition}
          value={["a"]}
          context="detail"
          editable
          onPropertyChange={onPropertyChange}
        />
      </PageResolverProvider>
    )

    expect(screen.getByText("Page a")).toBeDefined()

    fireEvent.click(screen.getByRole("button"))

    const candidates = document.body.querySelector('[data-slot="candidates"]')
    if (candidates === null) throw new Error("expected candidates row to exist")
    const addXCandidate = Array.from(candidates.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Existing X")
    )
    if (addXCandidate === undefined) throw new Error('expected "Existing X" candidate button')
    fireEvent.click(addXCandidate)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("rels", ["a", "x"])
  })

  it("removes a current relation via the X button", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <PageResolverProvider value={stubResolver}>
        <MultiRelationPropertyBadge
          property={definition}
          value={["a", "b"]}
          context="detail"
          editable
          onPropertyChange={onPropertyChange}
        />
      </PageResolverProvider>
    )

    fireEvent.click(screen.getAllByRole("button")[0])

    const currentRelations = document.body.querySelector('[data-slot="current-relations"]')
    if (currentRelations === null) throw new Error("expected current-relations to exist")
    const removeBtns = currentRelations.querySelectorAll('span[role="button"]')
    fireEvent.click(asHTMLElement(removeBtns[0]))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("rels", ["b"])
  })

  it("falls back to read-only badges when onPropertyChange is undefined", () => {
    const { container } = render(
      <PageResolverProvider value={stubResolver}>
        <MultiRelationPropertyBadge property={definition} value={["a"]} context="detail" editable />
      </PageResolverProvider>
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getAllByText("Page a").length).toBeGreaterThan(0)
  })
})

const COLORED_ENTRIES = [
  { id: "a", title: "Page a", color: "green" as const },
  { id: "b", title: "Page b" },
]

const coloredResolver: PageResolverValue = {
  resolve: (id) => COLORED_ENTRIES.find((p) => p.id === id) ?? null,
  listPages: () => COLORED_ENTRIES,
}

describe("MultiRelationPropertyBadge — target page color", () => {
  it("detail: colors each per-target badge from its target page's color", () => {
    const { container } = render(
      <PageResolverProvider value={coloredResolver}>
        <MultiRelationPropertyBadge property={definition} value={["a", "b"]} context="detail" />
      </PageResolverProvider>
    )

    const colored = container.querySelector('[class*="text-green"]')
    expect(colored).not.toBeNull()
    expect(colored?.textContent).toContain("Page a")
    expect(screen.getByText("Page b").closest('[class*="text-green"]')).toBeNull()
  })
})
