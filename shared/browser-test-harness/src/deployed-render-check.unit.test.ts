import { describe, expect, test } from "bun:test"
import {
  classifyExpectedAttr,
  classifyExpectedCount,
  classifyExpectedTitleDom,
  classifyExpectedTitleInitialHtml,
  decideDeployedRenderVerdict,
  type RenderObservation,
} from "./deployed-render-check"

function healthy(overrides: Partial<RenderObservation> = {}): RenderObservation {
  return {
    pageTypeSlug: "story",
    signInRedirect: false,
    serverError: false,
    notFound: false,
    renderedNonBlank: true,
    rootElementPresent: true,
    contentSettleTimedOut: false,
    expectedText: "not-checked",
    expectedTitleDom: "not-checked",
    expectedTitleInitialHtml: "not-checked",
    expectedCount: { kind: "not-checked" },
    expectedAttr: { kind: "not-checked" },
    ...overrides,
  }
}

describe("decideDeployedRenderVerdict — healthy renders PASS", () => {
  test("owner-owned with expected text present → PASS", () => {
    expect(decideDeployedRenderVerdict(healthy({ expectedText: "present" })).verdict).toBe("PASS")
  })

  test("an app page with an assertion is decided exactly like any other → PASS", () => {
    expect(
      decideDeployedRenderVerdict(healthy({ pageTypeSlug: "app", expectedText: "present" })).verdict
    ).toBe("PASS")
  })
})

describe("decideDeployedRenderVerdict — the fail-loud guard (acceptance #2)", () => {
  test("owner-owned blank render → FAIL (cannot claim prod-verified)", () => {
    const v = decideDeployedRenderVerdict(healthy({ renderedNonBlank: false }))
    expect(v.verdict).toBe("FAIL")
    expect(v.reason.toLowerCase()).toContain("blank")
  })

  test("owner-owned 404 → FAIL", () => {
    const v = decideDeployedRenderVerdict(healthy({ notFound: true }))
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toMatch(/404|not found/i)
  })

  test("owner-owned /sign-in redirect → FAIL (session not authenticated for owner read)", () => {
    const v = decideDeployedRenderVerdict(healthy({ signInRedirect: true }))
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toMatch(/sign-in/i)
  })

  test("owner-owned server error / 5xx → FAIL", () => {
    const v = decideDeployedRenderVerdict(healthy({ serverError: true }))
    expect(v.verdict).toBe("FAIL")
  })

  test("owner-owned missing root element → FAIL", () => {
    const v = decideDeployedRenderVerdict(healthy({ rootElementPresent: false }))
    expect(v.verdict).toBe("FAIL")
  })

  test("owner-owned expected text absent → FAIL", () => {
    const v = decideDeployedRenderVerdict(healthy({ expectedText: "absent" }))
    expect(v.verdict).toBe("FAIL")
    expect(v.reason.toLowerCase()).toContain("text")
  })

  test("anon app page blank → FAIL (genuinely broken, no session-blindness ambiguity)", () => {
    const v = decideDeployedRenderVerdict(healthy({ pageTypeSlug: "app", renderedNonBlank: false }))
    expect(v.verdict).toBe("FAIL")
  })
})

describe("decideDeployedRenderVerdict — TIMEOUT is INDETERMINATE, not FAIL (#15626)", () => {
  test("blank + settle timed out → INDETERMINATE (healthy-but-slow, retryable)", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ renderedNonBlank: false, contentSettleTimedOut: true })
    )
    expect(v.verdict).toBe("INDETERMINATE")
  })

  test("expected text absent + settle timed out → INDETERMINATE", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedText: "absent", contentSettleTimedOut: true })
    )
    expect(v.verdict).toBe("INDETERMINATE")
  })

  test("root element absent + settle timed out → INDETERMINATE", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ rootElementPresent: false, contentSettleTimedOut: true })
    )
    expect(v.verdict).toBe("INDETERMINATE")
  })

  test("blank but NOT timed out (settled to a stable empty) → FAIL (genuine empty render)", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ renderedNonBlank: false, contentSettleTimedOut: false })
    )
    expect(v.verdict).toBe("FAIL")
  })

  test("/sign-in wall stays a hard FAIL even under a settle timeout (positive signal wins)", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ signInRedirect: true, contentSettleTimedOut: true })
    )
    expect(v.verdict).toBe("FAIL")
  })

  test("5xx stays a hard FAIL even under a settle timeout", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ serverError: true, contentSettleTimedOut: true })
    )
    expect(v.verdict).toBe("FAIL")
  })

  test("404 stays a hard FAIL even under a settle timeout", () => {
    const v = decideDeployedRenderVerdict(healthy({ notFound: true, contentSettleTimedOut: true }))
    expect(v.verdict).toBe("FAIL")
  })
})

