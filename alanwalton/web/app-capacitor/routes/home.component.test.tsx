import { afterEach, describe, expect, mock, test } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { createMemoryRouter, RouterProvider } from "react-router"

type PagesAnswer = {
  rows: readonly { id: string; slug: string; title: string }[]
  isLoading: boolean
  isDegraded: boolean
  error: Error | null
}

const NOTHING_ANSWERED: PagesAnswer = {
  rows: [],
  isLoading: false,
  isDegraded: false,
  error: null,
}

let answerKnob: PagesAnswer = NOTHING_ANSWERED

const reported: { message: string; stack: string }[] = []

mock.module("@shared/pages-ui/supabase/use-pages", () => ({
  usePagesSupabase: () => ({
    ...answerKnob,
    hasMore: false,
    loadMore: () => undefined,
    totalCount: null,
  }),
}))

mock.module("@shared/pages-ui/components/view-page-content", () => ({
  ViewPageContent: ({ navItemIdParam }: { navItemIdParam: string }) => (
    <div>VIEW-PAGE-CONTENT:{navItemIdParam}</div>
  ),
}))

mock.module("@shared/errors-client/report-error", () => ({
  reportError: (input: { message: string; stack: string }) => {
    reported.push({ message: input.message, stack: input.stack })
  },
  setErrorReportOrigin: () => undefined,
  setReleaseSha: () => undefined,
  resolveReportReleaseSha: () => undefined,
}))

const { default: CapacitorHome, homeUnresolvedBecause } = await import("./home")

afterEach(() => {
  cleanup()
  reported.length = 0
  answerKnob = NOTHING_ANSWERED
})

function renderHome() {
  const router = createMemoryRouter([{ path: "/", Component: CapacitorHome }], {
    initialEntries: ["/"],
  })
  render(<RouterProvider router={router} />)
}

describe("homeUnresolvedBecause distinguishes the ways a home screen comes up empty", () => {
  test("the four causes each get their own sentence", () => {
    const said = [
      homeUnresolvedBecause({ navRowCount: 0, isDegraded: false, error: new Error("503") }),
      homeUnresolvedBecause({ navRowCount: 0, isDegraded: true, error: null }),
      homeUnresolvedBecause({ navRowCount: 0, isDegraded: false, error: null }),
      homeUnresolvedBecause({ navRowCount: 7, isDegraded: false, error: null }),
    ]
    expect(new Set(said).size).toBe(4)
  })

  test("a read error carries its own message, so the cause is not guessed from the shape", () => {
    const because = homeUnresolvedBecause({
      navRowCount: 0,
      isDegraded: false,
      error: new Error("roster answered 503"),
    })
    expect(because).toContain("roster answered 503")
  })

  test("an error outranks a degraded answer, so the more specific cause is the one told", () => {
    const withError = homeUnresolvedBecause({
      navRowCount: 0,
      isDegraded: true,
      error: new Error("roster answered 503"),
    })
    expect(withError).toContain("roster answered 503")
  })

  test("rows that arrived without a home one report how many did arrive", () => {
    const because = homeUnresolvedBecause({ navRowCount: 7, isDegraded: false, error: null })
    expect(because).toContain("7")
  })
})

describe("CapacitorHome renders its failure rather than an empty page", () => {
  test("a live shape carrying zero rows renders the reason, not a bare title", async () => {
    answerKnob = NOTHING_ANSWERED
    renderHome()
    const notice = await screen.findByText(
      homeUnresolvedBecause({ navRowCount: 0, isDegraded: false, error: null }),
      { exact: false }
    )
    expect(notice).toBeDefined()
    expect(screen.getByRole("button", { name: "Try again" })).toBeDefined()
  })

  test("a live shape carrying zero rows emits a report, so a blank home is never silent", async () => {
    answerKnob = NOTHING_ANSWERED
    renderHome()
    await screen.findByRole("button", { name: "Try again" })
    expect(reported.length).toBe(1)
    expect(reported[0]?.message).toContain("[capacitor-home]")
  })

  test("a read error reaches the screen with its own message", async () => {
    answerKnob = { ...NOTHING_ANSWERED, error: new Error("roster answered 401") }
    renderHome()
    expect(await screen.findByText(/roster answered 401/)).toBeDefined()
  })

  test("a home nav page that answers renders the view and reports nothing", async () => {
    answerKnob = {
      rows: [{ id: "0198aa11-0000-7000-8000-00000000beef", slug: "home", title: "Home" }],
      isLoading: false,
      isDegraded: false,
      error: null,
    }
    renderHome()
    expect(await screen.findByText(/VIEW-PAGE-CONTENT:/)).toBeDefined()
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull()
    expect(reported.length).toBe(0)
  })

  test("a shape still loading is not a failure, and reports nothing", async () => {
    answerKnob = { ...NOTHING_ANSWERED, isLoading: true }
    renderHome()
    await Promise.resolve()
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull()
    expect(reported.length).toBe(0)
  })
})
