import type { Check } from "../check.page-type.ts"

export const fileHasItsPage = {
  id: "01a04d86-434f-75ff-aaab-96b4ba9468ee",
  pageTypeSlug: "check",
  slug: "file-has-its-page",
  definition: "the check refusing a file in the akasha folder that no page claims",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file no page claims is enumerated by nothing and audited by nothing, so it escapes every check in the system.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims its own path and the paths its file properties name.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a page claims a path is one index read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index is read as this change leaves it, so a page the change carries claims its paths and a claim the change withdraws is none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file property the change introduces names its file, because what names a file is read as the change leaves it too.",
    },
    {
      invariantKind: "departure",
      statement:
        "What claims a path is asked of the index rather than worked out here, so this answers as the settled index will.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only the paths the change names are judged. A file already standing unclaimed is named by no change and by no enumeration, and this does not go looking for it.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is passed over.",
    },
    {
      invariantKind: "gap",
      statement: "The audit sees a file that no page claims.",
    },
  ],
} as const satisfies Check
