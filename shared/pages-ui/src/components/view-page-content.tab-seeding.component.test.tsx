import { afterEach, describe, expect, mock, test } from "bun:test"
import { LayoutRouterProvider } from "@shared/design-layout/router-context"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"

const NAV_ID = "52d15697-3e06-4762-ab64-51ee9aae0c49"
const VIEW_FIRST = "019f3401-00e8-7d15-8107-d8b48c429de8"
const VIEW_SECOND = "019f3401-017c-76af-8c2f-5e27f4a6e5aa"

mock.module("../supabase/hooks", () => ({
  usePageByIdSuffix: () => ({
    page: { _id: NAV_ID, userId: "u", properties: { title: "Home", pageTypeId: "pt-nav" } },
    isLoading: false,
  }),
  useAllPages: () => ({ pages: [], isLoading: false }),
  useViewsForNavItem: () => ({
    views: [
      { _id: VIEW_FIRST, userId: "u", properties: { title: "Favorites" } },
      { _id: VIEW_SECOND, userId: "u", properties: { title: "Recently Viewed" } },
    ],
    isLoading: false,
  }),
  useRelatedPages: () => [],
}))

mock.module("../supabase/use-option-list-lookup", () => ({
  useOptionListLookup: () => () => undefined,
  useResolvedDefinitions: () => [],
}))

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => () => {},
}))

mock.module("../supabase/use-view-callbacks", () => ({
  useSupabaseViewCallbacks: () => ({
    onCreateView: () => {},
    onUpdateView: () => {},
    onDeleteView: () => {},
    onDuplicateView: () => {},
    onReorderViews: () => {},
    onRenameView: () => {},
  }),
}))

const { ViewPageContent } = await import("./view-page-content")

function activeViewName(): string | null {
  const title = document.title
  const sep = title.indexOf(" | ")
  return sep === -1 ? null : title.slice(sep + 3)
}

function renderWithTab(tab: string | null) {
  const router = {
    pathname: "/nav/stories-9aae0c49",
    searchParams: {
      get: (name: string) => (name === "tab" ? tab : null),
      toString: () => (tab != null ? `tab=${tab}` : ""),
    },
  }
  return render(
    <LayoutRouterProvider value={router}>
      <ViewPageContent navItemIdParam="stories-9aae0c49" />
    </LayoutRouterProvider>
  )
}

afterEach(() => {
  cleanup()
  document.title = ""
})

describe("ViewPageContent — ?tab= seeds the active view (#15612)", () => {
  test("a ?tab= pointing at a non-first view selects that view, not the first", () => {
    renderWithTab(VIEW_SECOND)
    expect(activeViewName()).toBe("Recently Viewed")
  })

  test("no ?tab= falls back to the first view", () => {
    renderWithTab(null)
    expect(activeViewName()).toBe("Favorites")
  })
})
