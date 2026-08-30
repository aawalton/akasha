import type { Check } from "../check.page-type.ts"

export const folderMatchesAShape = {
  id: "01a04e33-f281-7900-a29d-0b79e444ca98",
  pageTypeSlug: "check",
  slug: "folder-matches-a-shape",
  definition: "the check refusing a folder matching none of the folder shapes",
  partSlugs: ["page-type/folder-shape"],
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder matching any shape is right.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal carries what each shape said rather than ranking them.",
    },
    {
      invariantKind: "departure",
      statement: "The shapes are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Every folder above a changed path is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A shape reads what stands under a folder as well as what sits in it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change adds or takes away is judged at the folder holding what it reaches up to the folder holding the importer too.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a folder is no entrance to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change takes away is read from the body the change found rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "What is a page type and what names a file are read as the change leaves them.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files stand in a folder is read as the index stands joined to what the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The shapes themselves are loaded from what stands on disk.",
    },
    {
      invariantKind: "absence",
      statement:
        "A folder already matching no shape that the change does not touch is named by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Audit judges every folder.",
    },
  ],
} as const satisfies Check
