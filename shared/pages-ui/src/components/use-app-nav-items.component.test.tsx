import { describe, expect, mock, test } from "bun:test"
import { renderHook } from "@shared/utils-test"
import * as realNavMutations from "../supabase/use-nav-mutations"

const realSlugFromName = realNavMutations.slugFromName

const NAV_ROWS = [
  { id: "p-personas", title: "Personas", sortOrder: 1, mobilePinOrder: 4 },
  { id: "p-tracking", title: "Tracking", sortOrder: 2, mobilePinOrder: 1 },
  { id: "p-projects", title: "Projects", sortOrder: 3, mobilePinOrder: 3 },
  { id: "p-tasks", title: "Tasks", sortOrder: 4, mobilePinOrder: 2 },
  { id: "p-unpinned", title: "Unpinned", sortOrder: 5 },
]

mock.module("../supabase/use-pages", () => ({
  usePagesSupabase: () => ({
    rows: NAV_ROWS,
    isLoading: false,
    error: null,
    hasMore: false,
    loadMore: () => {},
    totalCount: NAV_ROWS.length,
  }),
}))

mock.module("../supabase/use-nav-mutations", () => ({
  useNavMutations: () => ({
    createNav: async () => {},
    reorderNavs: async () => {},
    setNavIcon: async () => {},
    setNavParent: async () => {},
  }),
  slugFromName: realSlugFromName,
}))

const { useAppNavItems } = await import("./use-app-nav-items")

describe("useAppNavItems — surfaces mobilePinOrder onto AppNavItem (transform seam)", () => {
  test("each pinned nav row's mobilePinOrder reaches the matching AppNavItem; unpinned omits the key", () => {
    const { result } = renderHook(() => useAppNavItems({ appId: "app-1", primaryItems: [] }))
    const byId = new Map(result.current.items.map((i) => [i.id, i]))

    expect(byId.get("view-p-tracking")?.mobilePinOrder).toBe(1)
    expect(byId.get("view-p-tasks")?.mobilePinOrder).toBe(2)
    expect(byId.get("view-p-projects")?.mobilePinOrder).toBe(3)
    expect(byId.get("view-p-personas")?.mobilePinOrder).toBe(4)

    const unpinned = byId.get("view-p-unpinned")
    expect(unpinned).toBeDefined()
    expect(unpinned?.mobilePinOrder).toBeUndefined()
    expect("mobilePinOrder" in (unpinned ?? {})).toBe(false)
  })
})
