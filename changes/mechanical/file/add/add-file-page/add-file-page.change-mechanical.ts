import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const addFilePage = {
  id: "01a07976-d290-7a2a-b91c-bc7a0bc36dca",
  pageTypeSlug: "change-mechanical",
  slug: "add-file-page",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page written at one path, with the pages that page names judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-reaches-a-page", "change-guard/identity-not-already-held"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The pages the body names are judged by the guard this change names.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanical
