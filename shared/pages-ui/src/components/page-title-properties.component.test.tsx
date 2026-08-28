import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ActionVerbContext } from "../action-verbs/action-verb-registry.ts"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => () => {},
}))

const { PageTitleProperties } = await import("./page-title-properties.tsx")
const { registerActionVerb, unregisterActionVerb } = await import(
  "../action-verbs/action-verb-registry.ts"
)

const SCRATCH = "title-draw-verb"

const definitions: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "foo", title: "Foo", type: "text", config: {} },
  { id: "bar", title: "Bar", type: "text", config: {} },
]

const data: PageDataJSON = {
  title: "Nav Title",
  foo: "FOO_VALUE",
  bar: "BAR_VALUE",
}

async function flushAsync() {
  await act(async () => {
    await Promise.resolve()
    await Promise.resolve()
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

afterEach(() => {
  cleanup()
})

describe("PageTitleProperties — title_properties allowlist", () => {
  it("renders nothing when titlePropertyIds is undefined (inert-landing back-compat pin)", () => {
    const { container } = render(<PageTitleProperties definitions={definitions} data={data} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when titlePropertyIds is []", () => {
    const { container } = render(
      <PageTitleProperties definitions={definitions} data={data} titlePropertyIds={[]} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders only the allowlisted property's badge", () => {
    render(<PageTitleProperties definitions={definitions} data={data} titlePropertyIds={["foo"]} />)
    expect(screen.getByText("FOO_VALUE")).toBeDefined()
    expect(screen.queryByText("BAR_VALUE")).toBeNull()
  })

  it("renders badges in titlePropertyIds order, not definitions order", () => {
    render(
      <PageTitleProperties
        definitions={definitions}
        data={data}
        titlePropertyIds={["bar", "foo"]}
      />
    )
    const fooEl = screen.getByText("FOO_VALUE")
    const barEl = screen.getByText("BAR_VALUE")
    expect(barEl.compareDocumentPosition(fooEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
  })

  it("filters the reserved id 'title' out of the allowlist", () => {
    const { container } = render(
      <PageTitleProperties definitions={definitions} data={data} titlePropertyIds={["title"]} />
    )
    expect(container.firstChild).toBeNull()
  })
})

describe("PageTitleProperties — action-button carve-out fires with the nav-row ctx", () => {
  let handler = mock((_ctx: ActionVerbContext) => {})

  beforeEach(() => {
    handler = mock((_ctx: ActionVerbContext) => {})
    registerActionVerb(SCRATCH, handler)
  })

  afterEach(() => {
    unregisterActionVerb(SCRATCH)
  })

  const actionDefs: readonly PropertyDefinition[] = [
    {
      id: "draw",
      title: "Draw",
      type: "action-button",
      config: { verbId: SCRATCH, label: "Draw" },
    },
  ]

  it("renders an interactive action-button in the title bar and fires the verb with pageId/pageTypeSlug of the nav row", async () => {
    render(
      <PageTitleProperties
        definitions={actionDefs}
        data={{}}
        titlePropertyIds={["draw"]}
        pageId="nav_1"
        pageTypeSlug="nav"
      />
    )
    const button = screen.getByRole("button")
    expect(button.textContent).toContain("Draw")
    fireEvent.click(button)
    await flushAsync()
    expect(handler).toHaveBeenCalledTimes(1)
    const ctx = handler.mock.calls[0]?.[0]
    expect(ctx?.pageId).toBe("nav_1")
    expect(ctx?.pageTypeSlug).toBe("nav")
  })
})
