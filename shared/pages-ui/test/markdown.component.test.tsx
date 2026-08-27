import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { MarkdownPropertyBadge } from "../src/property-types/markdown"
import type { PropertyValue } from "../src/property-types/types"
import { requireTextarea } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "body",
  title: "Body",
  type: "markdown",
  config: {},
}

describe("MarkdownPropertyBadge — card context", () => {
  it("renders a clickable badge with title and char count", () => {
    const onCardNavigate = mock(() => {})

    render(
      <MarkdownPropertyBadge
        property={definition}
        value="# Hello world"
        context="card"
        onCardNavigate={onCardNavigate}
      />
    )

    const button = screen.getByRole("button")
    expect(button.textContent).toContain("Body")
    expect(button.textContent).toContain("13")

    fireEvent.click(button)
    expect(onCardNavigate).toHaveBeenCalledTimes(1)
    expect(onCardNavigate).toHaveBeenCalledWith()
  })

  it("counts zero characters for nullish values", () => {
    const onCardNavigate = mock(() => {})

    render(
      <MarkdownPropertyBadge
        property={definition}
        value={null}
        context="card"
        onCardNavigate={onCardNavigate}
      />
    )

    const button = screen.getByRole("button")
    expect(button.textContent).toContain("Body")
    expect(button.textContent).toContain("0")
  })

  it("renders a non-interactive badge when onCardNavigate is undefined", () => {
    render(<MarkdownPropertyBadge property={definition} value="# Hello world" context="card" />)

    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.getByText(/Body/)).toBeDefined()
  })
})

describe("MarkdownPropertyBadge — detail context, editable", () => {
  it("renders MarkdownRenderer in view mode and switches to a textarea on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <MarkdownPropertyBadge
        property={definition}
        value="# Hello world"
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(container.querySelector("h1")).not.toBeNull()
    expect(container.querySelector("textarea")).toBeNull()

    fireEvent.click(screen.getByRole("button"))

    const textarea = requireTextarea(container, "textarea")
    expect(container.querySelector("h1")).toBeNull()

    fireEvent.change(textarea, { target: { value: "## Updated" } })
    fireEvent.blur(textarea)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("body", "## Updated")
  })

  it("does not call onPropertyChange when value is unchanged on blur", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <MarkdownPropertyBadge
        property={definition}
        value="# Hello world"
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("button"))
    const textarea = requireTextarea(container, "textarea")
    fireEvent.blur(textarea)

    expect(onPropertyChange).not.toHaveBeenCalled()
  })

  it("renders read-only MarkdownRenderer when onPropertyChange is undefined", () => {
    const { container } = render(
      <MarkdownPropertyBadge
        property={definition}
        value="# Hello world"
        context="detail"
        editable
      />
    )

    expect(container.querySelector("h1")).not.toBeNull()
    expect(container.querySelector("textarea")).toBeNull()
    expect(screen.queryByRole("button")).toBeNull()
  })
})

describe("MarkdownRenderer — fenced code blocks wrap instead of scrolling", () => {
  it("renders a <pre> that wraps long lines rather than overflowing horizontally", () => {
    const fenced = "```stat-screen\nA very long single line of system text that must wrap.\n```"

    const { container } = render(
      <MarkdownPropertyBadge property={definition} value={fenced} context="detail" editable />
    )

    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    const className = pre?.className ?? ""
    expect(className).toContain("whitespace-pre-wrap")
    expect(className).toContain("break-words")
    expect(className).not.toContain("overflow-x-auto")
  })
})
