import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { createRoutesStub } from "react-router"

type Mark = { sentenceIndex: number; startSec: number }

let capturedProps: Record<string, unknown> | null = null
mock.module("~/components/page-detail-with-read-mark", () => ({
  PageDetailWithReadMark: (props: Record<string, unknown>) => {
    capturedProps = props
    return <div data-testid="reader-host" />
  },
}))

const { default: PageDetailRoute } = await import("./page-detail")

afterEach(() => {
  cleanup()
  capturedProps = null
})

function detailLoaderData(audioSentenceMarks: readonly Mark[]) {
  return {
    kind: "detail" as const,
    pageTypeSlug: "story-chapter",
    id: "11111111-1111-4111-8111-111111111111",
    faviconIdSuffix: null,
    title: "Chapter One",
    audioVariants: null,
    audioNextHref: null,
    audioDefaultVariant: null,
    readerPrev: null,
    readerNext: null,
    storyHref: null,
    chapterTitle: null,
    chapterNumber: null,
    storyTitle: null,
    nextUnreadHref: null,
    audioSentenceMarks,
  }
}

async function renderRouteWith(audioSentenceMarks: readonly Mark[]) {
  const Stub = createRoutesStub([
    { path: "/", Component: PageDetailRoute, loader: () => detailLoaderData(audioSentenceMarks) },
  ])
  render(<Stub initialEntries={["/"]} />)
  await screen.findByTestId("reader-host")
}

describe("page-detail route — audioSentenceMarks thread", () => {
  it("threads non-empty resolved marks into the reader's sentenceMarks prop", async () => {
    const marks: Mark[] = [
      { sentenceIndex: 0, startSec: 0 },
      { sentenceIndex: 1, startSec: 2.5 },
    ]
    await renderRouteWith(marks)
    expect(capturedProps?.sentenceMarks).toEqual(marks)
    expect(typeof capturedProps?.onPlayFromSentence).toBe("function")
  })

  it("threads [] (reader stays dark) when resolved marks are empty", async () => {
    await renderRouteWith([])
    expect(capturedProps?.sentenceMarks).toEqual([])
  })
})
