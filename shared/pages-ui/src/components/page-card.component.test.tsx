import { afterEach, describe, expect, it } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render as rtlRender } from "@shared/utils-test/render"
import type { ReactElement, ReactNode } from "react"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import { type PagesUILinkProps, PagesUILinkProvider } from "../router-context"
import { PageCard } from "./page-card"

afterEach(() => {
  cleanup()
})

function TestLink({ href, onClick, className, children }: PagesUILinkProps) {
  return (
    <a href={href} onClick={onClick} className={className} data-spa-link="true">
      {children}
    </a>
  )
}

function LinkWrap({ children }: { children: ReactNode }) {
  return <PagesUILinkProvider component={TestLink}>{children}</PagesUILinkProvider>
}

function render(ui: ReactElement, options?: Parameters<typeof rtlRender>[1]) {
  return rtlRender(ui, { wrapper: LinkWrap, ...options })
}

const definitions: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "foo", title: "Foo", type: "text", config: {} },
]

const data: PageDataJSON = {
  title: "Persona Image",
  foo: "FOO_VALUE",
}

function follows(a: Element, b: Element): boolean {
  return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
}

describe("PageCard — gallery cover layout", () => {
  it("orders the card as header → cover image → content (title/kebab above image, badges below)", () => {
    const { container } = render(
      <PageCard
        id="p1"
        definitions={definitions}
        data={data}
        visiblePropertyIds={["foo"]}
        coverSize="medium"
        coverUrl="https://example.com/cover.png"
      />
    )
    const card = container.querySelector('[data-slot="card"]')
    expect(card).not.toBeNull()
    if (card == null) return

    const header = card.querySelector('[data-slot="card-header"]')
    const cover = card.querySelector('[aria-label="Cover image"]')
    const content = card.querySelector('[data-slot="card-content"]')

    expect(header).not.toBeNull()
    expect(cover).not.toBeNull()
    expect(content).not.toBeNull()
    if (header == null || cover == null || content == null) return

    expect(follows(header, cover)).toBe(true)
    expect(follows(cover, content)).toBe(true)
  })

  it("renders the cover as a square that is not the top element and carries no broken top-corner rounding", () => {
    render(
      <PageCard
        id="p2"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl="https://example.com/cover.png"
      />
    )
    const cover = screen.getByLabelText("Cover image")
    const cls = cover.getAttribute("class") ?? ""
    expect(cls).toContain("aspect-square")
    expect(cls).not.toContain("rounded-t-[inherit]")
    expect(cls).not.toContain("-mt-6")
  })

  it("renders no cover region when coverSize is undefined (non-gallery card unchanged)", () => {
    const { container } = render(<PageCard id="p3" definitions={definitions} data={data} />)
    expect(screen.queryByLabelText("Cover image")).toBeNull()
    const card = container.querySelector('[data-slot="card"]')
    expect(card?.querySelector('[data-slot="card-header"]')).not.toBeNull()
    expect(card?.querySelector('[data-slot="card-content"]')).not.toBeNull()
  })
})

describe("PageCard — masked cover (#14184)", () => {
  it("coverMaskGlyph forces the placeholder band with the glyph — the stored image never renders", () => {
    render(
      <PageCard
        id="p4"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl="https://example.com/reward-art.png"
        coverMaskGlyph="⚿"
      />
    )
    const cover = screen.getByLabelText("Cover image")
    expect(cover.getAttribute("style") ?? "").not.toContain("reward-art.png")
    expect(cover.textContent).toContain("⚿")
    const glyph = cover.querySelector("span")
    expect(classTokens(glyph)).toContain("text-tertiary")
  })

  it("no glyph (null) renders the image cover exactly as before", () => {
    render(
      <PageCard
        id="p5"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl="https://example.com/cover.png"
        coverMaskGlyph={null}
      />
    )
    const cover = screen.getByLabelText("Cover image")
    expect(cover.getAttribute("style") ?? "").toContain("cover.png")
    expect(cover.textContent ?? "").not.toContain("⚿")
  })
})

function classTokens(el: Element | null | undefined): readonly string[] {
  return (el?.getAttribute("class") ?? "").split(/\s+/).filter((t) => t !== "")
}

describe("PageCard — gallery cover-click seam", () => {
  const detailHref = "/persona/persona-image-abc12345"

  it("makes the cover an interactive button that invokes onCoverClick and does NOT navigate to href (image cover)", async () => {
    let clicked = 0
    render(
      <PageCard
        id="c1"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl="https://example.com/cover.png"
        href={detailHref}
        onCoverClick={() => {
          clicked += 1
        }}
      />
    )
    const cover = screen.getByRole("button", { name: "Cover image" })
    expect(cover.tagName).toBe("BUTTON")
    expect(cover.closest("a")).toBeNull()
    expect(cover.querySelector(`a[href="${detailHref}"]`)).toBeNull()
    await act(async () => {
      fireEvent.click(cover)
    })
    expect(clicked).toBe(1)
  })

  it("makes the placeholder cover an interactive button that invokes onCoverClick (no image)", async () => {
    let clicked = 0
    render(
      <PageCard
        id="c2"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl={null}
        href={detailHref}
        onCoverClick={() => {
          clicked += 1
        }}
      />
    )
    const cover = screen.getByRole("button", { name: "Cover image" })
    expect(cover.tagName).toBe("BUTTON")
    await act(async () => {
      fireEvent.click(cover)
    })
    expect(clicked).toBe(1)
  })

  it("keeps the cover a plain non-interactive region when onCoverClick is absent (byte-for-byte today)", () => {
    render(
      <PageCard
        id="c3"
        definitions={definitions}
        data={data}
        coverSize="medium"
        coverUrl="https://example.com/cover.png"
        href={detailHref}
      />
    )
    expect(screen.queryByRole("button", { name: "Cover image" })).toBeNull()
    const cover = screen.getByLabelText("Cover image")
    expect(cover.tagName).toBe("DIV")
  })
})
