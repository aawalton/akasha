import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, mock, test } from "bun:test"
import { renderHook } from "@testing-library/react"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const SEAT = toPageTypeSlug("seat")

const ID = "01a11bee-f399-7000-a705-fdd4e02d8ca0"

const ASTRA = { _id: ID, properties: { title: "astra" } }

const READ = { page: true, related: true }

const usePage = await import("akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts")
mock.module("akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts", () => ({
  ...usePage,
  usePage: () => ({ page: READ.page ? ASTRA : null, isLoading: !READ.page }),
}))
const hooks = await import("akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts")
mock.module("akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts", () => ({
  ...hooks,
  useAllPages: () => ({ pages: [], isLoading: false, isDegraded: false, error: null }),
  useRelatedPages: () => ({ relatedPages: [], isLoading: !READ.related }),
}))
const navigation = await import(
  "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
)
mock.module("akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx", () => ({
  ...navigation,
  usePagesUIRouter: () => ({ push: () => undefined }),
}))
const optimistic = await import(
  "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
)
mock.module(
  "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx",
  () => ({
    ...optimistic,
    useSetPropertyOptimistic: () => () => undefined,
  })
)

const { usePageDefaultContent } = await import(
  "akasha/page/ui/component/modules/use-page-default-content/use-page-default-content.module.code.ts"
)

test("a page read while its related pages are asked for is no longer loading itself", () => {
  READ.page = true
  READ.related = false
  const drawn = renderHook(() => usePageDefaultContent({ pageTypeSlug: SEAT, id: ID }))
  expect(drawn.result.current.isLoading).toBe(true)
  expect(drawn.result.current.pageIsLoading).toBe(false)
  drawn.unmount()
})

test("a page not yet read is loading itself", () => {
  READ.page = false
  READ.related = true
  const drawn = renderHook(() => usePageDefaultContent({ pageTypeSlug: SEAT, id: ID }))
  expect(drawn.result.current.pageIsLoading).toBe(true)
  drawn.unmount()
})
