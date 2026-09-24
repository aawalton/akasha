import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { beforeEach, expect, test } from "bun:test"
import { render } from "@testing-library/react"
import type { PanelRun } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { PlayedChannel } from "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"

const SCROLLED: Element[] = []

beforeEach(() => {
  SCROLLED.length = 0
  HTMLElement.prototype.scrollIntoView = function scrolled(this: HTMLElement) {
    SCROLLED.push(this)
  }
})

const turnOf = (id: string, text: string): ClientStoryTurn => ({ id, title: id, text })

const runOf = (turns: readonly ClientStoryTurn[]): PanelRun => ({
  turns,
  beats: undefined,
  hrefById: new Map(),
  earlier: 0,
  titles: "hidden",
  pastTurns: undefined,
  gameExternalId: undefined,
  submitPlayerAction: undefined,
})

const ONE = turnOf("turn-1", "The lamp is dark.")

const TWO = turnOf("turn-2", "The lamp is lit.")

test("the run first drawn is scrolled nowhere", () => {
  render(<PlayedChannel {...runOf([ONE])} />)
  expect(SCROLLED).toEqual([])
})

test("a turn arriving is scrolled to by its NEWEST line", () => {
  const { rerender, container } = render(<PlayedChannel {...runOf([ONE])} />)
  rerender(<PlayedChannel {...runOf([ONE, TWO])} />)
  expect(SCROLLED).toHaveLength(1)
  expect(SCROLLED[0]?.textContent).toBe("newest")
  expect(container.textContent?.indexOf("newest")).toBeLessThan(
    container.textContent?.indexOf(TWO.text) ?? -1
  )
})

test("the run drawn again with no new turn is scrolled nowhere", () => {
  const { rerender } = render(<PlayedChannel {...runOf([ONE, TWO])} />)
  rerender(<PlayedChannel {...runOf([ONE, { ...TWO, text: "The lamp burns low." }])} />)
  expect(SCROLLED).toEqual([])
})

test("a run that was empty is scrolled nowhere when its turns arrive", () => {
  const { rerender } = render(<PlayedChannel {...runOf([])} />)
  rerender(<PlayedChannel {...runOf([ONE, TWO])} />)
  expect(SCROLLED).toEqual([])
})
