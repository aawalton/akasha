import type { Check } from "../check.page-type.ts"

export const folderMatchesAShape = {
  id: "01a04e33-f281-7900-a29d-0b79e444ca98",
  pageTypeSlug: "check",
  slug: "folder-matches-a-shape",
  definition: "the check refusing a folder matching none of the folder shapes",
  partSlugs: [
    "page-type/folder-shape",
  ],
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A folder matching any shape is right, so a folder is refused only where every shape refused it, and the refusal carries what each one said rather than ranking them.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shapes are found in the index, so a shape is added by adding a folder and nothing here changes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every folder above a changed path is judged, because a shape reads what stands under a folder as well as what sits in it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change adds or takes away is judged at the folder holding what it reaches, up to the folder holding the importer too, because an import inside a folder is no entrance to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change takes away is read from the body the change found, never from the index, which files that edge until the change lands.",
    },
    {
      invariantKind: "absence",
      statement:
        "A folder already matching no shape that the change does not touch is named by nothing here, and this does not go looking for it. Audit judges every folder.",
    },
    {
      invariantKind: "gap",
      statement:
        "This runs at no phase. Folders stand today that match no shape, and a check refusing them would refuse every change until they are gone.",
    },
  ],
} as const satisfies Check
