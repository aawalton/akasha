import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub, Outlet, useNavigate } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

import { KOKORO_STREAM_VARIANT, mediaSrcForVariant } from "./media-src"
import type { MediaVariant } from "./page-media-player"
import type { MediaSrcResolver } from "./playing-session-context"

const { PageMediaPlayer } = await import("./page-media-player")
const { PlayingSessionProvider, usePlayingSession } = await import("./playing-session-context")
const { writePersistedSession } = await import("./playing-session-storage")

let mediaSrcResolver: MediaSrcResolver | undefined

beforeEach(() => {
  window.sessionStorage.clear()
  mediaSrcResolver = undefined
})

afterEach(() => {
  cleanup()
})

function TestShell() {
  return (
    <PlayingSessionProvider mediaSrcResolver={mediaSrcResolver}>
      <SessionReadout />
      <Outlet />
    </PlayingSessionProvider>
  )
}

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

const MARA = [{ id: "narrator-mara", label: "Mara" }]

function ChapterA() {
  return (
    <PageMediaPlayer
      pageId="page-a"
      pageTypeSlug="story-chapter"
      title="Chapter A"
      medium="audio"
      variants={MARA}
      nextHref="/chapter-b"
      defaultVariant="narrator-mara"
    />
  )
}

function ChapterB() {
  return (
    <PageMediaPlayer
      pageId="page-b"
      pageTypeSlug="story-chapter"
      title="Chapter B"
      medium="audio"
      variants={MARA}
      nextHref={null}
      defaultVariant="narrator-mara"
    />
  )
}

function renderShell(initial: string) {
  const Stub = createRoutesStub([
    {
      Component: TestShell,
      children: [
        { path: "/chapter-a", Component: ChapterA },
        { path: "/chapter-b", Component: ChapterB },
      ],
    },
  ])
  const { container } = render(<Stub initialEntries={[initial]} />)
  return { el: container, ...within(container) }
}

function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
  const audio = view.el.querySelector("audio")
  if (audio == null) throw new Error("expected a persistent <audio> element")
  return audio
}

