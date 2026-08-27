import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet, useNavigate } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

import {
  KOKORO_STREAM_LABEL,
  KOKORO_STREAM_VARIANT,
  mediaHlsSrcForVariant,
  mediaSrcForVariant,
  STORED_READ_ALOUD_VARIANT,
} from "./media-src"
import type { MediaVariant } from "./page-media-player"
import type { EnsureRenditionStatus } from "./use-webkit-read-aloud-ensure"

const { PageMediaPlayer } = await import("./page-media-player")
const { PlayingSessionProvider, usePlayingSession } = await import("./playing-session-context")

beforeEach(() => {
  window.sessionStorage.clear()
})

afterEach(() => {
  cleanup()
})

function SessionReadout() {
  const { state } = usePlayingSession()
  const navigate = useNavigate()
  return (
    <div>
      <div data-testid="session-status">{state.status}</div>
      <div data-testid="session-title">{state.status === "active" ? state.title : ""}</div>
      <button type="button" data-testid="goto-a" onClick={() => navigate("/chapter-a")}>
        A
      </button>
      <button type="button" data-testid="goto-b" onClick={() => navigate("/chapter-b")}>
        B
      </button>
    </div>
  )
}

function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
  const audio = view.el.querySelector("audio")
  if (audio == null) throw new Error("expected a persistent <audio> element")
  return audio
}

describe("WebKit read-aloud HLS transport + stored-mp3 fallback (#15737/#15731)", () => {
  const IOS_WEBKIT_UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  let originalUa = ""
  beforeEach(() => {
    originalUa = navigator.userAgent
    Object.defineProperty(navigator, "userAgent", { value: IOS_WEBKIT_UA, configurable: true })
  })
  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", { value: originalUa, configurable: true })
  })

  const MARA_ONLY: readonly MediaVariant[] = [{ id: "narrator-mara", label: "Mara" }]
  const KOKORO_ONLY: readonly MediaVariant[] = [
    { id: KOKORO_STREAM_VARIANT, label: KOKORO_STREAM_LABEL },
  ]

  function ChapterANarrator() {
    return (
      <PageMediaPlayer
        pageId="page-a"
        pageTypeSlug="story-chapter"
        title="Chapter A"
        medium="audio"
        variants={MARA_ONLY}
        nextHref="/chapter-b"
        defaultVariant="narrator-mara"
      />
    )
  }

  function ChapterBReadAloud() {
    return (
      <PageMediaPlayer
        pageId="page-b"
        pageTypeSlug="story-chapter"
        title="Chapter B"
        medium="audio"
        variants={KOKORO_ONLY}
        nextHref={null}
        defaultVariant={KOKORO_STREAM_VARIANT}
      />
    )
  }

  function renderDivert(initial: string, ensureRendition: () => Promise<EnsureRenditionStatus>) {
    const Stub = createRoutesStub([
      {
        Component: () => (
          <PlayingSessionProvider ensureRendition={ensureRendition}>
            <SessionReadout />
            <Outlet />
          </PlayingSessionProvider>
        ),
        children: [
          { path: "/chapter-a", Component: ChapterANarrator },
          { path: "/chapter-b", Component: ChapterBReadAloud },
        ],
      },
    ])
    const { container } = render(<Stub initialEntries={[initial]} />)
    return { el: container, ...within(container) }
  }

  it("WebKit + kokoro binds the growing HLS playlist URL, not the infinite-WAV and not emptied", () => {
    const view = renderDivert("/chapter-a", async () => "generating")

    act(() => {
      view.getByRole("button", { name: "Mara" }).click()
    })
    const el = audioIn(view)
    expect(el.getAttribute("src")).toBe("/api/media/page-a/audio?variant=narrator-mara")

    act(() => {
      view.getByTestId("goto-b").click()
    })
    act(() => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
    })
    const afterB = audioIn(view)
    expect(afterB).toBe(el)
    expect(afterB.getAttribute("src")).toBe(mediaHlsSrcForVariant("page-b", "audio"))
    expect(afterB.currentSrc).not.toContain("page-a")
    expect(afterB.currentSrc).not.toContain("/stream")
    expect(view.getByTestId("session-title").textContent).toBe("Chapter B")
  })

  it("an <audio error> on the HLS src falls back to the stored-mp3 divert and flips to the stored variant", async () => {
    const view = renderDivert("/chapter-b", async () => "ready")
    act(() => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
    })
    const el = audioIn(view)
    expect(el.getAttribute("src")).toBe(mediaHlsSrcForVariant("page-b", "audio"))

    await act(async () => {
      el.dispatchEvent(new Event("error"))
      await Promise.resolve()
    })
    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })
    expect(audioIn(view).getAttribute("src")).toBe(
      mediaSrcForVariant("page-b", "audio", STORED_READ_ALOUD_VARIANT)
    )
  })

  it("during the fallback render window the element is emptied, not left on a broken HLS src (#15731)", async () => {
    const view = renderDivert("/chapter-b", async () => "generating")
    act(() => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
    })
    const el = audioIn(view)
    await act(async () => {
      el.dispatchEvent(new Event("error"))
      await Promise.resolve()
    })
    expect(el.paused).toBe(true)
    expect(el.getAttribute("src")).toBeNull()
    expect(view.getByTestId("session-title").textContent).toBe("Chapter B")
  })
})
