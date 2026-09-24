import { expect, test } from "bun:test"
import {
  deliveryCounts,
  widgetTapId,
  widgetTapped,
} from "akasha/alan/harness/readout/modules/widget-tap-link/widget-tap-link.module.code.ts"

test("a link names its widget in the fragment", () => {
  expect(widgetTapped("capacitor://monarch-relay#widget=alanwalton-categorize")).toBe(
    "alanwalton-categorize"
  )
})

test("two links sharing a path and a query name different widgets", () => {
  const path = "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031"
  expect(widgetTapped(`${path}#widget=alanwalton-upkeep-stoplights`)).toBe(
    "alanwalton-upkeep-stoplights"
  )
  expect(widgetTapped(`${path}#widget=alanwalton-surplus`)).toBe("alanwalton-surplus")
})

test("a link naming no widget names none", () => {
  expect(widgetTapped("capacitor://localhost/nav/tasks-a7242626")).toBe(null)
  expect(widgetTapped("capacitor://localhost/nav/tasks-a7242626#tab=1")).toBe(null)
  expect(widgetTapped("capacitor://localhost/nav/tasks-a7242626?widget=alanwalton-surplus")).toBe(
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

test("a link names its tap beside its widget in the fragment", () => {
  const link =
    "alanwalton://localhost/nav/tracking-690c624f?tab=20f5f031#widget=alanwalton-surplus&tap=5f0c3a7e-9d1b-4c2a-8e6f-0b1d2c3e4f5a"
  expect(widgetTapped(link)).toBe("alanwalton-surplus")
  expect(widgetTapId(link)).toBe("5f0c3a7e-9d1b-4c2a-8e6f-0b1d2c3e4f5a")
})

test("two taps on one widget name two taps", () => {
  const link = "alanwalton://monarch-relay#widget=alanwalton-categorize"
  expect(widgetTapId(`${link}&tap=a`)).not.toBe(widgetTapId(`${link}&tap=b`))
})

test("a link naming no tap names none", () => {
  expect(widgetTapId("capacitor://monarch-relay#widget=alanwalton-categorize")).toBe(null)
  expect(widgetTapId("capacitor://monarch-relay#widget=alanwalton-categorize&tap=")).toBe(null)
  expect(widgetTapId("capacitor://localhost/nav/tasks-a7242626?tap=a#widget=x")).toBe(null)
})

test("text that is no link names no tap", () => {
  expect(widgetTapId("not a url")).toBe(null)
  expect(widgetTapId(null)).toBe(null)
})

const SURPLUS = "alanwalton://localhost/nav/tracking-690c624f#widget=alanwalton-surplus"

test("two taps on one widget straight after launch count two", () => {
  const launch = `${SURPLUS}&tap=a`
  expect(deliveryCounts(launch, null, new Set())).toBe(true)
  expect(deliveryCounts(`${SURPLUS}&tap=b`, launch, new Set(["a"]))).toBe(true)
})

test("one tap arriving twice counts once", () => {
  const launch = `${SURPLUS}&tap=a`
  expect(deliveryCounts(launch, launch, new Set(["a"]))).toBe(false)
})

test("a link naming no tap that repeats the launch link counts nothing", () => {
  expect(deliveryCounts(SURPLUS, SURPLUS, new Set())).toBe(false)
})

test("a link naming no tap counts where it is not the launch link repeated", () => {
  expect(deliveryCounts(SURPLUS, null, new Set())).toBe(true)
  expect(deliveryCounts(SURPLUS, `${SURPLUS}&tap=a`, new Set(["a"]))).toBe(true)
})
