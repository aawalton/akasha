import { afterAll, afterEach, beforeAll, describe, expect, it, mock } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import * as realPlayer from "../media/page-media-player"

const realPageMediaPlayer = realPlayer.PageMediaPlayer
const stubPageMediaPlayer = () => <div data-testid="media-player" />
let currentPageMediaPlayer: typeof realPageMediaPlayer = realPageMediaPlayer

mock.module("../media/page-media-player", () => ({
  PageMediaPlayer: (props: Parameters<typeof realPageMediaPlayer>[0]) =>
    currentPageMediaPlayer(props),
}))

const { ReaderAudioBlock } = await import("./reader-audio-block")

beforeAll(() => {
  currentPageMediaPlayer = stubPageMediaPlayer
})
afterAll(() => {
  currentPageMediaPlayer = realPageMediaPlayer
})

afterEach(() => {
  cleanup()
})

const VARIANTS = [{ id: "zadi", label: "Zadi" }]

describe("ReaderAudioBlock — audioActions slot placement", () => {
  it("renders the audioActions node directly beside the player, in one block", () => {
    render(
      <ReaderAudioBlock
        pageId="chapter-1"
        pageTypeSlug="story-chapter"
        title="Chapter One"
        variants={VARIANTS}
        nextHref={null}
        defaultVariant={null}
        audioActions={<div data-testid="audio-actions" />}
      />
    )
    const player = screen.getByTestId("media-player")
    const actions = screen.getByTestId("audio-actions")
    expect(actions.parentElement).toBe(player.parentElement)
  })

  it("renders only the player when no audioActions node is supplied", () => {
    render(
      <ReaderAudioBlock
        pageId="chapter-1"
        pageTypeSlug="story-chapter"
        title="Chapter One"
        variants={VARIANTS}
        nextHref={null}
        defaultVariant={null}
      />
    )
    expect(screen.getByTestId("media-player")).toBeDefined()
    expect(screen.queryByTestId("audio-actions")).toBeNull()
  })
})
