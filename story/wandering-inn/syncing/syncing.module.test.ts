import { describe, expect, mock, test } from "bun:test"

const AT = "pages/story-chapter-read/the-wandering-inn-0834-9-99.story-chapter-read.md"
const FRESH_URL = "https://wanderinginn.com/2026/09/11/9-99/"
const FILED_URL = "https://wanderinginn.com/2026/09/10/9-98/"
const REFUSED = "the page did not land"

interface Filing {
  readonly position: number
  readonly title: string
  readonly url: string
  readonly text: string
}

class FilingRefused extends Error {}

let filing: (chapter: Filing) => Promise<string> = () => Promise.resolve(AT)

mock.module(
  "akasha/story/wandering-inn/modules/chapter-filing/chapter-filing.module.code.ts",
  () => ({
    FilingRefused,
    assertStoryExists: (): undefined => undefined,
    filedChapterLinks: (): ReadonlySet<string> => new Set([FILED_URL]),
    fileChapter: (chapter: Filing): Promise<string> => filing(chapter),
  })
)

mock.module("akasha/story/wandering-inn/site/site.module.code.ts", () => ({
  openSite: () =>
    Promise.resolve({
      readContents: () => Promise.resolve([{ position: 834, title: "9.99", url: FRESH_URL }]),
      readChapter: () =>
        Promise.resolve({
          patronOnly: false,
          ogTitle: "9.99",
          docTitle: "9.99 - The Wandering Inn",
          ogUrl: FRESH_URL,
          text: "Erin lit the hearth.\n\nPrevious Chapter Next Chapter",
        }),
      close: () => Promise.resolve(),
    }),
}))

const { syncWanderingInn } = await import(
  "akasha/story/wandering-inn/syncing/syncing.module.code.ts"
)

type Counts = Awaited<ReturnType<typeof syncWanderingInn>>

interface Ran {
  readonly counts: Counts
  readonly said: readonly string[]
}

async function running(): Promise<Ran> {
  const said: string[] = []
  const real = console.log
  console.log = (...parts: unknown[]): undefined => {
    said.push(parts.map((one) => String(one)).join(" "))
  }
  try {
    return { counts: await syncWanderingInn([]), said }
  } finally {
    console.log = real
  }
}

describe("a chapter filed", () => {
  test("is said to be where filing put it rather than at a promise of a place", async () => {
    filing = () => Promise.resolve(AT)
    const ran = await running()
    const line = ran.said.find((one) => one.includes("chapter 834:"))
    expect(line).toBeDefined()
    expect(line).not.toContain("[object Promise]")
    expect(line).toContain(`filed "9.99" at ${AT}`)
    expect(ran.counts.created).toBe(1)
    expect(ran.counts.failed).toBe(0)
  })

  test("is counted as failed where filing refused it, rather than escaping the run", async () => {
    filing = () => Promise.reject(new FilingRefused(REFUSED))
    const ran = await running()
    expect(ran.counts.failed).toBe(1)
    expect(ran.counts.created).toBe(0)
    expect(ran.said.some((one) => one.includes(REFUSED))).toBe(true)
  })
})
