import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const errorsCore = {
  id: "01a05c48-deeb-7013-b082-9b135a70f3cc",
  type: "page-type/domain",
  slug: "errors-core",
  definition: "how an error is read",

  parts: [
    "module/error-fingerprint",
    "module/error-report",
    "module/exit-code",
    "module/stack-normalizing",
    "module/throwable-normalizing",
    "page-type/runtime-error",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a network or a disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides whether an error is worth reporting.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Domain
