import { afterEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet, useLocation } from "react-router"
import { MiniPlayerBar } from "./mini-player-bar"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../../../../shared/pages/ui/src/supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

const { PlayingSessionProvider, usePlayingSession } = await import(
  "@shared/pages-ui/media/playing-session-context"
)

afterEach(() => {
  cleanup()
})

const SESSION = {
  pageId: "page-a",
  pageTypeSlug: "story-chapter",
  pageHref: "/chapter-a",
  title: "Chapter A",
  medium: "audio" as const,
  variant: "narrator-mara",
  speed: 1,
  nextHref: null,
}

function Controls() {
  const { startSession, stop } = usePlayingSession()
  const location = useLocation()
  return (
    <div>
      <div data-testid="loc">{location.pathname}</div>
      <button type="button" data-testid="start" onClick={() => startSession(SESSION)}>
        start
      </button>
      <button type="button" data-testid="stop" onClick={() => stop()}>
        stop
      </button>
    </div>
  )
}

function Layout() {
  return (
    <PlayingSessionProvider>
      <MiniPlayerBar />
      <Controls />
      <Outlet />
    </PlayingSessionProvider>
  )
}

function renderBar(initial = "/") {
  const Stub = createRoutesStub([
    {
      Component: Layout,
      children: [
        { index: true, Component: () => null },
        { path: "/chapter-a", Component: () => null },
      ],
    },
  ])
  const { container } = render(<Stub initialEntries={[initial]} />)
  return { el: container, ...within(container) }
}

function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
  const el = view.el.querySelector("audio")
  if (el == null) throw new Error("expected the persistent <audio> element")
  return el
}

describe("MiniPlayerBar — render gates", () => {
  it("renders nothing while the session is idle", () => {
    const view = renderBar()
    expect(view.queryByTestId("mini-player-bar")).toBeNull()
  })

  it("appears with the title and EXACTLY the four controls once a session is active", () => {
    const view = renderBar()
    act(() => {
      view.getByTestId("start").click()
    })
    expect(view.getByTestId("mini-player-bar")).toBeDefined()
    expect(view.getByTestId("mini-player-jump-back").textContent).toContain("Chapter A")
    expect(view.getByTestId("mini-player-jump-back")).toBeDefined()
    expect(view.getByTestId("mini-player-back-30")).toBeDefined()
    expect(view.getByTestId("mini-player-play-pause")).toBeDefined()
    expect(view.getByTestId("mini-player-forward-30")).toBeDefined()
    expect(view.queryByTestId("speed-option")).toBeNull()
    expect(view.queryByTestId("media-variant-option")).toBeNull()
  })

  it("dismisses when the session stops", () => {
    const view = renderBar()
    act(() => {
      view.getByTestId("start").click()
    })
    expect(view.getByTestId("mini-player-bar")).toBeDefined()
    act(() => {
      view.getByTestId("stop").click()
    })
    expect(view.queryByTestId("mini-player-bar")).toBeNull()
  })

  it("jump-back navigates to the playing page's href", () => {
    const view = renderBar("/")
    act(() => {
      view.getByTestId("start").click()
    })
    expect(view.getByTestId("loc").textContent).toBe("/")
    act(() => {
      view.getByTestId("mini-player-jump-back").click()
    })
    expect(view.getByTestId("loc").textContent).toBe("/chapter-a")
  })

  it("toggles play/pause on the persistent element, with the label coupled to paused state", () => {
    const view = renderBar()
    act(() => {
      view.getByTestId("start").click()
    })
    const paused = () => audioIn(view).paused
    const label = () => view.getByTestId("mini-player-play-pause").getAttribute("aria-label")
    expect(label()).toBe(paused() ? "Play" : "Pause")
    const before = paused()

    act(() => {
      view.getByTestId("mini-player-play-pause").click()
    })
    expect(paused()).toBe(!before)
    expect(label()).toBe(paused() ? "Play" : "Pause")

    act(() => {
      view.getByTestId("mini-player-play-pause").click()
    })
    expect(paused()).toBe(before)
    expect(label()).toBe(paused() ? "Play" : "Pause")
  })

  it("seeks ±30s on the persistent element from the bar transport", () => {
    const view = renderBar()
    act(() => {
      view.getByTestId("start").click()
    })
    act(() => {
      audioIn(view).currentTime = 100
    })
    act(() => {
      view.getByTestId("mini-player-back-30").click()
    })
    expect(audioIn(view).currentTime).toBe(70)
    act(() => {
      view.getByTestId("mini-player-forward-30").click()
    })
    expect(audioIn(view).currentTime).toBe(100)
    act(() => {
      audioIn(view).currentTime = 10
    })
    act(() => {
      view.getByTestId("mini-player-back-30").click()
    })
    expect(audioIn(view).currentTime).toBe(0)
  })
})
