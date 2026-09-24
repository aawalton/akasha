import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const errorsClient = {
  id: "01a05c89-6033-7676-ba14-f9bfd36ca899",
  type: "page-type/domain",
  slug: "errors-client",
  definition: "how errors in a browser are handled",
  parts: [
    "module/error-capture-installer",
    "module/error-reporting",
    "module/global-error-capture",
    "module/use-report-render-error",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here acts where there is no window.",
    },
  ],
} as const satisfies Domain
