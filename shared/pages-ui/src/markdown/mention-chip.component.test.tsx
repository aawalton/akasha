import { afterEach, describe, expect, test } from "bun:test"
import { formatSmartDate } from "@shared/pages-core/view/format-smart-date"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { MentionChip } from "./mention-chip"

afterEach(() => {
  cleanup()
})

describe("MentionChip — resolverless fallback", () => {
  test("no resolver renders @type:id fallback text", () => {
    render(<MentionChip mentionType="page" mentionId="abc" />)
    expect(screen.getByText("@page:abc")).toBeDefined()
  })

  test("no resolver, with mentionAnchor, renders @type:id#anchor fallback text", () => {
    render(<MentionChip mentionType="page" mentionId="abc" mentionAnchor="sect" />)
    expect(screen.getByText("@page:abc#sect")).toBeDefined()
  })
})

describe("MentionChip — date mention smart-date rendering", () => {
  test("a date mention with no resolver renders the smart-date label, not the raw token", () => {
    render(<MentionChip mentionType="date" mentionId="2026-01-15" />)
    const expectedLabel = formatSmartDate("2026-01-15")
    expect(screen.getByText(expectedLabel)).toBeDefined()
    expect(screen.queryByText("@date:2026-01-15")).toBeNull()
  })
})

describe("MentionChip — resolver with href", () => {
  test("resolver href is used as-is when mentionAnchor is absent", () => {
    render(
      <MentionChip
        mentionType="page"
        mentionId="abc"
        resolver={() => ({ label: "L", href: "/p/abc" })}
      />
    )
    const link = screen.getByRole("link", { name: "L" })
    expect(link.getAttribute("href")).toBe("/p/abc")
  })

  test("mentionAnchor is appended to resolver href with #", () => {
    render(
      <MentionChip
        mentionType="page"
        mentionId="abc"
        mentionAnchor="sect"
        resolver={() => ({ label: "L", href: "/p/abc" })}
      />
    )
    const link = screen.getByRole("link", { name: "L" })
    expect(link.getAttribute("href")).toBe("/p/abc#sect")
  })
})

describe("MentionChip — resolver without href", () => {
  test("renders the resolved label (no <a>) when href is absent", () => {
    render(<MentionChip mentionType="page" mentionId="abc" resolver={() => ({ label: "L" })} />)
    expect(screen.getByText("L")).toBeDefined()
    expect(screen.queryByRole("link")).toBeNull()
  })

  test("mentionAnchor with no resolver href: still renders label, no <a>", () => {
    render(
      <MentionChip
        mentionType="page"
        mentionId="abc"
        mentionAnchor="sect"
        resolver={() => ({ label: "L" })}
      />
    )
    expect(screen.getByText("L")).toBeDefined()
    expect(screen.queryByRole("link")).toBeNull()
  })
})
