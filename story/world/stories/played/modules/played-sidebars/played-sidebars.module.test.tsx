import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
import {
  BOTH,
  CLOSED,
  NONE,
  ONE,
  PlayedSidebars,
  shownOf,
  sidebarsFitting,
  toggled,
} from "akasha/story/world/stories/played/modules/played-sidebars/played-sidebars.module.code.tsx"
import type { ReactNode } from "react"

const EVERY: ReadonlySet<string> = new Set(["character", "journal", "map", "chat"])

function laid(placed: ReadonlyMap<string, ReactNode>) {
  return (
    <PlayedSidebars
      head={<h1>Otherwhere</h1>}
      panelsAbove={null}
      runDrawn={<p>prose</p>}
      placed={placed}
    />
  )
}

test("both sidebars fit beside the turns at desktop width", () => {
  expect(sidebarsFitting(1184)).toBe(BOTH)
})

test("one sidebar fits beside the turns at a middling width", () => {
  expect(sidebarsFitting(844)).toBe(ONE)
})

test("no sidebar fits beside the turns at a narrow width", () => {
  expect(sidebarsFitting(700)).toBe(NONE)
})

test("where both fit, opening one side leaves the other open", () => {
  const left = toggled(CLOSED, "character", "left", EVERY, BOTH)
  const both = toggled(left, "map", "right", EVERY, BOTH)
  expect(shownOf(both, EVERY, BOTH)).toEqual({ left: "character", right: "map" })
})

test("where only one fits, opening one side closes the other", () => {
  const left = toggled(CLOSED, "character", "left", EVERY, ONE)
  const right = toggled(left, "map", "right", EVERY, ONE)
  expect(shownOf(right, EVERY, ONE)).toEqual({ left: null, right: "map" })
})

test("a side shows one place at a time", () => {
  const character = toggled(CLOSED, "character", "left", EVERY, BOTH)
  const journal = toggled(character, "journal", "left", EVERY, BOTH)
  expect(shownOf(journal, EVERY, BOTH)).toEqual({ left: "journal", right: null })
})

test("pressing the open place's button closes it", () => {
  const open = toggled(CLOSED, "chat", "right", EVERY, BOTH)
  expect(shownOf(toggled(open, "chat", "right", EVERY, BOTH), EVERY, BOTH)).toEqual({
    left: null,
    right: null,
  })
})

test("a place the story names no panel in is never shown", () => {
  const open = toggled(CLOSED, "map", "right", EVERY, BOTH)
  expect(shownOf(open, new Set(["character"]), BOTH)).toEqual({ left: null, right: null })
})

test("a story naming no panel in a sidebar place has no top bar", () => {
  const { container } = render(laid(new Map()))
  expect(container.querySelectorAll("button").length).toBe(0)
})

test("a button is there only for a place with a panel", () => {
  const { getByRole, queryByRole } = render(laid(new Map([["journal", <p key="j">quests</p>]])))
  expect(getByRole("button", { name: "Journal" })).toBeDefined()
  expect(queryByRole("button", { name: "Character" })).toBeNull()
})

test("a button stays pressed while its place is open, and the place is drawn", () => {
  const { getByRole, queryByText } = render(laid(new Map([["journal", <p key="j">quests</p>]])))
  expect(queryByText("quests")).toBeNull()
  fireEvent.click(getByRole("button", { name: "Journal" }))
  expect(getByRole("button", { name: "Journal" }).getAttribute("aria-pressed")).toBe("true")
  expect(queryByText("quests")).not.toBeNull()
})
