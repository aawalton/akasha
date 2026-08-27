import { describe, expect, test } from "bun:test"
import { parseTrackId, trackToResolved } from "./resolve"

describe("parseTrackId", () => {
  test("extracts the id from a spotify:track: URI", () => {
    expect(parseTrackId("spotify:track:6gv6gQACUu1pZSU3Dq2qIN")).toBe("6gv6gQACUu1pZSU3Dq2qIN")
  })

  test("returns null for a non-track URI (no enrichment, plays verbatim)", () => {
    expect(parseTrackId("spotify:episode:abc")).toBeNull()
    expect(parseTrackId("spotify:track:")).toBeNull()
    expect(parseTrackId("not-a-uri")).toBeNull()
  })
})

describe("trackToResolved", () => {
  test("maps a resolved Spotify track to name + artist names on the --uri path", () => {
    expect(
      trackToResolved("spotify:track:2", {
        id: "2",
        name: "Bulletproof",
        artists: [{ name: "Em Beihold" }],
      })
    ).toEqual({ name: "Bulletproof", uri: "spotify:track:2", id: "2", artists: ["Em Beihold"] })
  })

  test("tolerates a track with no artists array (empty artists)", () => {
    expect(trackToResolved("spotify:track:3", { id: "3", name: "Solo" })).toEqual({
      name: "Solo",
      uri: "spotify:track:3",
      id: "3",
      artists: [],
    })
  })
})
