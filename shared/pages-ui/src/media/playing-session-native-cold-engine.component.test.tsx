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

const { PageMediaPlayer } = await import("./page-media-player")
const { PlayingSessionProvider, usePlayingSession } = await import("./playing-session-context")

beforeEach(() => {
  window.sessionStorage.clear()
})
afterEach(cleanup)

const KOKORO_ONLY: readonly MediaVariant[] = [
  { id: KOKORO_STREAM_VARIANT, label: KOKORO_STREAM_LABEL },
]

function stubAdapter(overrides: Partial<NativeTtsAdapter> = {}): {
  readonly adapter: NativeTtsAdapter
  readonly calls: readonly string[]
  readonly emit: (event: NativeTtsEvent) => void
} {
  const calls: string[] = []
  let emit: (event: NativeTtsEvent) => void = () => {}
  const adapter: NativeTtsAdapter = {
    prepare: async () => {
      calls.push("prepare")
    },
    startChapter: async () => {
      calls.push("startChapter")
    },
    pause: async () => {
      calls.push("pause")
    },
    resume: async () => {
      calls.push("resume")
    },
    stop: async () => {
      calls.push("stop")
    },
    seek: async () => {
      calls.push("seek")
    },
    setRate: async () => {
      calls.push("setRate")
    },
    subscribe: (listener) => {
      emit = listener
      return () => {
        emit = () => {}
      }
    },
    ...overrides,
  }
  return {
    adapter,
    calls,
    emit: (event) => {
      emit(event)
    },
  }
}

const resolver: MediaSrcResolver = async ({ pageId, medium, variant }) =>
  `https://alanwalton.com/api/media/${pageId}/${medium}?variant=${variant}&token=x`

function renderShell(adapter: NativeTtsAdapter, chapter: () => React.ReactElement) {
  const Stub = createRoutesStub([
    {
      Component: () => (
        <PlayingSessionProvider mediaSrcResolver={resolver} nativeTtsAdapter={adapter}>
          <Outlet />
        </PlayingSessionProvider>
      ),
      children: [{ path: "/chapter", Component: chapter }],
    },
  ])
  const { container } = render(<Stub initialEntries={["/chapter"]} />)
  return { el: container, ...within(container) }
}

function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
  const audio = view.el.querySelector("audio")
  if (audio == null) throw new Error("expected a persistent <audio> element")
  return audio
}

function TogglePlayProbe() {
  const session = usePlayingSession()
  return (
    <button type="button" data-testid="probe-toggle" onClick={session.togglePlay}>
      toggle
    </button>
  )
}

describe("a text-less kokoro session never becomes a playable native session (#15906)", () => {
  function TextlessChapter() {
    return (
      <PageMediaPlayer
        pageId="page-cold"
        pageTypeSlug="story-chapter"
        title="Chapter cold"
        medium="audio"
        variants={KOKORO_ONLY}
        nextHref={null}
        defaultVariant={KOKORO_STREAM_VARIANT}
      />
    )
  }

  it("falls back to shell-src and never calls resume(), even when the play control is tapped", async () => {
    const { adapter, calls } = stubAdapter()
    const view = renderShell(adapter, () => (
      <>
        <TextlessChapter />
        <TogglePlayProbe />
      </>
    ))

    await act(async () => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
      await Promise.resolve()
    })

    expect(calls).not.toContain("prepare")
    expect(calls).not.toContain("startChapter")
    const fallbackSrc = audioIn(view).getAttribute("src")
    expect(fallbackSrc).not.toBeNull()
    expect(fallbackSrc).toContain("token=x")

    await act(async () => {
      view.getByTestId("probe-toggle").click()
      await Promise.resolve()
    })
    expect(calls).not.toContain("resume")
  })
})

describe("togglePlay does not resume before the engine has reported playback (#15906)", () => {
  function TextChapter() {
    return (
      <PageMediaPlayer
        pageId="page-warm"
        pageTypeSlug="story-chapter"
        title="Chapter warm"
        medium="audio"
        variants={KOKORO_ONLY}
        nextHref={null}
        defaultVariant={KOKORO_STREAM_VARIANT}
        text="Body sentence one. Body sentence two."
      />
    )
  }

  it("swallows the tap while preparing, then pauses normally once playback has started", async () => {
    const { adapter, calls, emit } = stubAdapter({
      prepare: () => new Promise<void>(() => {}),
    })
    const view = renderShell(adapter, () => (
      <>
        <TextChapter />
        <TogglePlayProbe />
      </>
    ))

    await act(async () => {
      view.getByRole("button", { name: KOKORO_STREAM_LABEL }).click()
      await Promise.resolve()
    })
    expect(audioIn(view).getAttribute("src") ?? null).toBeNull()

    await act(async () => {
      view.getByTestId("probe-toggle").click()
      await Promise.resolve()
    })
    expect(calls).not.toContain("resume")

    await act(async () => {
      emit({ type: "playing" })
      await Promise.resolve()
    })
    await act(async () => {
      view.getByTestId("probe-toggle").click()
      await Promise.resolve()
    })
    expect(calls).toContain("pause")
    expect(calls).not.toContain("resume")

    await act(async () => {
      view.getByTestId("probe-toggle").click()
      await Promise.resolve()
    })
    expect(calls).toContain("resume")
  })
})
