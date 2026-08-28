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

const openPageSizeSubview = () => {
  openMenu()
  fireEvent.click(screen.getByRole("button", { name: /^Page Size$/i }))
}

const editBadge = (label: RegExp, value: string) => {
  fireEvent.click(screen.getByRole("button", { name: label }))
  const input = screen.getByRole<HTMLInputElement>("textbox")
  fireEvent.change(input, { target: { value } })
  fireEvent.blur(input)
}

describe("ViewSettingsButton — Page Size sub-view", () => {
  it("renders a 'Page Size' menu item even when no page-size props are passed", () => {
    render(<ViewSettingsButton {...baseProps} />)
    openMenu()
    expect(screen.getByRole("button", { name: /^Page Size$/i })).toBeDefined()
  })

  it("clicking 'Page Size' switches to the page-size sub-view", () => {
    render(<ViewSettingsButton {...baseProps} />)
    openPageSizeSubview()
    expect(screen.getByRole("button", { name: "Back" })).toBeDefined()
  })

  it("renders one 'Page Size' control when groupBy is unset", () => {
    render(<ViewSettingsButton {...baseProps} groupBy={null} pageSize={12} />)
    openPageSizeSubview()
    expect(screen.getByRole("button", { name: /^Page Size$/i })).toBeDefined()
    expect(screen.queryByRole("button", { name: /Group Page Size/i })).toBeNull()
    expect(screen.queryByRole("button", { name: /Item Page Size/i })).toBeNull()
  })

  it("renders the default value (12) when no pageSize prop is passed", () => {
    render(<ViewSettingsButton {...baseProps} groupBy={null} />)
    openPageSizeSubview()
    const control = screen.getByRole("button", { name: /^Page Size$/i })
    expect(control.textContent).toContain("12")
  })

  it("renders 'Group Page Size' and 'Item Page Size' controls when groupBy is set", () => {
    render(
      <ViewSettingsButton {...baseProps} groupBy="status" groupPageSize={6} itemPageSize={12} />
    )
    openPageSizeSubview()
    expect(screen.getByRole("button", { name: /Group Page Size/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /Item Page Size/i })).toBeDefined()
    expect(screen.queryByRole("button", { name: /^Page Size$/i })).toBeNull()
  })

  it("shows the current groupPageSize and itemPageSize values when groupBy is set", () => {
    render(
      <ViewSettingsButton {...baseProps} groupBy="status" groupPageSize={4} itemPageSize={20} />
    )
    openPageSizeSubview()
    const groupControl = screen.getByRole("button", { name: /Group Page Size/i })
    const itemControl = screen.getByRole("button", { name: /Item Page Size/i })
    expect(groupControl.textContent).toContain("4")
    expect(itemControl.textContent).toContain("20")
  })

  it("invokes onPageSizeChange with the new numeric value when the page-size control is edited", () => {
    const onPageSizeChange = mock((_n: number) => {})
    render(
      <ViewSettingsButton
        {...baseProps}
        groupBy={null}
        pageSize={12}
        onPageSizeChange={onPageSizeChange}
      />
    )
    openPageSizeSubview()
    editBadge(/^Page Size$/i, "30")
    expect(onPageSizeChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onPageSizeChange.mock.calls)[0]).toBe(30)
  })

  it("invokes onGroupPageSizeChange when the group-page-size control is edited", () => {
    const onGroupPageSizeChange = mock((_n: number) => {})
    render(
      <ViewSettingsButton
        {...baseProps}
        groupBy="status"
        groupPageSize={6}
        itemPageSize={12}
        onGroupPageSizeChange={onGroupPageSizeChange}
      />
    )
    openPageSizeSubview()
    editBadge(/Group Page Size/i, "8")
    expect(onGroupPageSizeChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onGroupPageSizeChange.mock.calls)[0]).toBe(8)
  })

  it("invokes onItemPageSizeChange when the item-page-size control is edited", () => {
    const onItemPageSizeChange = mock((_n: number) => {})
    render(
      <ViewSettingsButton
        {...baseProps}
        groupBy="status"
        groupPageSize={6}
        itemPageSize={12}
        onItemPageSizeChange={onItemPageSizeChange}
      />
    )
    openPageSizeSubview()
    editBadge(/Item Page Size/i, "25")
    expect(onItemPageSizeChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onItemPageSizeChange.mock.calls)[0]).toBe(25)
  })

  it("the sub-view exposes a back button that returns to the main menu", () => {
    render(<ViewSettingsButton {...baseProps} />)
    openPageSizeSubview()
    fireEvent.click(screen.getByRole("button", { name: "Back" }))
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull()
    expect(screen.getByRole("button", { name: /^Page Size$/i })).toBeDefined()
  })
})