describe("decideDeployedRenderVerdict — a PASS cannot have a zero denominator", () => {
  for (const slug of ["story", "app", "stroy", ""]) {
    test(`page type "${slug}", structurally healthy, NO assertion checked → not a PASS`, () => {
      const v = decideDeployedRenderVerdict(healthy({ pageTypeSlug: slug }))
      expect(v.verdict).not.toBe("PASS")
      expect(v.reason).toMatch(/discriminating/i)
    })
  }

  test("expect-text alone earns a PASS, and the reason names it", () => {
    const v = decideDeployedRenderVerdict(healthy({ expectedText: "present" }))
    expect(v.verdict).toBe("PASS")
    expect(v.reason).toContain("1")
    expect(v.reason).toContain("expect-text")
  })

  test("a count assertion alone earns a PASS", () => {
    const v = decideDeployedRenderVerdict(healthy({ expectedCount: { kind: "match" } }))
    expect(v.verdict).toBe("PASS")
    expect(v.reason).toContain("expect-count")
  })

  test("an attr assertion alone earns a PASS", () => {
    const v = decideDeployedRenderVerdict(healthy({ expectedAttr: { kind: "match" } }))
    expect(v.verdict).toBe("PASS")
    expect(v.reason).toContain("expect-attr")
  })

  test("the denominator counts every discriminating assertion that ran, not just the first", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedText: "present", expectedCount: { kind: "match" } })
    )
    expect(v.verdict).toBe("PASS")
    expect(v.reason).toContain("over 2 discriminating")
  })

  test("a title assertion does not count toward the denominator, and cannot earn a PASS alone", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedTitleDom: "match", expectedTitleInitialHtml: "present" })
    )
    expect(v.verdict).not.toBe("PASS")
    expect(v.reason).toMatch(/discriminating/i)
  })

  test("a 404 still reports as a 404, not as a missing assertion", () => {
    const v = decideDeployedRenderVerdict(healthy({ notFound: true }))
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toMatch(/404|not found/i)
  })
})

describe("decideDeployedRenderVerdict — reason wording distinguishes the illusory class", () => {
  test("owner-owned empty names the prod-verified / owner-owned class", () => {
    const v = decideDeployedRenderVerdict(healthy({ renderedNonBlank: false }))
    expect(v.reason.toLowerCase()).toMatch(/owner-owned|prod-verified/)
  })
})

describe("classifyExpectedTitleDom", () => {
  test("not-checked when no --expect-title", () => {
    expect(classifyExpectedTitleDom(undefined, "Idle")).toBe("not-checked")
  })
  test("exact match → match", () => {
    expect(classifyExpectedTitleDom("Idle", "Idle")).toBe("match")
  })
  test("substring is NOT enough — equality is exact", () => {
    expect(classifyExpectedTitleDom("Idle", "Idle — Alan Walton")).toBe("mismatch")
  })
})

describe("classifyExpectedTitleInitialHtml", () => {
  test("not-checked when no --expect-title", () => {
    expect(classifyExpectedTitleInitialHtml(undefined, "<html></html>")).toBe("not-checked")
  })
  test("title element containing the expected string → present", () => {
    expect(classifyExpectedTitleInitialHtml("Idle", "<head><title>Idle</title></head>")).toBe(
      "present"
    )
  })
  test("document with NO title element → absent (the #14177 class)", () => {
    expect(classifyExpectedTitleInitialHtml("Idle", "<head><link rel='icon'></head>")).toBe(
      "absent"
    )
  })
  test("title element with the wrong text → absent", () => {
    expect(
      classifyExpectedTitleInitialHtml("Idle", "<head><title>Alan Walton</title></head>")
    ).toBe("absent")
  })
})

describe("decideDeployedRenderVerdict — --expect-title assertions (#14177)", () => {
  test("document.title matches AND title in initial HTML → PASS", () => {
    const v = decideDeployedRenderVerdict(
      healthy({
        expectedText: "present",
        expectedTitleDom: "match",
        expectedTitleInitialHtml: "present",
      })
    )
    expect(v.verdict).toBe("PASS")
  })

  test("document.title mismatch → FAIL naming the title signal", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedTitleDom: "mismatch", expectedTitleInitialHtml: "present" })
    )
    expect(v.verdict).toBe("FAIL")
    expect(v.reason.toLowerCase()).toContain("title")
  })

  test("title absent from initial SSR HTML → FAIL even when the DOM title matches post-hydration", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedTitleDom: "match", expectedTitleInitialHtml: "absent" })
    )
    expect(v.verdict).toBe("FAIL")
    expect(v.reason.toLowerCase()).toContain("initial")
  })

  test("not-checked title signals do not affect the verdict", () => {
    const v = decideDeployedRenderVerdict(healthy({ expectedText: "present" }))
    expect(v.verdict).toBe("PASS")
  })
})

