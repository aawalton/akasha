import { describe, expect, test } from "bun:test"
import { episodeSchema, severalEpisodesSchema, simplifiedEpisodeSchema } from "./endpoints/episodes"

describe("episode schemas", () => {
  test("simplifiedEpisodeSchema parses without a resume_point", () => {
    const parsed = simplifiedEpisodeSchema.parse({
      id: "e1",
      name: "Ep",
      type: "episode",
      duration_ms: 1000,
      release_date: "2020-01-01",
    })
    expect(parsed.resume_point).toBeUndefined()
  })

  test("simplifiedEpisodeSchema parses with a resume_point when scope present", () => {
    const parsed = simplifiedEpisodeSchema.parse({
      id: "e1",
      name: "Ep",
      type: "episode",
      duration_ms: 1000,
      release_date: "2020-01-01",
      resume_point: { fully_played: false, resume_position_ms: 500 },
    })
    expect(parsed.resume_point?.resume_position_ms).toBe(500)
  })

  test("episodeSchema embeds its parent show", () => {
    const parsed = episodeSchema.parse({
      id: "e1",
      name: "Ep",
      type: "episode",
      duration_ms: 1000,
      release_date: "2020-01-01",
      show: { id: "s1", name: "Show" },
    })
    expect(parsed.show.id).toBe("s1")
  })

  test("severalEpisodesSchema tolerates null entries", () => {
    const parsed = severalEpisodesSchema.parse({
      episodes: [
        null,
        { id: "e1", name: "Ep", type: "episode", duration_ms: 1, release_date: "2020-01-01" },
      ],
    })
    expect(parsed.episodes[0]).toBeNull()
    expect(parsed.episodes[1]?.id).toBe("e1")
  })
})
