import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { MemoryRouter } from "react-router"

let capturedOnProgress: ((fraction: number) => void) | undefined
let resolveDownload: (() => void) | undefined
let rejectDownload: ((reason: unknown) => void) | undefined

mock.module("~/lib/offline-downloads", () => ({
  upsertEntry: async () => undefined,
  downloadChapter: (args: { onProgress?: (fraction: number) => void }) => {
    capturedOnProgress = args.onProgress
    return new Promise<void>((resolve, reject) => {
      resolveDownload = resolve
      rejectDownload = reject
    })
  },
}))

const { OfflineDownloadButton } = await import("./offline-download-button")

const VARIANTS = [{ id: "nova", label: "Nova" }]

function renderButton() {
  return render(
    <MemoryRouter initialEntries={["/x?variant=nova"]}>
      <OfflineDownloadButton
        pageId="p1"
        chapterTitle="Chapter 1"
        chapterNumber={1}
        storyTitle="A Story"
        variants={VARIANTS}
      />
    </MemoryRouter>
  )
}

describe("OfflineDownloadButton", () => {
  beforeEach(() => {
    capturedOnProgress = undefined
    resolveDownload = undefined
    rejectDownload = undefined
    window.Capacitor = { isNativePlatform: () => true }
  })

  afterEach(() => {
    cleanup()
    window.Capacitor = undefined
  })

  test("no keep-app-open affordance in the idle state", () => {
    renderButton()
    expect(screen.getByRole("button").textContent).toContain("Download for offline")
    expect(screen.queryByTestId("offline-download-keep-open")).toBeNull()
  })

  test("shows the keep-app-open affordance while downloading", async () => {
    renderButton()
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    const affordance = screen.getByTestId("offline-download-keep-open")
    expect(affordance.textContent).toContain("keep the app open")
    expect(screen.getByRole("button").textContent).toContain("Downloading")
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
  })

  test("reflects download progress from onProgress", async () => {
    renderButton()
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await act(async () => {
      capturedOnProgress?.(0.5)
    })
    expect(screen.getByRole("button").textContent).toContain("50%")
  })

  test("clears the affordance and shows saved on completion", async () => {
    renderButton()
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await act(async () => {
      resolveDownload?.()
      await Promise.resolve()
    })
    expect(screen.queryByTestId("offline-download-keep-open")).toBeNull()
    expect(screen.getByRole("button").textContent).toContain("Saved for offline")
  })

  test("surfaces a retry affordance on failure", async () => {
    renderButton()
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await act(async () => {
      rejectDownload?.(new Error("boom"))
      await Promise.resolve()
    })
    expect(screen.queryByTestId("offline-download-keep-open")).toBeNull()
    expect(screen.getByRole("button").textContent).toContain("retry")
  })
})
