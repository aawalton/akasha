import { afterEach, describe, expect, it, mock } from "bun:test"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { ViewSettingsButton } from "./page-system-view-settings"

afterEach(() => {
  cleanup()
})

const initialGroupBy: string | null = null
const baseProps = {
  groupOptions: [{ value: "g1", label: "Group 1" }],
  groupBy: initialGroupBy,
  onGroupByChange: () => {},
  groupSorts: [],
  onGroupSortsChange: () => {},
  groupSortOptions: [],
  defaultGroupSorts: [],
}

const openMenu = () => {
  fireEvent.click(screen.getByRole("button", { name: "View settings" }))
}

describe("ViewSettingsButton — Layout entry", () => {
  const openLayoutSubview = () => {
    openMenu()
    fireEvent.click(screen.getByRole("button", { name: /Layout/i }))
  }

  it("shows the Layout entry when a handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} layout="cards" onLayoutChange={() => {}} />)
    openMenu()
    expect(screen.getByRole("button", { name: /Layout/i })).toBeDefined()
  })

  it("hides the Layout entry when no handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} />)
    openMenu()
    expect(screen.queryByText("Layout")).toBeNull()
  })

  it("renders the Layout entry directly above Page Type", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        layout="cards"
        onLayoutChange={() => {}}
        pageTypeOptions={[{ id: "pt-task", name: "Task" }]}
        pageTypeId="pt-task"
        onPageTypeChange={() => {}}
      />
    )
    openMenu()
    const layout = screen.getByText("Layout")
    const pageType = screen.getByText("Page Type")
    expect(layout.compareDocumentPosition(pageType) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
  })

  it("offers Cards and Table options", () => {
    render(<ViewSettingsButton {...baseProps} onLayoutChange={() => {}} />)
    openLayoutSubview()
    expect(screen.getByText("Cards")).toBeDefined()
    expect(screen.getByText("Table")).toBeDefined()
  })

  it("invokes onLayoutChange with cards when Cards is selected", () => {
    const onLayoutChange = mock((_layout: string) => {})
    render(<ViewSettingsButton {...baseProps} onLayoutChange={onLayoutChange} />)
    openLayoutSubview()
    fireEvent.click(screen.getByText("Cards"))
    expect(onLayoutChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onLayoutChange.mock.calls)[0]).toBe("cards")
  })

  it("invokes onLayoutChange with table when Table is selected", () => {
    const onLayoutChange = mock((_layout: string) => {})
    render(<ViewSettingsButton {...baseProps} onLayoutChange={onLayoutChange} />)
    openLayoutSubview()
    fireEvent.click(screen.getByText("Table"))
    expect(onLayoutChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onLayoutChange.mock.calls)[0]).toBe("table")
  })

  it("the sub-view exposes a back button that returns to the main menu", () => {
    render(<ViewSettingsButton {...baseProps} onLayoutChange={() => {}} />)
    openLayoutSubview()
    fireEvent.click(screen.getByRole("button", { name: "Back" }))
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull()
    expect(screen.getByRole("button", { name: /Layout/i })).toBeDefined()
  })
})

describe("ViewSettingsButton — Timeline entry", () => {
  const timelineProps = {
    timelinePropertyOptions: [
      { id: "start", label: "Start" },
      { id: "end", label: "End" },
    ],
    onTimelineStartChange: () => {},
    onTimelineEndChange: () => {},
  }

  it("shows the Timeline entry when layout is 'timeline' and the handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} {...timelineProps} layout="timeline" />)
    openMenu()
    expect(screen.getByText("Timeline")).toBeDefined()
  })

  it("hides the Timeline entry under a non-timeline layout even when the handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} {...timelineProps} layout="cards" />)
    openMenu()
    expect(screen.queryByText("Timeline")).toBeNull()
  })

  it("hides the Timeline entry when no timeline handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} layout="timeline" />)
    openMenu()
    expect(screen.queryByText("Timeline")).toBeNull()
  })

  it("opens the Timeline sub-view when the entry is clicked under the timeline layout", () => {
    render(<ViewSettingsButton {...baseProps} {...timelineProps} layout="timeline" />)
    openMenu()
    fireEvent.click(screen.getByText("Timeline"))
    expect(screen.getByRole("button", { name: "Back" })).toBeDefined()
  })
})

describe("ViewSettingsButton — Gallery entry", () => {
  it("shows the Gallery entry when layout is 'gallery' and a gallery handler is provided", () => {
    render(
      <ViewSettingsButton {...baseProps} layout="gallery" onGalleryCardSizeChange={() => {}} />
    )
    openMenu()
    expect(screen.getByText("Gallery")).toBeDefined()
  })

  it("hides the Gallery entry under a non-gallery layout even when a handler is provided", () => {
    render(<ViewSettingsButton {...baseProps} layout="cards" onGalleryCardSizeChange={() => {}} />)
    openMenu()
    expect(screen.queryByText("Gallery")).toBeNull()
  })
})
