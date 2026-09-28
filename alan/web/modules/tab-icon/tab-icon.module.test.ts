import { expect, test } from "bun:test"
import { tabIconHref } from "akasha/alan/web/modules/tab-icon/tab-icon.module.code.tsx"

const SITE_ICON = "/favicon.svg"

const ROOT = { data: { document: { title: "Alan Walton" } } }

const NAV = { data: { kind: "nav", tabIcon: "Library" } }

const STORY = { data: { kind: "detail", tabIcon: "gamepad-2" } }

const PLAIN = { data: { kind: "detail", tabIcon: null } }

test("a nav page's tab names the icon its nav page states", () => {
  expect(tabIconHref([ROOT, NAV])).toBe("/api/icon/Library")
})

test("any other page's tab names the icon that page is drawn with", () => {
  expect(tabIconHref([ROOT, STORY])).toBe("/api/icon/gamepad-2")
})

test("a page drawn with no icon of its own shows the site's icon", () => {
  expect(tabIconHref([ROOT, PLAIN])).toBe(SITE_ICON)
  expect(tabIconHref([ROOT, { data: { tabIcon: "" } }])).toBe(SITE_ICON)
})

test("a route with nothing loaded shows the site's icon", () => {
  expect(tabIconHref([ROOT, undefined])).toBe(SITE_ICON)
  expect(tabIconHref([])).toBe(SITE_ICON)
})

test("an icon name is carried in the address as one segment", () => {
  expect(tabIconHref([ROOT, { data: { tabIcon: "users round/x" } }])).toBe(
    "/api/icon/users%20round%2Fx"
  )
})

test("an icon shown live names the tab icon over what any route loaded", () => {
  expect(tabIconHref([ROOT, STORY], { icon: "swords" })).toBe("/api/icon/swords")
})

test("a page shown live with no icon shows the site's icon", () => {
  expect(tabIconHref([ROOT, STORY], { icon: null })).toBe(SITE_ICON)
  expect(tabIconHref([ROOT, STORY], { icon: "" })).toBe(SITE_ICON)
})

test("the deepest route naming an icon names the tab icon", () => {
  const outer = { data: { tabIcon: "House" } }
  expect(tabIconHref([ROOT, outer, STORY])).toBe("/api/icon/gamepad-2")
})
