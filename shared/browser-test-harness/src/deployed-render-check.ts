import { z } from "zod"

export type ExpectedTextStatus = "present" | "absent" | "not-checked"

export type ExpectedTitleDomStatus = "match" | "mismatch" | "not-checked"

export type ExpectedTitleInitialHtmlStatus = "present" | "absent" | "not-checked"

export function classifyExpectedTitleDom(
  expectTitle: string | undefined,
  domTitle: string
): ExpectedTitleDomStatus {
  if (expectTitle === undefined) return "not-checked"
  return domTitle === expectTitle ? "match" : "mismatch"
}

const TITLE_CAPTURE_SCHEMA = z.array(z.string()).nullable()

export function classifyExpectedTitleInitialHtml(
  expectTitle: string | undefined,
  initialHtml: string
): ExpectedTitleInitialHtmlStatus {
  if (expectTitle === undefined) return "not-checked"
  const captures = TITLE_CAPTURE_SCHEMA.parse(/<title[^>]*>([^<]*)<\/title>/i.exec(initialHtml))
  if (captures === null) return "absent"
  return captures[1]?.includes(expectTitle) === true ? "present" : "absent"
}

export type ExpectedCountStatus =
  | { readonly kind: "not-checked" }
  | { readonly kind: "match" }
  | {
      readonly kind: "mismatch"
      readonly selector: string
      readonly expected: number
      readonly actual: number
    }

export function classifyExpectedCount(input: {
  readonly selector: string | undefined
  readonly expected: number | undefined
  readonly actual: number
}): ExpectedCountStatus {
  if (input.selector === undefined || input.expected === undefined) {
    return { kind: "not-checked" }
  }
  return input.actual === input.expected
    ? { kind: "match" }
    : { kind: "mismatch", selector: input.selector, expected: input.expected, actual: input.actual }
}

export type ExpectedAttrMode = "equals" | "contains-token"

export type ExpectedAttrStatus =
  | { readonly kind: "not-checked" }
  | { readonly kind: "match" }
  | { readonly kind: "element-absent"; readonly selector: string }
  | {
      readonly kind: "mismatch"
      readonly selector: string
      readonly attribute: string
      readonly expected: string
      readonly actual: string | null
    }

export function classifyExpectedAttr(input: {
  readonly selector: string | undefined
  readonly attribute: string | undefined
  readonly expected: string | undefined
  readonly mode: ExpectedAttrMode
  readonly elementFound: boolean
  readonly actualValue: string | null
}): ExpectedAttrStatus {
  if (
    input.selector === undefined ||
    input.attribute === undefined ||
    input.expected === undefined
  ) {
    return { kind: "not-checked" }
  }
  if (!input.elementFound) {
    return { kind: "element-absent", selector: input.selector }
  }
  const matched =
    input.actualValue !== null &&
    (input.mode === "contains-token"
      ? input.actualValue
          .split(/\s+/)
          .filter((token) => token.length > 0)
          .includes(input.expected)
      : input.actualValue === input.expected)
  return matched
    ? { kind: "match" }
    : {
        kind: "mismatch",
        selector: input.selector,
        attribute: input.attribute,
        expected: input.expected,
        actual: input.actualValue,
      }
}

export interface RenderObservation {
  readonly pageTypeSlug: string
  readonly signInRedirect: boolean
  readonly serverError: boolean
  readonly notFound: boolean
  readonly renderedNonBlank: boolean
  readonly rootElementPresent: boolean
  readonly contentSettleTimedOut: boolean
  readonly expectedText: ExpectedTextStatus
  readonly expectedTitleDom: ExpectedTitleDomStatus
  readonly expectedTitleInitialHtml: ExpectedTitleInitialHtmlStatus
  readonly expectedCount: ExpectedCountStatus
  readonly expectedAttr: ExpectedAttrStatus
}

export interface RenderVerdict {
  readonly verdict: "PASS" | "FAIL" | "INDETERMINATE"
  readonly reason: string
}

function fail(reason: string): RenderVerdict {
  return { verdict: "FAIL", reason }
}

function indeterminate(reason: string): RenderVerdict {
  return { verdict: "INDETERMINATE", reason }
}

export function discriminatingAssertions(observation: RenderObservation): readonly string[] {
  const checked: string[] = []
  if (observation.expectedText !== "not-checked") checked.push("--expect-text")
  if (observation.expectedCount.kind !== "not-checked") checked.push("--expect-count")
  if (observation.expectedAttr.kind !== "not-checked") checked.push("--expect-attr")
  return checked
}

export function decideDeployedRenderVerdict(observation: RenderObservation): RenderVerdict {
  const ownerNote = " (owner-owned — cannot claim prod-verified)"
  const timedOut = observation.contentSettleTimedOut

  if (observation.signInRedirect) {
    return fail(
      `redirected to /sign-in — the verify session is not authenticated for this origin, so the owner-owned read could not be performed${ownerNote}`
    )
  }
  if (observation.serverError) {
    return fail(`server error / error-boundary on the deployed render${ownerNote}`)
  }
  if (observation.notFound) {
    return fail(`page 404'd / not found${ownerNote}`)
  }
  if (!observation.renderedNonBlank) {
    return timedOut
      ? indeterminate(
          `page not yet non-blank when the settle budget elapsed — still hydrating or a genuine stall${ownerNote}`
        )
      : fail(`page rendered blank${ownerNote}`)
  }
  if (!observation.rootElementPresent) {
    return timedOut
      ? indeterminate(
          `expected root element not yet present when the settle budget elapsed${ownerNote}`
        )
      : fail(`expected root element absent from the render${ownerNote}`)
  }
  if (observation.expectedText === "absent") {
    return timedOut
      ? indeterminate(
          `expected text not yet present when the settle budget elapsed — still hydrating or a genuine stall${ownerNote}`
        )
      : fail(`expected text not found in the render${ownerNote}`)
  }
  if (observation.expectedCount.kind === "mismatch") {
    const { selector, expected, actual } = observation.expectedCount
    return fail(
      `expected ${expected} element(s) matching \`${selector}\`, found ${actual}${ownerNote}`
    )
  }
  if (observation.expectedAttr.kind === "element-absent") {
    return fail(
      `no element matched \`${observation.expectedAttr.selector}\` for the attribute/class assertion${ownerNote}`
    )
  }
  if (observation.expectedAttr.kind === "mismatch") {
    const { selector, attribute, expected, actual } = observation.expectedAttr
    return fail(
      `element \`${selector}\` ${attribute} expected to match \`${expected}\`, actual \`${actual ?? "(absent)"}\`${ownerNote}`
    )
  }
  if (observation.expectedTitleDom === "mismatch") {
    return fail(`document.title does not match the expected title${ownerNote}`)
  }
  if (observation.expectedTitleInitialHtml === "absent") {
    return fail(
      `expected title absent from the initial SSR HTML — the cold-load tab would show the raw URL until hydration${ownerNote}`
    )
  }

  const checked = discriminatingAssertions(observation)
  if (checked.length === 0) {
    return fail(
      "no discriminating assertion was checked, so a healthy render is indistinguishable from " +
        "an empty shell — supply --expect-text, --expect-count-selector + --expect-count, or " +
        `--expect-attr-selector + --expect-attr + --expect-attr-value${ownerNote}`
    )
  }

  return {
    verdict: "PASS",
    reason: `render observed over ${checked.length} discriminating assertion(s) [${checked.join(", ")}]: non-blank, root present, no sign-in wall / error / 404`,
  }
}
