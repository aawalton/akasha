import type { Check } from "../check.page-type.ts"

export const noIndexPathSpelled = {
  id: "01a05350-50b5-76df-9760-b09c77c2ee7c",
  pageTypeSlug: "check",
  slug: "no-index-path-spelled",
  definition:
    "the check refusing a file outside the indexes folder that spells a path into the index",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the index stands is asked of `index-reading` rather than spelt here.",
    },
    {
      invariantKind: "departure",
      statement: "A file under the indexes folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body holds is read rather than the specifiers alone.",
    },
    {
      invariantKind: "departure",
      statement: "Strings standing next to each other are read joined by a separator.",
    },
    {
      invariantKind: "absence",
      statement:
        "A path built from anything but plain strings is not seen. A template holding the place or a name standing for it reads as no path here.",
    },
    {
      invariantKind: "absence",
      statement:
        "What a caller does with a path it was given is not judged. Whether reaching the disk through `indexIn` is reaching too far is a question this does not ask.",
    },
  ],
} as const satisfies Check
