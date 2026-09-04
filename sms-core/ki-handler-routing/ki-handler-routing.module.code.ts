import { assertNever } from "@akasha/utils-narrow/assert-never"

export type KiIntent = "books" | "anime" | "feature-request" | "no-match"

export type KiDispatch =
  | {
      readonly kind: "read-context"
      readonly contextDoc: "book-logging"
      readonly writeAsResolvedUser: true
    }
  | {
      readonly kind: "read-context"
      readonly contextDoc: "anime-logging"
      readonly writeAsResolvedUser: true
    }
  | {
      readonly kind: "read-context"
      readonly contextDoc: "feature-request-capture"
      readonly writeAsResolvedUser: false
      readonly evaluator: "astra"
    }
  | { readonly kind: "escalate"; readonly to: "aine" }

export function decideKiDispatch(intent: KiIntent): KiDispatch {
  switch (intent) {
    case "books":
      return {
        kind: "read-context",
        contextDoc: "book-logging",
        writeAsResolvedUser: true,
      }
    case "anime":
      return {
        kind: "read-context",
        contextDoc: "anime-logging",
        writeAsResolvedUser: true,
      }
    case "feature-request":
      return {
        kind: "read-context",
        contextDoc: "feature-request-capture",
        writeAsResolvedUser: false,
        evaluator: "astra",
      }
    case "no-match":
      return { kind: "escalate", to: "aine" }
    default:
      return assertNever(intent)
  }
}
