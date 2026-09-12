import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const fileHasItsPage = {
  id: "01a04d86-434f-75ff-aaab-96b4ba9468ee",
  type: "code-check",
  slug: "file-has-its-page",
  definition: "the check refusing a file in the akasha folder that no page claims",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file no page claims is left out of every enumeration read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A move repoints no import to such a file and reports no import left behind.",
    },
    {
      invariantKind: "constraint",
      statement: "A phase judging every file in the tree reaches such a file like a claimed file.",
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
      statement: "The index is read as this change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "A file property the change introduces names its file.",
    },
    {
      invariantKind: "departure",
      statement: "A file named as a page's uncommitted tail or sops tail names that page.",
    },
    {
      invariantKind: "departure",
      statement: "Such a file is let through by the page its name spells being filed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page that claims any other path is asked of the index rather than worked out here.",
    },
    {
      invariantKind: "absence",
      statement: "Only the paths the change names are judged.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file inside a folder a page claims is claimed by that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file beside a page closing with an extension that page's type names is claimed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file closing that way in a folder beneath that page is claimed by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An uncommitted tail names the page beside it though a section runs before it.",
    },
    {
      invariantKind: "constraint",
      statement: "An audit hands this check ignored files whose names spell an uncommitted tail.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here exempts a path for where it sits or for what it is named.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
