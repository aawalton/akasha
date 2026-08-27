import { describe, expect, test } from "bun:test"
import { formatPropertyNumber, formatShortNumber } from "./number"

function percentFormatter(decimals: number): Intl.NumberFormat {
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function compactFormatter(decimals?: number): Intl.NumberFormat {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    ...(decimals === undefined ? {} : { maximumFractionDigits: decimals }),
  })
}

describe("formatPropertyNumber", () => {
  test("format=number renders bare integers without grouping at any magnitude", () => {
    expect(formatPropertyNumber(0, { format: "number" })).toBe("0")
    expect(formatPropertyNumber(42, { format: "number" })).toBe("42")
    expect(formatPropertyNumber(7633, { format: "number" })).toBe("7633")
    expect(formatPropertyNumber(9999, { format: "number" })).toBe("9999")
    expect(formatPropertyNumber(10000, { format: "number" })).toBe("10000")
    expect(formatPropertyNumber(123456, { format: "number" })).toBe("123456")
    expect(formatPropertyNumber(-12345, { format: "number" })).toBe("-12345")
  })

  test("format=number preserves decimals without grouping when decimals is unset", () => {
    expect(formatPropertyNumber(1234.5, { format: "number" })).toBe("1234.5")
    expect(formatPropertyNumber(12345.6, { format: "number" })).toBe("12345.6")
  })

  test("format=number with decimals fixes the fraction-digit count", () => {
    expect(formatPropertyNumber(1234.5, { format: "number", decimals: 2 })).toBe("1234.50")
    expect(formatPropertyNumber(42, { format: "number", decimals: 1 })).toBe("42.0")
    expect(formatPropertyNumber(1.23456, { format: "number", decimals: 2 })).toBe("1.23")
    expect(formatPropertyNumber(2.5, { format: "number", decimals: 0 })).toBe("3")
  })

  test("format=number-with-separators groups thousands at any magnitude", () => {
    expect(formatPropertyNumber(0, { format: "number-with-separators" })).toBe((0).toLocaleString())
    expect(formatPropertyNumber(1234, { format: "number-with-separators" })).toBe(
      (1234).toLocaleString()
    )
    expect(formatPropertyNumber(123456, { format: "number-with-separators" })).toBe(
      (123456).toLocaleString()
    )
    expect(formatPropertyNumber(-12345, { format: "number-with-separators" })).toBe(
      (-12345).toLocaleString()
    )
  })

  test("format=number-with-separators with decimals fixes the fraction-digit count", () => {
    const expected = (1234.5).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    expect(formatPropertyNumber(1234.5, { format: "number-with-separators", decimals: 2 })).toBe(
      expected
    )
  })

  test("round=floor snaps toward −∞ before formatting (floored points)", () => {
    expect(formatPropertyNumber(2.5, { format: "number", decimals: 0, round: "floor" })).toBe("2")
    expect(formatPropertyNumber(48075.605, { format: "number", decimals: 0, round: "floor" })).toBe(
      "48075"
    )
    expect(
      formatPropertyNumber(48075.605, { format: "number-with-separators", round: "floor" })
    ).toBe((48075).toLocaleString())
    expect(
      formatPropertyNumber(45364, { format: "number-with-separators", decimals: 0, round: "floor" })
    ).toBe((45364).toLocaleString())
    expect(formatPropertyNumber(-0.5, { format: "number", decimals: 0, round: "floor" })).toBe("-1")
  })

  test("round=ceil snaps toward +∞ before formatting", () => {
    expect(formatPropertyNumber(2.1, { format: "number", decimals: 0, round: "ceil" })).toBe("3")
    expect(formatPropertyNumber(1.001, { format: "number", decimals: 2, round: "ceil" })).toBe(
      "1.01"
    )
  })

  test("round absent leaves the platform's half-to-even rounding intact", () => {
    expect(formatPropertyNumber(2.5, { format: "number", decimals: 0 })).toBe("3")
    expect(formatPropertyNumber(48075.605, { format: "number", decimals: 0 })).toBe("48076")
  })

  test("format=percent defaults to percentBasis 100 with two decimal places", () => {
    expect(formatPropertyNumber(42, { format: "percent" })).toBe(percentFormatter(2).format(0.42))
    expect(formatPropertyNumber(0, { format: "percent" })).toBe(percentFormatter(2).format(0))
    expect(formatPropertyNumber(100, { format: "percent" })).toBe(percentFormatter(2).format(1))
    expect(formatPropertyNumber(12.345, { format: "percent" })).toBe(
      percentFormatter(2).format(0.12345)
    )
    expect(formatPropertyNumber(-25, { format: "percent" })).toBe(percentFormatter(2).format(-0.25))
  })

  test("format=percent with percentBasis 1 treats input as fractional", () => {
    expect(formatPropertyNumber(0.42, { format: "percent", percentBasis: 1 })).toBe(
      percentFormatter(2).format(0.42)
    )
    expect(formatPropertyNumber(1, { format: "percent", percentBasis: 1 })).toBe(
      percentFormatter(2).format(1)
    )
  })

  test("format=percent honors an explicit decimals count", () => {
    expect(formatPropertyNumber(42, { format: "percent", decimals: 0 })).toBe(
      percentFormatter(0).format(0.42)
    )
    expect(formatPropertyNumber(0.5, { format: "percent", percentBasis: 1, decimals: 0 })).toBe(
      percentFormatter(0).format(0.5)
    )
    expect(formatPropertyNumber(12.3456, { format: "percent", decimals: 3 })).toBe(
      percentFormatter(3).format(0.123456)
    )
  })

  test("format=compact renders short-form magnitudes (acceptance values, en-US)", () => {
    expect(formatPropertyNumber(1234, { format: "compact", decimals: 0 })).toBe("1K")
    expect(formatPropertyNumber(1234, { format: "compact", decimals: 1 })).toBe("1.2K")
    expect(formatPropertyNumber(3400000, { format: "compact", decimals: 1 })).toBe("3.4M")
  })

  test("format=short renders 3 significant figures with a magnitude suffix, ignoring decimals", () => {
    expect(formatPropertyNumber(1_000_000, { format: "short" })).toBe("1.00M")
    expect(formatPropertyNumber(12_400_000, { format: "short" })).toBe("12.4M")
    expect(formatPropertyNumber(124_000_000, { format: "short" })).toBe("124M")
    expect(formatPropertyNumber(2_260_000_000, { format: "short" })).toBe("2.26B")
    expect(formatPropertyNumber(999, { format: "short" })).toBe("999")
    expect(formatPropertyNumber(0, { format: "short" })).toBe("0")
    expect(formatPropertyNumber(2_260_000_000, { format: "short", decimals: 0 })).toBe("2.26B")
  })

  test("format=compact caps fraction digits via maximumFractionDigits (composition)", () => {
    expect(formatPropertyNumber(1234, { format: "compact", decimals: 0 })).toBe(
      compactFormatter(0).format(1234)
    )
    expect(formatPropertyNumber(1234, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(1234)
    )
    expect(formatPropertyNumber(1234, { format: "compact", decimals: 2 })).toBe(
      compactFormatter(2).format(1234)
    )
    expect(formatPropertyNumber(1000, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(1000)
    )
  })

  test("format=compact with decimals unset uses Intl's default compact fraction digits", () => {
    expect(formatPropertyNumber(1234, { format: "compact" })).toBe(compactFormatter().format(1234))
    expect(formatPropertyNumber(3400000, { format: "compact" })).toBe(
      compactFormatter().format(3400000)
    )
  })

  test("format=compact passes values below 1000 through unchanged", () => {
    expect(formatPropertyNumber(0, { format: "compact", decimals: 0 })).toBe(
      compactFormatter(0).format(0)
    )
    expect(formatPropertyNumber(42, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(42)
    )
    expect(formatPropertyNumber(999, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(999)
    )
  })

  test("format=compact renders negatives", () => {
    expect(formatPropertyNumber(-1234, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(-1234)
    )
    expect(formatPropertyNumber(-3400000, { format: "compact", decimals: 1 })).toBe(
      compactFormatter(1).format(-3400000)
    )
  })

  test("format=compact honors round by snapping to the decimals grid first", () => {
    expect(formatPropertyNumber(1250, { format: "compact", decimals: 1, round: "floor" })).toBe(
      compactFormatter(1).format(1250)
    )
    expect(formatPropertyNumber(1.9, { format: "compact", decimals: 0, round: "ceil" })).toBe(
      compactFormatter(0).format(2)
    )
    expect(formatPropertyNumber(1.9, { format: "compact", decimals: 0, round: "floor" })).toBe(
      compactFormatter(0).format(1)
    )
  })
})

describe("formatShortNumber (canonical 3-significant-figure short formatter, #14567)", () => {
  test("shows values below 1000 as their natural number — integer as-is, fractional to 3 sig figs", () => {
    expect(formatShortNumber(0)).toBe("0")
    expect(formatShortNumber(42)).toBe("42")
    expect(formatShortNumber(999)).toBe("999")
    expect(formatShortNumber(12.5)).toBe("12.5")
    expect(formatShortNumber(8.47)).toBe("8.47")
    expect(formatShortNumber(125.7)).toBe("126")
    expect(formatShortNumber(-42)).toBe("-42")
  })

  test("renders exactly 3 significant figures with a magnitude suffix above 1000 (trailing zeros kept)", () => {
    expect(formatShortNumber(1_000_000)).toBe("1.00M")
    expect(formatShortNumber(12_400_000)).toBe("12.4M")
    expect(formatShortNumber(124_000_000)).toBe("124M")
    expect(formatShortNumber(2_260_000_000)).toBe("2.26B")
    expect(formatShortNumber(12_340)).toBe("12.3K")
    expect(formatShortNumber(1_230_000_000_000)).toBe("1.23T")
    expect(formatShortNumber(-2_260_000_000)).toBe("-2.26B")
  })

  test("rounding that carries into the next tier promotes the suffix (no '1000M')", () => {
    expect(formatShortNumber(999_600_000)).toBe("1.00B")
    expect(formatShortNumber(999.6)).toBe("1.00K")
  })

  test("degrades non-finite input to 0", () => {
    expect(formatShortNumber(Number.NaN)).toBe("0")
    expect(formatShortNumber(Number.POSITIVE_INFINITY)).toBe("0")
  })
})
