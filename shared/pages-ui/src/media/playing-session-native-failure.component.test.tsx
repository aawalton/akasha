import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

import { KOKORO_STREAM_LABEL, KOKORO_STREAM_VARIANT } from "./media-src"
import type { NativeTtsAdapter, NativeTtsEvent } from "./native-tts-adapter"
import type { MediaVariant } from "./page-media-player"
import type { MediaSrcResolver } from "./playing-session-context"
import type { EnsureRenditionStatus } from "./use-webkit-read-aloud-ensure"

const { PageMediaPlayer } = await import("./page-media-player")
const { PlayingSessionProvider } = await import("./playing-session-context")

beforeEach(() => {
  window.sessionStorage.clear()
})

afterEach(cleanup)

describe("native fast-failure surfaces a visible playback error (#15739)", () => {
  const KOKORO_ONLY: readonly MediaVariant[] = [
    { id: KOKORO_STREAM_VARIANT, label: KOKORO_STREAM_LABEL },
  ]
  const RAW = "Raw chapter body. Sentence two here."

  function ReadAloudChapter() {
    return (
      <PageMediaPlayer
        pageId="page-a"
        pageTypeSlug="story-chapter"
        title="Chapter A"
        medium="audio"
        variants={KOKORO_ONLY}
        nextHref={null}
        defaultVariant={KOKORO_STREAM_VARIANT}
        text={RAW}
      />
    )
  }

  function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
    const audio = view.el.querySelector("audio")
    if (audio == null) throw new Error("expected a persistent <audio> element")
    return audio
  }

  function renderNativeShell(adapter: NativeTtsAdapter) {
    const resolver: MediaSrcResolver = async ({ pageId, medium, variant }) =>
      `https://alanwalton.com/api/media/${pageId}/${medium}?variant=${variant}&token=x`
    const Stub = createRoutesStub([
      {
        Component: () => (
          <PlayingSessionProvider mediaSrcResolver={resolver} nativeTtsAdapter={adapter}>
            <Outlet />
          </PlayingSessionProvider>
        ),
        children: [{ path: "/chapter-a", Component: ReadAloudChapter }],
      },
    ])
    const { container } = render(<Stub initialEntries={["/chapter-a"]} />)
    return { el: container, ...within(container) }
  }

  it("a fast native reject → shell-src fallback → terminal <audio> error surfaces the error + a retry re-arms native", async () => {
    let prepareCalls = 0
    let emit: (event: NativeTtsEvent) => void = () => {}
    const adapter: NativeTtsAdapter = {
      prepare: async () => {
        prepareCalls += 1
        if (prepareCalls === 1) throw new Error("download died at 20%")
      },
      startChapter: async () => {},
      pause: async () => {},
      resume: async () => {},
      stop: async () => {},
      seek: async () => {},
      setRate: async () => {},
      subscribe: (listener) => {
        emit = listener
        return () => {
          emit = () => {}
        }
      },
    }
    const view = renderNativeShell(adapter)

    await act(async () => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
      await Promise.resolve()
    })
    expect(prepareCalls).toBe(1)
    expect(audioIn(view).getAttribute("src")).toContain("token=x")
    expect(view.queryByTestId("media-error")).toBeNull()

    await act(async () => {
      audioIn(view).dispatchEvent(new Event("error"))
      await Promise.resolve()
    })
    expect(view.getByTestId("media-error")).not.toBeNull()
    expect(view.getByTestId("media-retry")).not.toBeNull()

    await act(async () => {
      view.getByTestId("media-retry").click()
      await Promise.resolve()
      await Promise.resolve()
    })
    expect(prepareCalls).toBe(2)
    expect(view.queryByTestId("media-error")).toBeNull()
    expect(audioIn(view).getAttribute("src") ?? null).toBeNull()
    await act(async () => {
      emit({ type: "playing" })
      await Promise.resolve()
    })
    expect(view.queryByTestId("media-error")).toBeNull()
  })
})

describe("WebKit stored-mp3 rung exhausted surfaces the playback error (#15739)", () => {
  const IOS_WEBKIT_UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  let originalUa = ""
  beforeEach(() => {
    originalUa = navigator.userAgent
    Object.defineProperty(navigator, "userAgent", { value: IOS_WEBKIT_UA, configurable: true })
  })
  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", { value: originalUa, configurable: true })
    cleanup()
  })

  const KOKORO_ONLY: readonly MediaVariant[] = [
    { id: KOKORO_STREAM_VARIANT, label: KOKORO_STREAM_LABEL },
  ]

  function ReadAloudChapter() {
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

  function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
    const audio = view.el.querySelector("audio")
    if (audio == null) throw new Error("expected a persistent <audio> element")
    return audio
  }

  it("hls error → divert reports unavailable → visible playback error", async () => {
    const ensureRendition = async (): Promise<EnsureRenditionStatus> => "unavailable"
    const Stub = createRoutesStub([
      {
        Component: () => (
          <PlayingSessionProvider ensureRendition={ensureRendition}>
            <Outlet />
          </PlayingSessionProvider>
        ),
        children: [{ path: "/chapter-b", Component: ReadAloudChapter }],
      },
    ])
    const { container } = render(<Stub initialEntries={["/chapter-b"]} />)
    const view = { el: container, ...within(container) }

    act(() => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
    })
    expect(view.queryByTestId("media-error")).toBeNull()

    await act(async () => {
      audioIn(view).dispatchEvent(new Event("error"))
      await Promise.resolve()
      await Promise.resolve()
    })
    expect(view.getByTestId("media-error")).not.toBeNull()
    expect(view.getByTestId("media-retry")).not.toBeNull()
  })
})
