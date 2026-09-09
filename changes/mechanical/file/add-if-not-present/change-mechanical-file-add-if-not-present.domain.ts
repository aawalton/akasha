import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileAddIfNotPresent = {
  id: "01a08187-e826-7d84-a62f-ac5fdb10c36d",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-add-if-not-present",
  definition: "a mechanical change adding a file that is not there already",
  parts: ["change-mechanical-file/add-if-not-present-file"],
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "No rung here reads a path as a page, a body already at the path settling the answer.",
    },
  ],
} as const satisfies Domain
