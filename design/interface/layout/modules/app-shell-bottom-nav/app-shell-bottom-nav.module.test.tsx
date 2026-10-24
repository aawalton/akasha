import { expect, test } from "bun:test"
import { offersMore } from "akasha/design/interface/layout/modules/app-shell-bottom-nav/app-shell-bottom-nav.module.code.tsx"
import type { AppNavItem } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { selectBottomNavItems } from "akasha/design/interface/layout/modules/select-bottom-nav-items/select-bottom-nav-items.module.code.ts"
import { selectDrawerGroups } from "akasha/design/interface/layout/modules/select-drawer-groups/select-drawer-groups.module.code.ts"

const THERAPY: AppNavItem = {
  id: "view-therapy",
  label: "Therapy",
  shortLabel: "Therapy",
  href: "/therapy",
}

const SETTINGS_LINK = <a href="/settings">Settings</a>

const MOST_SHOWN = 5

test("a reader whose one nav item is Therapy is shown Therapy and offered More for Settings", () => {
  const shown = selectBottomNavItems([THERAPY], undefined, MOST_SHOWN)
  expect(shown).toEqual([THERAPY])
  const groups = selectDrawerGroups([THERAPY], new Set(shown.map((one) => one.id)))
  expect(groups).toEqual([])
  expect(offersMore(groups, SETTINGS_LINK)).toBe(true)
})

test("a shell with no footer and every item shown offers no More", () => {
  expect(offersMore([], undefined)).toBe(false)
})

test("items past what the bar shows are offered under More with no footer", () => {
  expect(offersMore([{ items: [THERAPY] }], undefined)).toBe(true)
})