describe("PlayingSessionProvider — persistent audio session", () => {
  it("is idle with no <audio> element until a variant is selected", () => {
    const view = renderShell("/chapter-a")
    expect(view.getByTestId("session-status").textContent).toBe("idle")
    expect(view.queryByTestId("media-in-page-host")).not.toBeNull()
    const host = view.getByTestId("media-in-page-host")
    expect(host.querySelector("audio")).toBeNull()
  })

  it("starting a variant activates the session and portals the element into the page's in-page host", () => {
    const view = renderShell("/chapter-a")
    act(() => {
      view.getByRole("button", { name: "Mara" }).click()
    })
    expect(view.getByTestId("session-status").textContent).toBe("active")
    expect(view.getByTestId("session-title").textContent).toBe("Chapter A")
    const host = view.getByTestId("media-in-page-host")
    expect(host.querySelector("audio")).not.toBeNull()
  })

  it("preserves element identity + currentTime across navigate-away and navigate-back", () => {
    const view = renderShell("/chapter-a")
    act(() => {
      view.getByRole("button", { name: "Mara" }).click()
    })
    const started = audioIn(view)
    act(() => {
      started.currentTime = 42
    })

    act(() => {
      view.getByTestId("goto-b").click()
    })
    const afterAway = audioIn(view)
    expect(afterAway).toBe(started)
    expect(afterAway.currentTime).toBe(42)
    expect(afterAway.isConnected).toBe(true)
    expect(afterAway.closest("[data-playing-session-fallback-host]")).not.toBeNull()
    expect(view.getByTestId("session-title").textContent).toBe("Chapter A")

    act(() => {
      view.getByTestId("goto-a").click()
    })
    const afterBack = audioIn(view)
    expect(afterBack).toBe(started)
    expect(afterBack.currentTime).toBe(42)
    expect(view.getByTestId("media-in-page-host").querySelector("audio")).toBe(started)
  })

  it("restores a persisted session PAUSED at its saved position on reload (no autoplay)", () => {
    writePersistedSession(
      {
        pageId: "page-a",
        pageTypeSlug: "story-chapter",
        pageHref: "/chapter-a",
        title: "Chapter A",
        medium: "audio",
        variant: "narrator-mara",
        speed: 1,
        nextHref: "/chapter-b",
      },
      37
    )
    const view = renderShell("/chapter-a")
    expect(view.getByTestId("session-status").textContent).toBe("active")
    expect(view.getByTestId("session-title").textContent).toBe("Chapter A")
    const audio = audioIn(view)
    expect(audio.currentTime).toBe(37)
    expect(audio.paused).toBe(true)
    expect(view.getByTestId("media-in-page-host").querySelector("audio")).toBe(audio)
  })

  it("auto-advances on the playing page: ending navigates to the next chapter and continues the session", () => {
    const view = renderShell("/chapter-a")
    act(() => {
      view.getByRole("button", { name: "Mara" }).click()
    })
    act(() => {
      audioIn(view).dispatchEvent(new Event("ended"))
    })
    expect(view.getByTestId("session-title").textContent).toBe("Chapter B")
  })

  it("stops at the end of the story: ending with no next dismisses the session", () => {
    const view = renderShell("/chapter-b")
    act(() => {
      view.getByRole("button", { name: "Mara" }).click()
    })
    expect(view.getByTestId("session-status").textContent).toBe("active")
    act(() => {
      audioIn(view).dispatchEvent(new Event("ended"))
    })
    expect(view.getByTestId("session-status").textContent).toBe("idle")
    expect(view.getByTestId("media-in-page-host").querySelector("audio")).toBeNull()
  })

  describe("media src seam", () => {
    it("web (no resolver): the element src is the relative, cookie-authed URL", () => {
      const view = renderShell("/chapter-a")
      act(() => {
        view.getByRole("button", { name: "Mara" }).click()
      })
      expect(audioIn(view).getAttribute("src")).toBe(
        "/api/media/page-a/audio?variant=narrator-mara"
      )
    })

    it("shell (resolver injected): the element src is the absolute, token-authed URL", async () => {
      mediaSrcResolver = async ({ pageId, medium, variant }) =>
        `https://alanwalton.com/api/media/${pageId}/${medium}?variant=${variant}&token=mint-abc`
      const view = renderShell("/chapter-a")
      act(() => {
        view.getByRole("button", { name: "Mara" }).click()
      })
      await act(async () => {
        await Promise.resolve()
      })
      expect(audioIn(view).getAttribute("src")).toBe(
        "https://alanwalton.com/api/media/page-a/audio?variant=narrator-mara&token=mint-abc"
      )
    })
  })

  describe("web parity — native transport present but web src is unchanged (#15702)", () => {
    const DUAL: readonly MediaVariant[] = [
      { id: "narrator-mara", label: "Mara" },
      { id: KOKORO_STREAM_VARIANT, label: "Read aloud" },
    ]

    function DualChapter() {
      return (
        <PageMediaPlayer
          pageId="page-a"
          pageTypeSlug="story-chapter"
          title="Chapter A"
          medium="audio"
          variants={DUAL}
          nextHref={null}
          defaultVariant="narrator-mara"
        />
      )
    }

    function renderWeb() {
      const Stub = createRoutesStub([
        {
          Component: () => (
            <PlayingSessionProvider>
              <Outlet />
            </PlayingSessionProvider>
          ),
          children: [{ path: "/chapter-a", Component: DualChapter }],
        },
      ])
      const { container } = render(<Stub initialEntries={["/chapter-a"]} />)
      return { el: container, ...within(container) }
    }

    it("narrator variant: <audio src> equals mediaSrcForVariant (web-src, native branch dead)", () => {
      const view = renderWeb()
      act(() => {
        view.getByRole("button", { name: "Mara" }).click()
      })
      expect(audioIn(view).getAttribute("src")).toBe(
        mediaSrcForVariant("page-a", "audio", "narrator-mara")
      )
    })

    it("kokoro variant: <audio src> equals mediaSrcForVariant even though this variant CAN go native in the shell", () => {
      const view = renderWeb()
      act(() => {
        view.getByRole("button", { name: "Read aloud" }).click()
      })
      expect(audioIn(view).getAttribute("src")).toBe(
        mediaSrcForVariant("page-a", "audio", KOKORO_STREAM_VARIANT)
      )
    })
  })
})
