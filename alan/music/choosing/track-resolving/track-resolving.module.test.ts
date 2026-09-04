import { describe, expect, test } from "bun:test"
import { parseTrackId, trackToResolved } from "./track-resolving.module.code.ts"

describe("parseTrackId", () => {
  test("reads the id out of a track uri", () => {
    expect(parseTrackId("spotify:track:4cOdK2wGLETKBW3PvgPWqT")).toBe("4cOdK2wGLETKBW3PvgPWqT")
  })

  test("reads an id of letters and digits alone", () => {
    expect(parseTrackId("spotify:track:abc123")).toBe("abc123")
  })

  test("answers nothing for a uri naming another kind of thing", () => {
    expect(parseTrackId("spotify:album:4cOdK2wGLETKBW3PvgPWqT")).toBeNull()
    expect(parseTrackId("spotify:artist:4cOdK2wGLETKBW3PvgPWqT")).toBeNull()
  })

  test("answers nothing for a bare id", () => {
    expect(parseTrackId("4cOdK2wGLETKBW3PvgPWqT")).toBeNull()
  })

  test("answers nothing for a uri naming no id", () => {
    expect(parseTrackId("spotify:track:")).toBeNull()
  })

  test("answers nothing for a uri carrying anything more", () => {
    expect(parseTrackId("spotify:track:abc123?si=1")).toBeNull()
    expect(parseTrackId(" spotify:track:abc123")).toBeNull()
  })

  test("answers nothing for empty text", () => {
    expect(parseTrackId("")).toBeNull()
  })
})

describe("trackToResolved", () => {
  test("carries the name, the uri and the id through", () => {
    const resolved = trackToResolved("spotify:track:abc123", {
      id: "abc123",
      name: "Motion Sickness",
    })
    expect(resolved.name).toBe("Motion Sickness")
    expect(resolved.uri).toBe("spotify:track:abc123")
    expect(resolved.id).toBe("abc123")
  })

  test("names every artist the track names", () => {
    const resolved = trackToResolved("spotify:track:abc123", {
      id: "abc123",
      name: "Motion Sickness",
      artists: [{ name: "Phoebe Bridgers" }, { name: "Conor Oberst" }],
    })
    expect(resolved.artists).toEqual(["Phoebe Bridgers", "Conor Oberst"])
  })

  test("names no artist where the track names none", () => {
    const resolved = trackToResolved("spotify:track:abc123", { id: "abc123", name: "Motion" })
    expect(resolved.artists).toEqual([])
  })

  test("keeps the uri it was given rather than one built from the id", () => {
    const resolved = trackToResolved("spotify:track:zzz", { id: "abc123", name: "Motion" })
    expect(resolved.uri).toBe("spotify:track:zzz")
  })
})
