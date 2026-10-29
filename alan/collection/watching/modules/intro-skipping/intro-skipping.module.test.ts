import { expect, test } from "bun:test"
import {
  type Buttons,
  pressedShown,
  skippable,
} from "akasha/alan/collection/watching/modules/intro-skipping/intro-skipping.module.code.ts"

type Button = {
  readonly textContent: string
  readonly getAttribute: (name: string) => string | null
  readonly click: () => void
  readonly clicks: { n: number }
}

function buttonOf(text: string, label: string | null = null): Button {
  const clicks = { n: 0 }
  return {
    textContent: text,
    getAttribute: (name) => (name === "aria-label" ? label : null),
    click: () => {
      clicks.n += 1
    },
    clicks,
  }
}

function rootOf(buttons: readonly Button[]): Buttons {
  return { querySelectorAll: () => buttons }
}

test("the words that say skip and what is skipped are the words read", () => {
  expect(skippable("Skip Intro")).toBe(true)
  expect(skippable("skip credits")).toBe(true)
  expect(skippable("  Skip   Recap  ")).toBe(true)
  expect(skippable("Skip to the next episode")).toBe(false)
  expect(skippable("Intro")).toBe(false)
  expect(skippable(null)).toBe(false)
})

test("a button saying skip intro is pressed once and the page drawing it again presses nothing", () => {
  const button = buttonOf("Skip Intro")
  const root = rootOf([button])
  expect(pressedShown(root)).toBe(1)
  expect(pressedShown(root)).toBe(0)
  expect(button.clicks.n).toBe(1)
})

test("a button saying something else is left where it is", () => {
  const button = buttonOf("Play")
  expect(pressedShown(rootOf([button]))).toBe(0)
  expect(button.clicks.n).toBe(0)
})

test("a button whose label says skip is pressed however little its words say", () => {
  const button = buttonOf("", "Skip Credits")
  expect(pressedShown(rootOf([button]))).toBe(1)
  expect(button.clicks.n).toBe(1)
})
