import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { render, waitFor } from "@testing-library/react"
import { PlayedLayout } from "akasha/story/world/stories/played/modules/played-shell/played-shell.module.code.tsx"
import type { ReactNode } from "react"

const WIDE = "max-w-[1100px]"

const NARROW = "max-w-[820px]"

function DrawsNothing() {
  return null
}

function DrawsCover() {
  return <p>cover</p>
}

function pageOf(container: HTMLElement): string {
  return container.firstElementChild?.className ?? ""
}

function laid(panelsAside: ReactNode | null) {
  return (
    <PlayedLayout
      head={<h1>The Dating Game</h1>}
      panelsAbove={null}
      runDrawn={<p>prose</p>}
      panelsAside={panelsAside}
    />
  )
}

test("a story naming no panel beside the run is laid narrow", () => {
  const { container } = render(laid(null))
  expect(pageOf(container)).toContain(NARROW)
})

test("a panel beside the run that draws nothing leaves the page narrow", async () => {
  const { container } = render(laid(<DrawsNothing />))
  await Promise.resolve()
  expect(pageOf(container)).toContain(NARROW)
  expect(container.querySelector("aside")?.className).toBe("hidden")
})

test("a panel beside the run that draws something lays the page wide", async () => {
  const { container } = render(laid(<DrawsCover />))
  await waitFor(() => expect(pageOf(container)).toContain(WIDE))
})

test("a panel beside the run that starts drawing widens the page", async () => {
  const { container, rerender } = render(laid(<DrawsNothing />))
  expect(pageOf(container)).toContain(NARROW)
  rerender(laid(<DrawsCover />))
  await waitFor(() => expect(pageOf(container)).toContain(WIDE))
})

test("a panel beside the run that stops drawing narrows the page", async () => {
  const { container, rerender } = render(laid(<DrawsCover />))
  await waitFor(() => expect(pageOf(container)).toContain(WIDE))
  rerender(laid(<DrawsNothing />))
  await waitFor(() => expect(pageOf(container)).toContain(NARROW))
})
