import type { ExpectedTextStatus } from "akasha/code/browser/test-harness/modules/deployed-render-check/deployed-render-check.module.code.ts"

type RenderSettleWait =
  | { readonly kind: "none" }
  | { readonly kind: "expect-text"; readonly text: string }
  | { readonly kind: "root-populated"; readonly rootSelector: string }
  | { readonly kind: "hydration-marker"; readonly selector: string }

export function planRenderSettleWait(input: {
  readonly expectText: string | undefined
  readonly httpStatus: number
  readonly finalPath: string
  readonly signInPath: string
  readonly rootSelector: string
  readonly hydrationSelector: string | undefined
}): RenderSettleWait {
  if (input.httpStatus >= 400 || input.finalPath.startsWith(input.signInPath)) {
    return { kind: "none" }
  }
  if (input.hydrationSelector !== undefined) {
    return { kind: "hydration-marker", selector: input.hydrationSelector }
  }
  if (input.expectText !== undefined) {
    return { kind: "expect-text", text: input.expectText }
  }
  return { kind: "root-populated", rootSelector: input.rootSelector }
}

export function planTitleSettleWait(input: {
  readonly expectTitle: string | undefined
  readonly httpStatus: number
  readonly finalPath: string
  readonly signInPath: string
}): string | undefined {
  if (input.httpStatus >= 400 || input.finalPath.startsWith(input.signInPath)) {
    return undefined
  }
  return input.expectTitle
}

type DiscriminatingSignalDecision =
  | { readonly kind: "present"; readonly checks: readonly string[] }
  | { readonly kind: "absent" }

export function decideDiscriminatingSignal(input: {
  readonly expectText: string | undefined
  readonly expectCountSelector: string | undefined
  readonly expectCount: number | undefined
  readonly expectAttrSelector: string | undefined
  readonly expectAttr: string | undefined
  readonly expectAttrValue: string | undefined
}): DiscriminatingSignalDecision {
  const checks: string[] = []
  if (input.expectText !== undefined) checks.push("--expect-text")
  if (input.expectCountSelector !== undefined && input.expectCount !== undefined) {
    checks.push("--expect-count")
  }
  if (
    input.expectAttrSelector !== undefined &&
    input.expectAttr !== undefined &&
    input.expectAttrValue !== undefined
  ) {
    checks.push("--expect-attr")
  }
  return checks.length > 0 ? { kind: "present", checks } : { kind: "absent" }
}

export function classifyExpectedText(
  expectText: string | undefined,
  bodyText: string
): ExpectedTextStatus {
  if (expectText === undefined) return "not-checked"
  return bodyText.includes(expectText) ? "present" : "absent"
}
