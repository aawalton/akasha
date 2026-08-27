import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PropertyValue } from "../src/property-types/types"
import { UrlPropertyBadge } from "../src/property-types/url"
import { asAnchor, requireInput } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "site",
  title: "Site",
  type: "url",
  config: {},
}

const SAMPLE_URL = "https://example.com/"
const NEW_URL = "https://example.org/"

describe("UrlPropertyBadge — card context, editable", () => {
  it("renders a navigate-only link (no input) opening in a new tab", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <UrlPropertyBadge
        property={definition}
        value={SAMPLE_URL}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(container.querySelector('input[type="text"]')).toBeNull()

    const link = asAnchor(screen.getByRole("link"))
    expect(link.href).toBe(SAMPLE_URL)
    expect(link.target).toBe("_blank")
    expect(link.rel).toContain("noopener")
  })

  it("does not forward edits — clicking the link never calls onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <UrlPropertyBadge
        property={definition}
        value={SAMPLE_URL}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("link"))
    expect(onPropertyChange).not.toHaveBeenCalled()
  })

  it("renders a navigate link when onPropertyChange is undefined", () => {
    const { container } = render(
      <UrlPropertyBadge property={definition} value={SAMPLE_URL} context="card" editable />
    )

    expect(container.querySelector('input[type="text"]')).toBeNull()
    const links = screen.getAllByRole("link")
    expect(links.length).toBe(1)
    expect(asAnchor(links[0]).href).toBe(SAMPLE_URL)
  })

  it("renders an em-dash badge for empty values (no navigation)", () => {
    const { container } = render(
      <UrlPropertyBadge
        property={definition}
        value=""
        context="card"
        editable
        onPropertyChange={mock((_id: string, _v: PropertyValue) => {})}
      />
    )
    expect(container.textContent).toContain("—")
    expect(container.querySelector("a")).toBeNull()
    expect(container.querySelector('input[type="text"]')).toBeNull()
  })
})

describe("UrlPropertyBadge — detail context, editable", () => {
  it("renders an editable badge plus a follow-link icon", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <UrlPropertyBadge
        property={definition}
        value={SAMPLE_URL}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const input = requireInput(container, 'input[type="text"]')
    expect(input.value).toBe(SAMPLE_URL)

    const link = asAnchor(screen.getByRole("link"))
    expect(link.href).toBe(SAMPLE_URL)
    expect(link.target).toBe("_blank")
  })

  it("commit (blur) on the input forwards the new value to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <UrlPropertyBadge
        property={definition}
        value={SAMPLE_URL}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const input = requireInput(container, 'input[type="text"]')
    fireEvent.change(input, { target: { value: NEW_URL } })
    fireEvent.blur(input)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("site", NEW_URL)
  })

  it("falls back to a static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <UrlPropertyBadge property={definition} value={SAMPLE_URL} context="detail" editable />
    )

    expect(container.querySelector('input[type="text"]')).toBeNull()
    const links = screen.getAllByRole("link")
    expect(links.length).toBe(1)
    expect(asAnchor(links[0]).href).toBe(SAMPLE_URL)
  })

  it("renders an em-dash badge for empty values when read-only", () => {
    const { container } = render(
      <UrlPropertyBadge property={definition} value="" context="detail" editable />
    )
    expect(container.textContent).toContain("—")
  })
})
