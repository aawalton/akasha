import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ReactNode } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PagesUIRouterProvider } from "../src/router-context"
import { ProgressPropertyBadge } from "../src/property-types/progress"

let lastPushedHref: string | null = null
function clearLastPushedHref(): undefined {
  lastPushedHref = null
  return
}

function RouterFixture({ children }: { children: ReactNode }) {
  return (
    <PagesUIRouterProvider
      value={{
        pathname: "/",
        push: (href: string) => {
          lastPushedHref = href
        },
        replace: () => {},
      }}
    >
      {children}
    </PagesUIRouterProvider>
  )
}

function renderBadge(node: ReactNode) {
  return render(<RouterFixture>{node}</RouterFixture>)
}

afterEach(() => {
  cleanup()
  clearLastPushedHref()
})

const definition: PropertyDefinition = {
  id: "progress",
  title: "Progress",
  type: "progress",
}

describe("ProgressPropertyBadge — card context", () => {
  it("renders X/Y for a scalar value", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 5, total: 10 }}
        context="card"
      />
    )
    expect(screen.getByText("5/10")).toBeDefined()
  })

  it("renders 0/0 without throwing", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 0, total: 0 }}
        context="card"
      />
    )
    expect(screen.getByText("0/0")).toBeDefined()
  })
})

describe("ProgressPropertyBadge — detail context, no entries", () => {
  it("renders the same scalar text as the card", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 5, total: 10 }}
        context="detail"
      />
    )
    expect(screen.getByText("5/10")).toBeDefined()
  })
})

describe("ProgressPropertyBadge — detail context, with entries", () => {
  const value = {
    current: 30,
    total: 120,
    activeEntryKey: "c2",
    entries: {
      c1: { current: 15, total: 120, sortOrder: 2, label: "Aragoth" },
      c2: { current: 30, total: 120, sortOrder: 1, label: "Vesiana" },
    },
  }

  it("renders the top-level scalar plus one row per entry in CompletionPanelCard (x/y) z% format", () => {
    renderBadge(<ProgressPropertyBadge property={definition} value={value} context="detail" />)
    expect(screen.getAllByText("(30/120)")).toHaveLength(2)
    expect(screen.getAllByText("25%")).toHaveLength(2)
    expect(screen.getByText("Aragoth")).toBeDefined()
    expect(screen.getByText("Vesiana")).toBeDefined()
    expect(screen.getByText("(15/120)")).toBeDefined()
    expect(screen.getByText("13%")).toBeDefined()
  })

  it("renders entries sorted by sortOrder ascending (Vesiana sortOrder=1 before Aragoth sortOrder=2)", () => {
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={value} context="detail" />
    )
    const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-progress-entry]"))
    const labels = rows.map((row) => row.dataset.progressEntry)
    expect(labels).toEqual(["c2", "c1"])
  })

  it("applies text-accent to the active entry row only", () => {
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={value} context="detail" />
    )
    const activeAccent = container.querySelector('[data-progress-entry="c2"] .text-accent')
    const otherAccent = container.querySelector('[data-progress-entry="c1"] .text-accent')
    expect(activeAccent).not.toBeNull()
    expect(otherAccent).toBeNull()
  })

  it("applies text-tertiary to complete entry rows (current >= total) and not to incomplete rows", () => {
    const mixed = {
      current: 150,
      total: 240,
      activeEntryKey: "c2",
      entries: {
        c1: { current: 120, total: 120, sortOrder: 2, label: "Aragoth" },
        c2: { current: 30, total: 120, sortOrder: 1, label: "Vesiana" },
      },
    }
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={mixed} context="detail" />
    )
    const completeTertiary = container.querySelector('[data-progress-entry="c1"] .text-tertiary')
    const incompleteTertiary = container.querySelector('[data-progress-entry="c2"] .text-tertiary')
    expect(completeTertiary).not.toBeNull()
    expect(incompleteTertiary).toBeNull()
  })

  it("treats current === total as complete (boundary)", () => {
    const exact = {
      current: 10,
      total: 10,
      entries: {
        k: { current: 10, total: 10, sortOrder: 1, label: "Done" },
      },
    }
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={exact} context="detail" />
    )
    expect(container.querySelector('[data-progress-entry="k"] .text-tertiary')).not.toBeNull()
  })

  it("falls back to the entry key when label is missing", () => {
    const valueNoLabel = {
      current: 5,
      total: 10,
      activeEntryKey: "k",
      entries: { k: { current: 5, total: 10, sortOrder: 1 } },
    }
    renderBadge(
      <ProgressPropertyBadge property={definition} value={valueNoLabel} context="detail" />
    )
    expect(screen.getByText("k")).toBeDefined()
  })
})

