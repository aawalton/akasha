import { describe, expect, it } from "bun:test"
import { fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { FilterableList, FilterableListItem } from "./filterable-list"
import { SurfaceProvider } from "./surface-provider"

const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"]

function renderList(items: readonly string[], threshold?: number) {
  return render(
    <SurfaceProvider level={3}>
      <FilterableList filterThreshold={threshold}>
        {items.map((label) => (
          <FilterableListItem key={label}>{label}</FilterableListItem>
        ))}
      </FilterableList>
    </SurfaceProvider>
  )
}

describe("FilterableList — capability: long selectable lists expose a filter focused on open", () => {
  it("renders a filter input, focused on open, when item count exceeds the threshold", () => {
    renderList(FRUITS)
    const input = screen.getByPlaceholderText("Filter...")
    expect(input).toBeTruthy()
    expect(document.activeElement).toBe(input)
  })

  it("renders no filter input when item count is at or below the threshold", () => {
    renderList(FRUITS.slice(0, 5))
    expect(screen.queryByPlaceholderText("Filter...")).toBeNull()
  })

  it("hides non-matching items as the user types", () => {
    renderList(FRUITS)
    const input = screen.getByPlaceholderText("Filter...")
    fireEvent.change(input, { target: { value: "ap" } })

    const apple = screen.getByText("Apple").closest("[data-slot='filterable-list-item']")
    const grape = screen.getByText("Grape").closest("[data-slot='filterable-list-item']")
    const banana = screen.getByText("Banana").closest("[data-slot='filterable-list-item']")

    expect(apple?.getAttribute("aria-hidden")).not.toBe("true")
    expect(grape?.getAttribute("aria-hidden")).not.toBe("true")
    expect(banana?.getAttribute("aria-hidden")).toBe("true")
  })

  it("honors filterThreshold=0 to disable the filter entirely", () => {
    renderList(FRUITS, 0)
    expect(screen.queryByPlaceholderText("Filter...")).toBeNull()
  })
})
