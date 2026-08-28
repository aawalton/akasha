import { describe, expect, it } from "bun:test"
import { renderHook } from "@shared/utils-test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { useLiveNow } from "./use-live-now"

const liveFormulaDef = (live: boolean): PropertyDefinition => ({
  id: "f",
  title: "F",
  type: "number",
  config: {
    expression: "if(now == 0, 111, 222)",
    ...(live ? { live: true } : {}),
  },
})

describe("useLiveNow", () => {
  it("ticks now past 0 on mount when a live formula def is present", () => {
    const { result } = renderHook(() => useLiveNow([liveFormulaDef(true)], 20))
    expect(result.current).toBeGreaterThan(0)
  })

  it("keeps now at 0 when no def is a live formula (no interval runs)", () => {
    const { result } = renderHook(() => useLiveNow([liveFormulaDef(false)], 20))
    expect(result.current).toBe(0)
  })

  it("keeps now at 0 for an empty def list", () => {
    const { result } = renderHook(() => useLiveNow([], 20))
    expect(result.current).toBe(0)
  })
})
