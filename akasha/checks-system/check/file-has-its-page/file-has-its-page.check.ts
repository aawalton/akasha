import type { Check } from "../check.page-type.ts"

export const fileHasItsPage = {
  id: "01a04d86-434f-75ff-aaab-96b4ba9468ee",
  pageTypeSlug: "check",
  slug: "file-has-its-page",
  definition: "the check refusing a file in the akasha folder that no page claims",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
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
      statement: "Whether a page already claims a path is one index read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the change itself carries claims its paths too, so a page and its files arrive together.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page body is read only for a path nothing in the index claims, so a change with nothing unclaimed loads no page.",
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
      invariantKind: "departure",
      statement: "A path outside the akasha folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index is read as the last landed change left it, and a claim still standing there is taken as a claim.",
    },
  ],
} as const satisfies Check
