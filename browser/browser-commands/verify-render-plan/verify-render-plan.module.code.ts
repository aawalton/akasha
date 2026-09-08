import type { ExpectedTextStatus } from "@akasha/browser-test-harness/deployed-render-check"

export type VerifyRenderSessionKind = "anon" | "throwaway" | "real-user"

export interface VerifyRenderSessionPlan {
  readonly kind: VerifyRenderSessionKind
  readonly signIn: boolean
  readonly requiresRealUserEnv: boolean
  readonly requiresThrowawayEnv: boolean
}

export function planVerifyRenderSession(input: {
  readonly noSignIn: boolean
  readonly asThrowaway: boolean
}): VerifyRenderSessionPlan {
  if (input.noSignIn) {
    return { kind: "anon", signIn: false, requiresRealUserEnv: false, requiresThrowawayEnv: false }
  }
  if (input.asThrowaway) {
    return {
      kind: "throwaway",
      signIn: true,
      requiresRealUserEnv: false,
      requiresThrowawayEnv: true,
    }
  }
  return { kind: "real-user", signIn: true, requiresRealUserEnv: true, requiresThrowawayEnv: false }
}

export type RenderSettleWait =
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

export type DiscriminatingSignalDecision =
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

export function isRetryableSessionOpenTimeout(err: unknown): boolean {
  return err instanceof Error && err.name === "TimeoutError"
}
