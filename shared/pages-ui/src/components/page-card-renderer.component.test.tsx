import { afterEach, describe, expect, it } from "bun:test"
import { PageTypeSlug } from "@shared/pages-url"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render as rtlRender } from "@shared/utils-test/render"
import type { ComponentProps, ReactElement, ReactNode } from "react"
import {
  type CoverClickContext,
  registerCoverClickHandler,
  unregisterCoverClickHandler,
} from "../cover-click/cover-click-registry"
import { registerCoverMask, unregisterCoverMask } from "../cover-click/cover-mask-registry"
import { type PagesUILinkProps, PagesUILinkProvider } from "../router-context"
import type { PageRow } from "../view-engine/page-row"
import { PageCardRenderer } from "./page-card-renderer"

function TestLink({ href, onClick, className, children }: PagesUILinkProps) {
  return (
    <a href={href} onClick={onClick} className={className}>
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

const CAP = "test-gallery"
const PT_SLUG = PageTypeSlug("persona-card")
const PT_ID = "019f1a5a-e6e0-7000-8000-000000000001"
const page: PageRow = { _id: "p1", title: "Ravah" }

const coverRegistered: string[] = []
function registerCover(handler: Parameters<typeof registerCoverClickHandler>[1]): undefined {
  registerCoverClickHandler(CAP, handler)
  coverRegistered.push(CAP)
}

afterEach(() => {
  cleanup()
  for (const cap of coverRegistered) unregisterCoverClickHandler(cap)
  coverRegistered.length = 0
})

function renderCard(overrides: Partial<ComponentProps<typeof PageCardRenderer>>) {
  return render(
    <PageCardRenderer
      page={page}
      properties={[]}
      rowAggregates={new Map()}
      pageTypeIconName={null}
      pageHrefById={() => "/x"}
      pageTypePluralSlugById={new Map()}
      onIconChange={() => {}}
      onPropertyChange={() => {}}
      onCompletedAtChange={() => {}}
      onCreateOption={() => {}}
      onDelete={() => {}}
      {...overrides}
    />
  )
}

describe("PageCardRenderer — cover-click threading (capability-keyed, data-configured #15538)", () => {
  it("resolves the handler by coverActionCapability and invokes it with the page-type-slug context", async () => {
    const received: CoverClickContext[] = []
    registerCover((ctx) => {
      received.push(ctx)
    })
    renderCard({ coverActionCapability: CAP, rowPageTypeSlug: PT_SLUG, galleryCardSize: "medium" })
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Cover image" }))
    })
    expect(received.length).toBe(1)
    const ctx = received[0]
    if (ctx == null) return
    expect(ctx.pageId).toBe("p1")
    expect(ctx.pageTypeSlug).toBe(PT_SLUG)
    expect(ctx.data.title).toBe("Ravah")
  })

  it("does NOT resolve a handler registered under the page-type slug (capability-keyed, not slug-keyed)", () => {
    registerCoverClickHandler(PT_SLUG, () => {})
    renderCard({ coverActionCapability: CAP, rowPageTypeSlug: PT_SLUG, galleryCardSize: "medium" })
    expect(screen.queryByRole("button", { name: "Cover image" })).toBeNull()
    unregisterCoverClickHandler(PT_SLUG)
  })

  it("leaves the cover a plain non-interactive region when the declared capability has no handler (back-compat)", () => {
    renderCard({ coverActionCapability: CAP, rowPageTypeSlug: PT_SLUG, galleryCardSize: "medium" })
    expect(screen.queryByRole("button", { name: "Cover image" })).toBeNull()
  })

  it("does not make the cover interactive when coverActionCapability is absent (opt-in per page-type)", () => {
    registerCover(() => {})
    renderCard({ rowPageTypeSlug: PT_SLUG, galleryCardSize: "medium" })
    expect(screen.queryByRole("button", { name: "Cover image" })).toBeNull()
  })

  it("does not make the cover interactive when rowPageTypeSlug is absent (context would be incomplete)", () => {
    registerCover(() => {})
    renderCard({ coverActionCapability: CAP, galleryCardSize: "medium" })
    expect(screen.queryByRole("button", { name: "Cover image" })).toBeNull()
  })
})

describe("PageCardRenderer — title href (cross-type per-row fallback, #15525)", () => {
  it("uses the view-level rowHref in single-type mode", () => {
    renderCard({ rowPageTypeSlug: PT_SLUG, pageHrefById: () => "/should-not-be-used" })
    const link = screen.getByRole("link", { name: "Ravah" })
    expect(link.getAttribute("href")).toContain("/persona-card/")
    expect(link.getAttribute("href")).not.toBe("/should-not-be-used")
  })

  it("falls back to the per-row pageHrefById in cross-type mode so tapping navigates (#15525)", () => {
    renderCard({ rowPageTypeSlug: undefined, pageHrefById: () => "/story/ravah-0000abcd" })
    const link = screen.getByRole("link", { name: "Ravah" })
    expect(link.getAttribute("href")).toBe("/story/ravah-0000abcd")
  })
})

describe("PageCardRenderer — cover-mask threading (slug-keyed, #14184)", () => {
  afterEach(() => {
    unregisterCoverMask(PT_SLUG)
    unregisterCoverMask(PT_ID)
  })

  it("resolves a slug-registered mask and renders the glyph instead of the stored image", () => {
    registerCoverMask(PT_SLUG, () => "⚿")
    renderCard({
      rowPageTypeSlug: PT_SLUG,
      galleryCardSize: "medium",
      galleryCoverSourceId: "cover",
      page: { ...page, cover: "https://example.com/reward-art.png" },
    })
    const cover = screen.getByLabelText("Cover image")
    expect(cover.getAttribute("style") ?? "").not.toContain("reward-art.png")
    expect(cover.textContent).toContain("⚿")
  })

  it("does NOT resolve a mask registered under the id (the pre-fix mismatch left covers unmasked)", () => {
    registerCoverMask(PT_ID, () => "⚿")
    renderCard({
      rowPageTypeSlug: PT_SLUG,
      galleryCardSize: "medium",
      galleryCoverSourceId: "cover",
      page: { ...page, cover: "https://example.com/cover.png" },
    })
    const cover = screen.getByLabelText("Cover image")
    expect(cover.getAttribute("style") ?? "").toContain("cover.png")
  })

  it("a resolver returning null leaves the image cover untouched", () => {
    registerCoverMask(PT_SLUG, () => null)
    renderCard({
      rowPageTypeSlug: PT_SLUG,
      galleryCardSize: "medium",
      galleryCoverSourceId: "cover",
      page: { ...page, cover: "https://example.com/cover.png" },
    })
    const cover = screen.getByLabelText("Cover image")
    expect(cover.getAttribute("style") ?? "").toContain("cover.png")
  })
})
