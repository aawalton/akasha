import { describe, expect, test } from "bun:test"
import { renderHook } from "@shared/utils-test"
import { type InlineCompletionSource, useInlineCompletion } from "./use-inline-completion"

const sourceTags = (
  candidates: readonly string[],
  frequency?: ReadonlyMap<string, number>
): InlineCompletionSource => ({
  sigil: "@",
  candidates,
  ...(frequency !== undefined ? { frequency } : {}),
})

describe("useInlineCompletion", () => {
  test("active token: cursor at end of `@fo` suggests the suffix of the matching candidate", () => {
    const value = "hello @fo"
    const { result } = renderHook(() =>
      useInlineCompletion({
        value,
        cursorPos: value.length,
        sources: [sourceTags(["foo"])],
      })
    )
    expect(result.current.suggestion).toBe("o")
  })

  test("no active token at cursor: suggestion is null", () => {
    const value = "hello @foo bar"
    const { result } = renderHook(() =>
      useInlineCompletion({
        value,
        cursorPos: value.length,
        sources: [sourceTags(["foo", "frob"])],
      })
    )
    expect(result.current.suggestion).toBeNull()
  })

  test("frequency ranking: prefers higher-frequency candidate when both match", () => {
    const value = "@f"
    const freq = new Map<string, number>([
      ["foo", 1],
      ["frob", 5],
    ])
    const { result } = renderHook(() =>
      useInlineCompletion({
        value,
        cursorPos: value.length,
        sources: [sourceTags(["foo", "frob"], freq)],
      })
    )
    expect(result.current.suggestion).toBe("rob")
  })

  test("accept(): replaces active token with `<sigil><match> ` (trailing space)", () => {
    const value = "hello @fo"
    const { result } = renderHook(() =>
      useInlineCompletion({
        value,
        cursorPos: value.length,
        sources: [sourceTags(["foo"])],
      })
    )
    expect(result.current.accept()).toBe("hello @foo ")
  })

  test("multiple sigils: active token routes to its own source's candidates", () => {
    const tagSource: InlineCompletionSource = {
      sigil: "@",
      candidates: ["alpha", "beta"],
    }
    const hashSource: InlineCompletionSource = {
      sigil: "#",
      candidates: ["xenon", "yttrium"],
    }
    const sources = [tagSource, hashSource]

    const valueHash = "title #x"
    const { result: rHash } = renderHook(() =>
      useInlineCompletion({
        value: valueHash,
        cursorPos: valueHash.length,
        sources,
      })
    )
    expect(rHash.current.suggestion).toBe("enon")

    const valueAt = "title @a"
    const { result: rAt } = renderHook(() =>
      useInlineCompletion({
        value: valueAt,
        cursorPos: valueAt.length,
        sources,
      })
    )
    expect(rAt.current.suggestion).toBe("lpha")
  })
})
