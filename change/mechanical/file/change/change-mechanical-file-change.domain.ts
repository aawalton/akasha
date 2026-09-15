import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileChange = {
  id: "01a09ca4-4e72-742d-bf6d-f7a41ccdf20d",
  type: "domain",
  slug: "change-mechanical-file-change",
  definition: "a mechanical change restating what a file is rather than where that file sits",
  parts: ["change-mechanical/change-page-page-type"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here is handed one page and answers for every file beside that page.",
    },
  ],
} as const satisfies Domain
