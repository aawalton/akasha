import { describe, expect, test } from "bun:test"
import {
  chapterHref,
  commandTaken,
  SPEEDS,
  speedAfter,
  speedHeld,
  speedShown,
} from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"

describe("speed", () => {
  test("each tap goes to the next speed, and the fastest goes back to the slowest", () => {
    expect(speedAfter(1)).toBe(1.2)
    expect(speedAfter(1.8)).toBe(2)
    expect(speedAfter(2)).toBe(0.8)
  })

  test("a speed that is no step goes to the slowest", () => {
    expect(speedAfter(1.5)).toBe(0.8)
  })

  test("a kept speed is taken only where it is one of the steps", () => {
    expect(speedHeld("1.4")).toBe(1.4)
    expect(speedHeld(null)).toBe(1)
    expect(speedHeld("3")).toBe(1)
    expect(speedHeld("fast")).toBe(1)
  })

  test("every step is shown as a number with a times sign", () => {
    expect(SPEEDS.map(speedShown)).toEqual(["0.8×", "1×", "1.2×", "1.4×", "1.6×", "1.8×", "2×"])
  })
})

describe("chapter page", () => {
  const held = {
    id: "01a10dd0-f139-7f90-93df-c7587b8ac438",
    pageTypeSlug: "story-chapter-read",
    slug: "the-wandering-inn-0467-7-58",
    title: "7.58",
    storyTitle: "The Wandering Inn",
    ownLength: null,
    ownProgress: null,
    completedAt: null,
  }

  test("the chapter playing is reached at its page type, slug and the end of its id", () => {
    expect(chapterHref(held)).toBe("/story-chapter-read/the-wandering-inn-0467-7-58-7b8ac438")
  })

  test("a chapter with no slug is reached by its title", () => {
    expect(chapterHref({ ...held, slug: "" })).toBe("/story-chapter-read/7-58-7b8ac438")
  })
})

function audioHeld(playing: boolean, refusing = false) {
  const asked: string[] = []
  return {
    asked,
    paused: !playing,
    play: () => {
      asked.push("play")
      return refusing ? Promise.reject(new Error("not allowed")) : Promise.resolve()
    },
    pause: () => {
      asked.push("pause")
    },
  }
}

const nothingRefused = (): undefined => undefined

describe("lock screen commands", () => {
  test("play plays and pause pauses, whatever the audio is doing", () => {
    for (const playing of [true, false]) {
      const played = audioHeld(playing)
      commandTaken("play", played, nothingRefused)
      expect(played.asked).toEqual(["play"])
      const halted = audioHeld(playing)
      commandTaken("pause", halted, nothingRefused)
      expect(halted.asked).toEqual(["pause"])
    }
  })

  test("toggle pauses audio that is playing and plays audio that is not", () => {
    const playing = audioHeld(true)
    commandTaken("toggle", playing, nothingRefused)
    expect(playing.asked).toEqual(["pause"])
    const halted = audioHeld(false)
    commandTaken("toggle", halted, nothingRefused)
    expect(halted.asked).toEqual(["play"])
  })

  test("a command that is none of the three does nothing", () => {
    const audio = audioHeld(false)
    commandTaken("next", audio, nothingRefused)
    expect(audio.asked).toEqual([])
  })

  test("no audio takes no command", () => {
    expect(commandTaken("play", null, nothingRefused)).toBeUndefined()
  })

  test("a play the audio refuses is told why", async () => {
    const told: string[] = []
    commandTaken("play", audioHeld(false, true), (why) => {
      told.push(why)
    })
    await Promise.resolve()
    await Promise.resolve()
    expect(told).toEqual(["not allowed"])
  })
})
