import { afterEach, describe, expect, test } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ClientStoryChapter } from "~/awen/lib/client-story-session"
import { StorySoFar } from "./story-so-far"

afterEach(() => {
  cleanup()
})

const CHAPTERS: readonly ClientStoryChapter[] = [
  {
    id: "ch-1",
    title: "Chapter One: The Door",
    href: "/game-turn/the-door-11111111",
    chapterNumber: 1,
  },
  {
    id: "ch-2",
    title: "Chapter Two: The Stair",
    href: "/game-turn/the-stair-22222222",
    chapterNumber: 2,
  },
]

describe("StorySoFar", () => {
  test("default collapsed: header toggle present, links hidden", () => {
    render(<StorySoFar chapters={CHAPTERS} />)
    const toggle = screen.getByRole("button", { name: /the story so far/i })
    expect(toggle.getAttribute("aria-expanded")).toBe("false")
    expect(screen.queryByRole("link")).toBeNull()
    expect(screen.queryByText("Chapter One: The Door")).toBeNull()
  })

  test("header click expands to the chapter reader links, second click collapses", () => {
    render(<StorySoFar chapters={CHAPTERS} />)
    const toggle = screen.getByRole("button", { name: /the story so far/i })

    fireEvent.click(toggle)
    expect(toggle.getAttribute("aria-expanded")).toBe("true")
    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)
    expect(links[0]?.getAttribute("href")).toBe("/game-turn/the-door-11111111")
    expect(links[0]?.textContent).toBe("Chapter One: The Door")
    expect(links[0]?.getAttribute("target")).toBe("_blank")
    expect(links[1]?.getAttribute("href")).toBe("/game-turn/the-stair-22222222")

    fireEvent.click(toggle)
    expect(toggle.getAttribute("aria-expanded")).toBe("false")
    expect(screen.queryByRole("link")).toBeNull()
  })

  test("no chapters: renders nothing (no header, no toggle)", () => {
    const { container } = render(<StorySoFar chapters={[]} />)
    expect(screen.queryByRole("button")).toBeNull()
    expect(container.firstChild).toBeNull()
  })
})
