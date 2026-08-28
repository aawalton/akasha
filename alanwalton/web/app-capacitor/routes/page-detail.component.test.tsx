import { afterEach, describe, expect, mock, test } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { createMemoryRouter, RouterProvider } from "react-router"

const viewCalls: string[] = []

mock.module("@shared/pages-ui/components/view-page-content", () => ({
  ViewPageContent: ({ navItemIdParam }: { navItemIdParam: string }) => {
    viewCalls.push(navItemIdParam)
    return <div>VIEW-PAGE-CONTENT</div>
  },
}))

mock.module("@shared/pages-ui/components/page-detail-content", () => ({
  PageDetailContent: () => <div>PAGE-DETAIL-CONTENT</div>,
}))

let onlineKnob = true

type CapturedBodyProps = {
  readerPrev?: { href: string; title: string | null } | null
  readerNext?: { href: string; title: string | null } | null
}
const bodyProps: CapturedBodyProps[] = []

type Neighbors = {
  prev: { href: string; title: string | null } | null
  next: { href: string; title: string | null } | null
}
let neighborsKnob: Neighbors = { prev: null, next: null }

mock.module("./question-answer-arm", () => ({
  QuestionAnswerArm: () => <div>QUESTION-ANSWER-ARM</div>,
}))

mock.module("../../app/components/page-detail-with-read-mark", () => ({
  PageDetailWithReadMark: (props: CapturedBodyProps) => {
    bodyProps.push(props)
    return <div>GENERIC-BODY</div>
  },
}))

mock.module("../../app/lib/use-is-online", () => ({
  useIsOnline: () => onlineKnob,
}))

mock.module("@shared/pages-ui/supabase/use-reader-neighbors", () => ({
  useReaderNeighbors: () => neighborsKnob,
}))

mock.module("../../app/lib/use-media-variants", () => ({
  useMediaVariants: () => null,
}))

mock.module("../../app/lib/use-next-unread", () => ({
  useNextUnreadHref: () => null,
}))

mock.module("@shared/pages-ui/supabase/hooks", () => ({
  usePageByIdSuffix: () => ({
    page: {
      _id: "persona-id-6fed9037",
      userId: "u",
      properties: { title: "Aura" },
    },
    isLoading: false,
  }),
  useAllPages: () => ({
    pages: [
      {
        _id: "pt-persona",
        properties: {
          slug: "persona",
          propertyDefinitions: [],
          detailConfig: { display: "persona" },
        },
      },
      {
        _id: "pt-question",
        properties: {
          slug: "question",
          propertyDefinitions: [],
          detailConfig: { display: "question" },
        },
      },
    ],
    isLoading: false,
  }),
  useRelatedPages: () => [],
  useViewsForNavItem: () => ({ views: [], isLoading: false }),
}))

const { default: CapacitorPageDetail } = await import("./page-detail")

afterEach(() => {
  cleanup()
  viewCalls.length = 0
  bodyProps.length = 0
  neighborsKnob = { prev: null, next: null }
  onlineKnob = true
})

function renderAt(url: string) {
  const router = createMemoryRouter(
    [{ path: ":pageTypeSlug/:pageHrefParam", Component: CapacitorPageDetail }],
    { initialEntries: [url] }
  )
  render(<RouterProvider router={router} />)
}

describe("CapacitorPageDetail nav branch (#14797 regression)", () => {
  test("a `nav` slug renders ViewPageContent, not the generic PageDetailContent", async () => {
    renderAt("/nav/aura-6fed9037")
    expect(await screen.findByText("VIEW-PAGE-CONTENT")).toBeDefined()
    expect(screen.queryByText("PAGE-DETAIL-CONTENT")).toBeNull()
    expect(viewCalls).toContain("aura-6fed9037")
  })
})

describe("CapacitorPageDetail question arm (#15520 online/offline gate)", () => {
  test("online: a `question` slug renders the QuestionAnswer arm, not the generic body", async () => {
    onlineKnob = true
    renderAt("/question/why-6fed9037")
    expect(await screen.findByText("QUESTION-ANSWER-ARM")).toBeDefined()
    expect(screen.queryByText("GENERIC-BODY")).toBeNull()
  })

  test("offline: a `question` slug degrades to the generic body, no QuestionAnswer arm", async () => {
    onlineKnob = false
    renderAt("/question/why-6fed9037")
    expect(await screen.findByText("GENERIC-BODY")).toBeDefined()
    expect(screen.queryByText("QUESTION-ANSWER-ARM")).toBeNull()
  })
})

describe("CapacitorPageDetail chapter pager threading (#15348)", () => {
  test("a story-chapter forwards the client-resolved reader neighbors to the body", async () => {
    neighborsKnob = {
      prev: { href: "/story-chapter/prev-chapter-11111111", title: "Prev Chapter" },
      next: { href: "/story-chapter/next-chapter-22222222", title: "Next Chapter" },
    }
    renderAt("/story-chapter/some-chapter-6fed9037")
    expect(await screen.findByText("GENERIC-BODY")).toBeDefined()
    const props = bodyProps.at(-1)
    if (props == null) throw new Error("generic body never rendered")
    expect(props.readerPrev).toEqual(neighborsKnob.prev)
    expect(props.readerNext).toEqual(neighborsKnob.next)
  })

  test("a story-chapter with no neighbors forwards undefined (no pager)", async () => {
    neighborsKnob = { prev: null, next: null }
    renderAt("/story-chapter/only-chapter-6fed9037")
    expect(await screen.findByText("GENERIC-BODY")).toBeDefined()
    const props = bodyProps.at(-1)
    if (props == null) throw new Error("generic body never rendered")
    expect(props.readerPrev).toBeUndefined()
    expect(props.readerNext).toBeUndefined()
  })
})
