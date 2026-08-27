import { describe, expect, test } from "bun:test"
import { chapterSchema, severalChaptersSchema, simplifiedChapterSchema } from "./endpoints/chapters"

describe("chapter schemas", () => {
  test("simplifiedChapterSchema parses and preserves unknown keys", () => {
    const parsed = simplifiedChapterSchema.parse({
      id: "c1",
      name: "Ch 1",
      type: "chapter",
      chapter_number: 1,
      duration_ms: 1000,
      audio_preview_url: null,
    })
    expect(parsed.chapter_number).toBe(1)
  })

  test("chapterSchema embeds its parent audiobook", () => {
    const parsed = chapterSchema.parse({
      id: "c1",
      name: "Ch 1",
      type: "chapter",
      chapter_number: 1,
      duration_ms: 1000,
      audiobook: { id: "a1", name: "Book" },
    })
    expect(parsed.audiobook.id).toBe("a1")
  })

  test("severalChaptersSchema tolerates null entries", () => {
    const parsed = severalChaptersSchema.parse({
      chapters: [
        { id: "c1", name: "Ch 1", type: "chapter", chapter_number: 1, duration_ms: 1 },
        null,
      ],
    })
    expect(parsed.chapters[1]).toBeNull()
  })

  test("simplifiedChapterSchema rejects a wrong discriminant", () => {
    expect(() =>
      simplifiedChapterSchema.parse({ id: "c", name: "n", type: "episode", chapter_number: 1 })
    ).toThrow()
  })
})
