import type { Domain } from "akasha/domains/domain.page-type.types.ts"

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
      statement: "No rung here reads a path as a page.",
    },
  ],
} as const satisfies Domain
