import { describe, expect, it, test } from "bun:test"
import { pct, signedPct } from "./format"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"

describe("fmt (canonical 3-significant-figure short formatter, #14567)", () => {
  it("shows values below 1000 as their natural number — integer as-is, fractional to 3 sig figs", () => {
    expect(fmt(999)).toBe("999")
    expect(fmt(42)).toBe("42")
    expect(fmt(12.7)).toBe("12.7")
    expect(fmt(8.47)).toBe("8.47")
    expect(fmt(-42)).toBe("-42")
  })
  it("renders exactly 3 significant figures with a magnitude suffix above 1000", () => {
    expect(fmt(1_000_000)).toBe("1.00M")
    expect(fmt(12_400_000)).toBe("12.4M")
    expect(fmt(124_000_000)).toBe("124M")
    expect(fmt(2_260_000_000)).toBe("2.26B")
    expect(fmt(12_340)).toBe("12.3K")
    expect(fmt(1_230_000)).toBe("1.23M")
    expect(fmt(1_230_000_000_000)).toBe("1.23T")
  })
  it("degrades non-finite input to 0", () => {
    expect(fmt(Number.NaN)).toBe("0")
  })
})

describe("format — pct (fraction → whole percent)", () => {
  test("rounds a 0..1 fraction to a whole percent", () => {
    expect(pct(0.2)).toBe(20)
    expect(pct(0.015)).toBe(2)
    expect(pct(1.5)).toBe(150)
    expect(pct(0)).toBe(0)
  })

  test("non-finite input degrades to 0", () => {
    expect(pct(Number.NaN)).toBe(0)
    expect(pct(Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe("signedPct", () => {
  it("renders a positive synergy with a + sign and not negative", () => {
    expect(signedPct(0.45)).toEqual({ text: "+45%", negative: false })
  })
  it("renders a negative synergy with a U+2212 minus and abs value", () => {
    expect(signedPct(-0.08)).toEqual({ text: "−8%", negative: true })
  })
  it("treats exactly zero as a non-negative +0%", () => {
    expect(signedPct(0)).toEqual({ text: "+0%", negative: false })
  })
  it("rounds to the nearest whole percent", () => {
    expect(signedPct(0.126).text).toBe("+13%")
    expect(signedPct(-0.124).text).toBe("−12%")
  })
})
