import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const addFile = {
  id: "01a07810-4657-7cb0-8eff-29902c541102",
  pageTypeSlug: "change-mechanical-file",
  type: "change-mechanical-file",
  slug: "add-file",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path, with nothing else judged",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path with no body is written as an addition.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path with another body is written over as a replace with the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "A path already with the body given is refused rather than written again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a body may be written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFile
