import { assertNever } from "@akasha/utils-narrow/assert-never"

export type JennyIntent = "manage-content" | "feature-request" | "no-match"

export type JennyDispatch =
  | { readonly kind: "manage-atlas-content"; readonly writeAsResolvedUser: true }
  | {
      readonly kind: "read-context"
      readonly contextDoc: "feature-request-capture"
      readonly writeAsResolvedUser: false
      readonly evaluator: "atlas"
    }
  | { readonly kind: "escalate"; readonly to: "atlas" }

export function decideJennyDispatch(intent: JennyIntent): JennyDispatch {
  switch (intent) {
    case "manage-content":
      return { kind: "manage-atlas-content", writeAsResolvedUser: true }
    case "feature-request":
      return {
        kind: "read-context",
        contextDoc: "feature-request-capture",
        writeAsResolvedUser: false,
        evaluator: "atlas",
      }
    case "no-match":
      return { kind: "escalate", to: "atlas" }
    default:
      return assertNever(intent)
  }
}
