import { describe, expect, test } from "bun:test"
import { ClientStoryChapterSchema, ClientStoryTurnSchema } from "./client-story-session"

describe("ClientStoryChapterSchema — storySoFar reader-link allowlist", () => {
  test("strips authoring-internal keys, keeping only { id, title, href, chapterNumber }", () => {
    const chapter = ClientStoryChapterSchema.parse({
      id: "demo-light-turn-1",
      title: "The Salt Road",
      href: "/story-chapter/the-salt-road-abcd1234",
      chapterNumber: 1,
      sheetSnapshot: { hidden: true },
      options: ["go north", "go south"],
      chosen: "go north",
      effect: { morale: -1 },
    })
    expect(chapter).toEqual({
      id: "demo-light-turn-1",
      title: "The Salt Road",
      href: "/story-chapter/the-salt-road-abcd1234",
      chapterNumber: 1,
    })
    expect(chapter).not.toHaveProperty("sheetSnapshot")
    expect(chapter).not.toHaveProperty("options")
    expect(chapter).not.toHaveProperty("chosen")
    expect(chapter).not.toHaveProperty("effect")
  })

  test("chapterNumber is optional — a link without ordering parses", () => {
    const chapter = ClientStoryChapterSchema.parse({
      id: "c9",
      title: "Untitled",
      href: "/story-chapter/untitled-0000c9",
    })
    expect(chapter).toEqual({ id: "c9", title: "Untitled", href: "/story-chapter/untitled-0000c9" })
  })
})

describe("ClientStoryTurnSchema — chapterProse current-session allowlist", () => {
  test("strips coordinator-only narrative internals, keeping only { id, title, text }", () => {
    const turn = ClientStoryTurnSchema.parse({
      id: "demo-light-turn-9",
      title: "The Salt Road",
      text: "The cart wheels bit into white grit.",
      insights: "the dragon is the player's mother",
      reaction: "fear",
      characterSheet: { hp: 7 },
      sheetSnapshot: { hidden: true },
      options: ["go north"],
      chosen: "go north",
      effect: { morale: -1 },
      bankedRemainder: "...and beyond the latch, a room she had not earned yet.",
    })
    expect(turn).toEqual({
      id: "demo-light-turn-9",
      title: "The Salt Road",
      text: "The cart wheels bit into white grit.",
    })
    expect(turn).not.toHaveProperty("insights")
    expect(turn).not.toHaveProperty("reaction")
    expect(turn).not.toHaveProperty("characterSheet")
    expect(turn).not.toHaveProperty("sheetSnapshot")
    expect(turn).not.toHaveProperty("options")
    expect(turn).not.toHaveProperty("chosen")
    expect(turn).not.toHaveProperty("effect")
    expect(turn).not.toHaveProperty("bankedRemainder")
  })
})
