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

function classTokens(el: Element | null | undefined): readonly string[] {
  return (el?.getAttribute("class") ?? "").split(/\s+/).filter((t) => t !== "")
}

describe("PageCard — overflow-gated title fade", () => {
  function maskOf(el: HTMLElement): string {
    const mask: string | undefined = el.style.maskImage
    return mask ?? ""
  }

  function staticTitleSpan(container: HTMLElement): HTMLElement {
    const title = container.querySelector('[data-slot="card-title"]')
    expect(title).not.toBeNull()
    const span = title?.querySelector("span")
    expect(span).not.toBeNull()
    if (span == null) throw new Error("static title span not found")
    return span
  }

  function stubWidths(el: HTMLElement, scrollWidth: number, clientWidth: number) {
    Object.defineProperty(el, "scrollWidth", { value: scrollWidth, configurable: true })
    Object.defineProperty(el, "clientWidth", { value: clientWidth, configurable: true })
  }

  it("renders a fitting read-only title fully un-faded and filling the row (flex-1 min-w-0)", () => {
    const { container } = render(<PageCard id="f1" definitions={definitions} data={data} />)
    const span = staticTitleSpan(container)
    expect(classTokens(span)).toContain("flex-1")
    expect(classTokens(span)).toContain("min-w-0")
    expect(maskOf(span)).toBe("")
  })

  it("fades the read-only title only when it actually overflows", async () => {
    const { container, rerender } = render(
      <PageCard id="f2" definitions={definitions} data={data} />
    )
    const span = staticTitleSpan(container)
    expect(maskOf(span)).toBe("")

    stubWidths(span, 300, 100)
    await act(async () => {
      rerender(
        <PageCard
          id="f2"
          definitions={definitions}
          data={{ ...data, title: "A Very Long Persona Name That Overflows" }}
        />
      )
    })
    expect(maskOf(span)).toContain("linear-gradient")

    stubWidths(span, 100, 100)
    await act(async () => {
      rerender(<PageCard id="f2" definitions={definitions} data={{ ...data, title: "Short" }} />)
    })
    expect(maskOf(span)).toBe("")
  })

  function titleLinkWrapper(container: HTMLElement, href: string): HTMLSpanElement {
    const link = Array.from(container.querySelectorAll("a")).find(
      (a) => a.getAttribute("href") === href
    )
    const wrapper = link?.closest("span") ?? null
    if (wrapper == null) throw new Error("title link wrapper not found")
    return wrapper
  }

  it("renders a fitting title link un-faded, filling the row, with the fade on the wrapper span", () => {
    const detailHref = "/persona/persona-image-abc12345"
    const { container } = render(
      <PageCard id="f4" definitions={definitions} data={data} href={detailHref} />
    )
    const wrapper = titleLinkWrapper(container, detailHref)
    expect(classTokens(wrapper)).toContain("flex-1")
    expect(classTokens(wrapper)).toContain("min-w-0")
    expect(maskOf(wrapper)).toBe("")
  })

  it("fades the title link only when it actually overflows", async () => {
    const detailHref = "/persona/persona-image-abc12345"
    const { container, rerender } = render(
      <PageCard id="f5" definitions={definitions} data={data} href={detailHref} />
    )
    const wrapper = titleLinkWrapper(container, detailHref)
    expect(maskOf(wrapper)).toBe("")

    stubWidths(wrapper, 300, 100)
    await act(async () => {
      rerender(
        <PageCard
          id="f5"
          definitions={definitions}
          data={{ ...data, title: "A Very Long Persona Name That Overflows" }}
          href={detailHref}
        />
      )
    })
    expect(maskOf(wrapper)).toContain("linear-gradient")
  })
})

describe("PageCard — title is always view-navigation (#14612)", () => {
  const detailHref = "/persona/persona-image-abc12345"

  it("renders the title as a single same-tab SPA link at every breakpoint, never an editor", () => {
    const { container } = render(
      <PageCard id="p1" definitions={definitions} data={data} href={detailHref} />
    )

    const links = Array.from(container.querySelectorAll("a")).filter(
      (a) => a.getAttribute("href") === detailHref
    )
    expect(links.length).toBe(1)
    const link = links[0]
    if (link == null) return
    expect(link.textContent).toContain("Persona Image")

    expect(link.getAttribute("data-spa-link")).toBe("true")

    expect(link.getAttribute("target")).toBeNull()
    expect(link.getAttribute("rel")).toBeNull()

    expect(classTokens(link)).not.toContain("sm:hidden")
    const wrapper = link.closest("span")
    expect(classTokens(wrapper)).not.toContain("sm:hidden")
    expect(classTokens(wrapper)).not.toContain("hidden")

    expect(screen.queryByLabelText("Click to edit")).toBeNull()
  })

  it("stops click propagation on the title link so an ancestor click seam does not also fire", () => {
    let ancestorClicks = 0
    const onAncestorClick = () => {
      ancestorClicks += 1
    }
    document.body.addEventListener("click", onAncestorClick)
    try {
      render(<PageCard id="p2" definitions={definitions} data={data} href={detailHref} />)
      const link = screen.getByText("Persona Image").closest("a")
      expect(link).not.toBeNull()
      if (link == null) return
      fireEvent.click(link)
      expect(ancestorClicks).toBe(0)
    } finally {
      document.body.removeEventListener("click", onAncestorClick)
    }
  })

  it("falls to a static, non-interactive span (never an editor) when no detail href is provided", () => {
    const { container } = render(<PageCard id="p3" definitions={definitions} data={data} />)
    expect(container.querySelector("a")).toBeNull()
    expect(screen.queryByLabelText("Click to edit")).toBeNull()
    expect(container.textContent).toContain("Persona Image")
  })
})
