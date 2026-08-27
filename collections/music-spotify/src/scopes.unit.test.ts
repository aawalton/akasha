import { describe, expect, test } from "bun:test"
import { SPOTIFY_SCOPE_STRING, SPOTIFY_SCOPES } from "./scopes"

describe("scopes", () => {
  test("includes the full read+write set", () => {
    for (const scope of [
      "user-read-private",
      "user-library-read",
      "playlist-modify-private",
      "user-library-modify",
      "user-follow-modify",
      "user-modify-playback-state",
      "ugc-image-upload",
    ]) {
      expect(SPOTIFY_SCOPES).toContain(scope)
    }
  })

  test("the joined string is space-delimited and lossless", () => {
    expect(SPOTIFY_SCOPE_STRING.split(" ")).toEqual([...SPOTIFY_SCOPES])
  })
})
