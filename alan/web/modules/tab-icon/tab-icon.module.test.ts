import { expect, test } from "bun:test"
import { tabIconHref } from "akasha/alan/web/modules/tab-icon/tab-icon.module.code.tsx"

const SITE_ICON = "/favicon.svg"

const ROOT = { data: { document: { title: "Alan Walton" } } }

const NAV = { data: { kind: "nav", faviconIdSuffix: "a8b25f2b", faviconIcon: "Library" } }

const DETAIL = { data: { kind: "detail", faviconIdSuffix: null, faviconIcon: "" } }

test("a nav page's tab names the icon its nav page states", () => {
  expect(tabIconHref([ROOT, NAV])).toBe("/api/nav-icon/a8b25f2b?icon=Library")
})

test("a page other than a nav page shows the site's icon", () => {
  expect(tabIconHref([ROOT, DETAIL])).toBe(SITE_ICON)
})

test("a route with nothing loaded shows the site's icon", () => {
  expect(tabIconHref([ROOT, undefined])).toBe(SITE_ICON)
  expect(tabIconHref([])).toBe(SITE_ICON)
})

test("an icon name is carried in the address as a query value", () => {
  const spaced = { data: { faviconIdSuffix: "d9d3d93c", faviconIcon: "users round" } }
  expect(tabIconHref([ROOT, spaced])).toBe("/api/nav-icon/d9d3d93c?icon=users%20round")
})

test("a nav page stating no icon still names its own icon route", () => {
  const bare = { data: { faviconIdSuffix: "d9d3d93c" } }
  expect(tabIconHref([ROOT, bare])).toBe("/api/nav-icon/d9d3d93c?icon=")
})

test("the deepest route naming a nav page names the tab icon", () => {
  const outer = { data: { faviconIdSuffix: "00000000", faviconIcon: "House" } }
  expect(tabIconHref([ROOT, outer, NAV])).toBe("/api/nav-icon/a8b25f2b?icon=Library")
})
