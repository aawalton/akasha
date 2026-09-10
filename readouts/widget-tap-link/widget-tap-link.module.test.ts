import { expect, test } from "bun:test"
import { widgetTapped } from "./widget-tap-link.module.code.ts"

test("a link names its widget in the fragment", () => {
  expect(widgetTapped("capacitor://monarch-relay#widget=alanwalton-categorize")).toBe(
    "alanwalton-categorize"
  )
})

test("two links sharing a path and a query name different widgets", () => {
  const path = "https://alanwalton.com/nav/tracking-690c624f?tab=20f5f031"
  expect(widgetTapped(`${path}#widget=alanwalton-upkeep-stoplights`)).toBe(
    "alanwalton-upkeep-stoplights"
  )
  expect(widgetTapped(`${path}#widget=alanwalton-surplus`)).toBe("alanwalton-surplus")
})

test("a link naming no widget names none", () => {
  expect(widgetTapped("https://alanwalton.com/nav/tasks-a7242626")).toBe(null)
  expect(widgetTapped("https://alanwalton.com/nav/tasks-a7242626#tab=1")).toBe(null)
  expect(widgetTapped("https://alanwalton.com/nav/tasks-a7242626?widget=alanwalton-surplus")).toBe(
    null
  )
})

test("a link naming a widget with an empty name names none", () => {
  expect(widgetTapped("capacitor://monarch-relay#widget=")).toBe(null)
})

test("text that is no link names no widget", () => {
  expect(widgetTapped("not a url")).toBe(null)
  expect(widgetTapped(null)).toBe(null)
  expect(widgetTapped(7)).toBe(null)
})
