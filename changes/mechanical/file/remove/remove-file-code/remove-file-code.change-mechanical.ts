import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFileCode = {
  id: "01a07987-afc1-73bf-8a8e-9ba1cc6c5248",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-code",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code file taken away, with the imports naming that file judged",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file is taken away by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The imports naming the file are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a file is taken away from.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