describe("ProgressPropertyBadge — internal entries dialog", () => {
  const valueWithEntries = {
    current: 30,
    total: 120,
    activeEntryKey: "c2",
    entries: {
      c1: { current: 15, total: 120, sortOrder: 2, label: "Aragoth" },
      c2: { current: 30, total: 120, sortOrder: 1, label: "Vesiana" },
    },
  }

  it("card context with non-empty entries renders a <button> with cursor-pointer", () => {
    renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithEntries} context="card" />
    )
    const button = screen.getByRole("button")
    expect(button.tagName).toBe("BUTTON")
    expect(button.className).toContain("cursor-pointer")
    expect(screen.getByText("30/120")).toBeDefined()
  })

  it("card context with non-empty entries opens a dialog showing the entries breakdown", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={valueWithEntries}
        context="card"
        pageData={{ title: "Cadwell's Almanac" }}
      />
    )
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("Cadwell's Almanac")).toBeDefined()
    expect(screen.getByText("Aragoth")).toBeDefined()
    expect(screen.getByText("Vesiana")).toBeDefined()
    expect(screen.getByText("(15/120)")).toBeDefined()
    expect(screen.getByText("13%")).toBeDefined()
  })

  it("falls back to property.title when pageData has no title", () => {
    renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithEntries} context="card" />
    )
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("dialog").textContent).toContain("Progress")
  })

  it("card context with no entries property stays a <span> (no button role)", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 5, total: 10 }}
        context="card"
      />
    )
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("card context with empty entries object stays a <span> (no button role)", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 5, total: 10, entries: {} }}
        context="card"
      />
    )
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("scalar-detail context (no entries) does not render a button", () => {
    renderBadge(
      <ProgressPropertyBadge
        property={definition}
        value={{ current: 5, total: 10 }}
        context="detail"
      />
    )
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("detail context with entries does not render a button (entries render inline)", () => {
    renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithEntries} context="detail" />
    )
    expect(screen.queryByRole("button")).toBeNull()
  })
})

describe("ProgressPropertyBadge — entry href click-through", () => {
  const HREF_C2 = "/completion?tab=characters&character=c2&scrollTo=mount-training"
  const HREF_C1 = "/completion?tab=characters&character=c1&scrollTo=mount-training"

  const valueWithHrefs = {
    current: 30,
    total: 120,
    activeEntryKey: "c2",
    entries: {
      c1: { current: 15, total: 120, sortOrder: 2, label: "Aragoth", href: HREF_C1 },
      c2: { current: 30, total: 120, sortOrder: 1, label: "Vesiana", href: HREF_C2 },
    },
  }

  it("renders entries with href as <button> rows in detail context", () => {
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithHrefs} context="detail" />
    )
    const c2Button = container.querySelector('[data-progress-entry="c2"] button')
    const c1Button = container.querySelector('[data-progress-entry="c1"] button')
    expect(c2Button).not.toBeNull()
    expect(c1Button).not.toBeNull()
  })

  it("clicking an entry calls router.push with the entry's href", () => {
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithHrefs} context="detail" />
    )
    const c2Button = container.querySelector('[data-progress-entry="c2"] button')
    if (!c2Button) throw new Error("expected c2 row to render as a button")
    fireEvent.click(c2Button)
    expect(lastPushedHref).toBe(HREF_C2)
  })

  it("entries without href stay non-interactive", () => {
    const valueMixed = {
      current: 15,
      total: 120,
      activeEntryKey: "c1",
      entries: {
        c1: { current: 15, total: 120, sortOrder: 1, label: "Aragoth" },
      },
    }
    const { container } = renderBadge(
      <ProgressPropertyBadge property={definition} value={valueMixed} context="detail" />
    )
    expect(container.querySelector('[data-progress-entry="c1"] button')).toBeNull()
  })

  it("clicking an href entry inside the dialog closes the dialog and navigates", () => {
    renderBadge(
      <ProgressPropertyBadge property={definition} value={valueWithHrefs} context="card" />
    )
    fireEvent.click(screen.getByRole("button", { name: /30\/120/ }))
    const dialog = screen.getByRole("dialog")
    const vesianaRow = dialog.querySelector('[data-progress-entry="c2"] button')
    if (!vesianaRow) throw new Error("expected c2 entry to be a clickable button in the dialog")
    fireEvent.click(vesianaRow)
    expect(lastPushedHref).toBe(HREF_C2)
    expect(screen.queryByRole("dialog")).toBeNull()
  })
})
