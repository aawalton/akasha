import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

import { KOKORO_STREAM_VARIANT } from "./media-src"
import type { NativeTtsAdapter, NativeTtsEvent } from "./native-tts-adapter"
import type { MediaVariant } from "./page-media-player"
import type { MediaSrcResolver } from "./playing-session-context"

const { PageMediaPlayer } = await import("./page-media-player")
const { PlayingSessionProvider, usePlayingSession } = await import("./playing-session-context")

beforeEach(() => {
  window.sessionStorage.clear()
})

afterEach(cleanup)

describe("native transport engaged — provider drives the adapter (#15702)", () => {
  const DUAL: readonly MediaVariant[] = [
    { id: "narrator-mara", label: "Mara" },
    { id: KOKORO_STREAM_VARIANT, label: "Read aloud" },
  ]
  const RAW = "Raw chapter body. Sentence two here."

  function makeFakeAdapter() {
    const startChapterCalls: Array<{ chapterId: string; text: string }> = []
    let emit: (event: NativeTtsEvent) => void = () => {}
    const adapter: NativeTtsAdapter = {
      prepare: async () => {},
      startChapter: async ({ chapterId, text }) => {
        startChapterCalls.push({ chapterId, text })
      },
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
    return { adapter, startChapterCalls, emit: (event: NativeTtsEvent) => emit(event) }
  }

  function NativeReadout() {
    const { isPaused, isWaiting } = usePlayingSession()
    return (
      <div>
        <div data-testid="native-paused">{String(isPaused)}</div>
        <div data-testid="native-waiting">{String(isWaiting)}</div>
      </div>
    )
  }

  function DualChapterWithText() {
    return (
      <PageMediaPlayer
        pageId="page-a"
        pageTypeSlug="story-chapter"
        title="Chapter A"
        medium="audio"
        variants={DUAL}
        nextHref={null}
        defaultVariant="narrator-mara"
        text={RAW}
      />
    )
  }

  function renderNativeShell(adapter: NativeTtsAdapter, opts?: { stallMs?: number }) {
    const resolver: MediaSrcResolver = async ({ pageId, medium, variant }) =>
      `https://alanwalton.com/api/media/${pageId}/${medium}?variant=${variant}&token=x`
    const Stub = createRoutesStub([
      {
        Component: () => (
          <PlayingSessionProvider
            mediaSrcResolver={resolver}
            nativeTtsAdapter={adapter}
            nativeStartupStallMs={opts?.stallMs}
          >
            <NativeReadout />
            <Outlet />
          </PlayingSessionProvider>
        ),
        children: [{ path: "/chapter-a", Component: DualChapterWithText }],
      },
    ])
    const { container } = render(<Stub initialEntries={["/chapter-a"]} />)
    return { el: container, ...within(container) }
  }

  it("routes the kokoro variant to the plugin: no <audio src>, startChapter gets the raw text", async () => {
    const fake = makeFakeAdapter()
    const view = renderNativeShell(fake.adapter)
    await act(async () => {
      view.getByRole("button", { name: "Read aloud" }).click()
      await Promise.resolve()
    })
    expect(view.el.querySelector("audio")?.getAttribute("src") ?? null).toBeNull()
    expect(fake.startChapterCalls).toHaveLength(1)
    expect(fake.startChapterCalls[0]).toEqual({ chapterId: "page-a", text: RAW })
  })

  it("mirrors engine events into the reactive isPaused/isWaiting the mini-bar reads", async () => {
    const fake = makeFakeAdapter()
    const view = renderNativeShell(fake.adapter)
    await act(async () => {
      view.getByRole("button", { name: "Read aloud" }).click()
      await Promise.resolve()
    })
    expect(view.getByTestId("native-waiting").textContent).toBe("true")
    expect(view.getByTestId("native-paused").textContent).toBe("true")
    await act(async () => {
      fake.emit({ type: "playing" })
      await Promise.resolve()
    })
    expect(view.getByTestId("native-waiting").textContent).toBe("false")
    expect(view.getByTestId("native-paused").textContent).toBe("false")
  })

  const tick = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

  it("a never-settling prepare() no longer hangs — the startup watchdog fires the shell-src fallback (#15702)", async () => {
    const startChapterCalls: string[] = []
    const neverSettling: NativeTtsAdapter = {
      prepare: () => new Promise<void>(() => {}),
      startChapter: async ({ chapterId }) => {
        startChapterCalls.push(chapterId)
      },
      pause: async () => {},
      resume: async () => {},
      stop: async () => {},
      seek: async () => {},
      setRate: async () => {},
      subscribe: () => () => {},
    }
    const view = renderNativeShell(neverSettling, { stallMs: 40 })
    await act(async () => {
      view.getByRole("button", { name: "Read aloud" }).click()
      await Promise.resolve()
    })
    expect(view.el.querySelector("audio")?.getAttribute("src") ?? null).toBeNull()
    expect(startChapterCalls).toHaveLength(0)
    await act(async () => {
      await tick(120)
    })
    const src = view.el.querySelector("audio")?.getAttribute("src") ?? null
    expect(src).not.toBeNull()
    expect(src).toContain("token=x")
  })

  it("surfaces model-download progress and the download keeps the watchdog alive (#15702)", async () => {
    const fake = makeFakeAdapter()
    const view = renderNativeShell(fake.adapter, { stallMs: 80 })
    await act(async () => {
      view.getByRole("button", { name: "Read aloud" }).click()
      await Promise.resolve()
    })
    for (const received of [25, 50, 75, 100]) {
      await act(async () => {
        fake.emit({ type: "downloadProgress", received, total: 100 })
        await tick(40)
      })
    }
    expect(view.getByTestId("media-downloading").textContent).toContain("100%")
    expect(view.getByTestId("media-downloading").textContent).toContain("keep the app open")
    expect(view.el.querySelector("audio")?.getAttribute("src") ?? null).toBeNull()
    await act(async () => {
      fake.emit({ type: "playing" })
      await Promise.resolve()
    })
    expect(view.queryByTestId("media-downloading")).toBeNull()
    expect(view.getByTestId("native-waiting").textContent).toBe("false")
  })
})