describe("classifyExpectedCount", () => {
  test("not-checked when selector or expected count absent", () => {
    expect(classifyExpectedCount({ selector: undefined, expected: 1, actual: 2 })).toEqual({
      kind: "not-checked",
    })
    expect(classifyExpectedCount({ selector: ".card", expected: undefined, actual: 2 })).toEqual({
      kind: "not-checked",
    })
  })
  test("actual === expected → match", () => {
    expect(classifyExpectedCount({ selector: ".card", expected: 1, actual: 1 })).toEqual({
      kind: "match",
    })
  })
  test("actual !== expected → mismatch carrying selector/expected/actual (the dup catch)", () => {
    expect(classifyExpectedCount({ selector: ".card", expected: 1, actual: 2 })).toEqual({
      kind: "mismatch",
      selector: ".card",
      expected: 1,
      actual: 2,
    })
  })
  test("zero found where one expected → mismatch (element genuinely missing)", () => {
    expect(classifyExpectedCount({ selector: ".card", expected: 1, actual: 0 })).toEqual({
      kind: "mismatch",
      selector: ".card",
      expected: 1,
      actual: 0,
    })
  })
})

describe("classifyExpectedAttr", () => {
  const base = {
    selector: "button.remove",
    attribute: "class",
    expected: "muted",
    mode: "contains-token" as const,
  }
  test("not-checked when any of selector/attribute/expected absent", () => {
    expect(
      classifyExpectedAttr({
        ...base,
        selector: undefined,
        elementFound: true,
        actualValue: "muted",
      }).kind
    ).toBe("not-checked")
    expect(
      classifyExpectedAttr({
        ...base,
        attribute: undefined,
        elementFound: true,
        actualValue: "muted",
      }).kind
    ).toBe("not-checked")
    expect(
      classifyExpectedAttr({
        ...base,
        expected: undefined,
        elementFound: true,
        actualValue: "muted",
      }).kind
    ).toBe("not-checked")
  })
  test("selector matched nothing → element-absent", () => {
    expect(classifyExpectedAttr({ ...base, elementFound: false, actualValue: null })).toEqual({
      kind: "element-absent",
      selector: "button.remove",
    })
  })
  test("class token present in the list → match (contains-token)", () => {
    expect(
      classifyExpectedAttr({ ...base, elementFound: true, actualValue: "btn muted rounded" })
    ).toEqual({ kind: "match" })
  })
  test("class token absent → mismatch (the restyle catch)", () => {
    expect(
      classifyExpectedAttr({ ...base, elementFound: true, actualValue: "btn destructive rounded" })
    ).toEqual({
      kind: "mismatch",
      selector: "button.remove",
      attribute: "class",
      expected: "muted",
      actual: "btn destructive rounded",
    })
  })
  test("contains-token requires a WHOLE token, not a substring", () => {
    expect(
      classifyExpectedAttr({ ...base, elementFound: true, actualValue: "unmuted mutedy" }).kind
    ).toBe("mismatch")
  })
  test("equals mode → exact attribute-value match", () => {
    expect(
      classifyExpectedAttr({
        selector: "[data-x]",
        attribute: "data-x",
        expected: "on",
        mode: "equals",
        elementFound: true,
        actualValue: "on",
      })
    ).toEqual({ kind: "match" })
    expect(
      classifyExpectedAttr({
        selector: "[data-x]",
        attribute: "data-x",
        expected: "on",
        mode: "equals",
        elementFound: true,
        actualValue: "off",
      }).kind
    ).toBe("mismatch")
  })
  test("attribute absent on a found element → mismatch with actual null", () => {
    expect(
      classifyExpectedAttr({
        selector: "[data-x]",
        attribute: "data-x",
        expected: "on",
        mode: "equals",
        elementFound: true,
        actualValue: null,
      })
    ).toEqual({
      kind: "mismatch",
      selector: "[data-x]",
      attribute: "data-x",
      expected: "on",
      actual: null,
    })
  })
})

describe("decideDeployedRenderVerdict — count/attr assertions", () => {
  test("count match + attr match → PASS", () => {
    expect(
      decideDeployedRenderVerdict(
        healthy({ expectedCount: { kind: "match" }, expectedAttr: { kind: "match" } })
      ).verdict
    ).toBe("PASS")
  })
  test("count mismatch → FAIL naming the selector + counts", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedCount: { kind: "mismatch", selector: ".card", expected: 1, actual: 2 } })
    )
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toContain(".card")
    expect(v.reason).toMatch(/\b1\b/)
    expect(v.reason).toMatch(/\b2\b/)
  })
  test("attr element-absent → FAIL naming the selector", () => {
    const v = decideDeployedRenderVerdict(
      healthy({ expectedAttr: { kind: "element-absent", selector: "button.remove" } })
    )
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toContain("button.remove")
  })
  test("attr mismatch → FAIL naming attribute + expected value", () => {
    const v = decideDeployedRenderVerdict(
      healthy({
        expectedAttr: {
          kind: "mismatch",
          selector: "button.remove",
          attribute: "class",
          expected: "muted",
          actual: "destructive",
        },
      })
    )
    expect(v.verdict).toBe("FAIL")
    expect(v.reason).toContain("muted")
    expect(v.reason).toContain("class")
  })
})
