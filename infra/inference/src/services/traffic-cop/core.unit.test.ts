import { describe, expect, test } from "bun:test"
import { decideSwap, launchdTarget, upstreamUrl } from "./core"

describe("decideSwap", () => {
  const WARM = ["moss-tts", "image-gen"]

  test("cold path (nothing resident) starts only", () => {
    expect(decideSwap({ requested: "kokoro", resident: [], warmSet: [] })).toEqual({
      stops: [],
      start: "kokoro",
    })
  })

  test("already-resident non-warm request is a no-op", () => {
    expect(decideSwap({ requested: "kokoro", resident: ["kokoro"], warmSet: [] })).toEqual({
      stops: [],
      start: null,
    })
  })

  test("non-warm swap stops the old and starts the new", () => {
    expect(decideSwap({ requested: "ollama", resident: ["kokoro"], warmSet: [] })).toEqual({
      stops: ["kokoro"],
      start: "ollama",
    })
  })

  test("warm member loads alongside a resident warm sibling — no eviction", () => {
    expect(decideSwap({ requested: "image-gen", resident: ["moss-tts"], warmSet: WARM })).toEqual({
      stops: [],
      start: "image-gen",
    })
  })

  test("warm member already resident with a warm sibling is a no-op", () => {
    expect(
      decideSwap({ requested: "moss-tts", resident: ["moss-tts", "image-gen"], warmSet: WARM })
    ).toEqual({ stops: [], start: null })
  })

  test("a non-warm request evicts the whole warm set to stay within the RSS budget", () => {
    expect(
      decideSwap({ requested: "ollama", resident: ["moss-tts", "image-gen"], warmSet: WARM })
    ).toEqual({ stops: ["moss-tts", "image-gen"], start: "ollama" })
  })

  test("a warm request evicts only the non-warm residents, keeping warm siblings", () => {
    expect(
      decideSwap({ requested: "moss-tts", resident: ["ollama", "image-gen"], warmSet: WARM })
    ).toEqual({ stops: ["ollama"], start: "moss-tts" })
  })

  test("decision depends only on its inputs (pure)", () => {
    const a = decideSwap({ requested: "image-gen", resident: ["moss-tts"], warmSet: WARM })
    const b = decideSwap({ requested: "image-gen", resident: ["moss-tts"], warmSet: WARM })
    expect(a).toEqual(b)
  })
})

describe("upstreamUrl", () => {
  test("composes host, port, path, and search", () => {
    expect(upstreamUrl(18086, "/v1/images/generations", "?n=1")).toBe(
      "http://127.0.0.1:18086/v1/images/generations?n=1"
    )
  })

  test("empty search yields no trailing question mark", () => {
    expect(upstreamUrl(21434, "/api/version", "")).toBe("http://127.0.0.1:21434/api/version")
  })

  test("root path", () => {
    expect(upstreamUrl(18083, "/", "")).toBe("http://127.0.0.1:18083/")
  })
})

describe("launchdTarget", () => {
  test("builds the gui/<uid>/<label> domain target", () => {
    expect(launchdTarget(501, "com.alanwalton.inference.image-gen")).toBe(
      "gui/501/com.alanwalton.inference.image-gen"
    )
  })
})
