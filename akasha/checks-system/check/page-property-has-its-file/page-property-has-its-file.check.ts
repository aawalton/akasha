import type { Check } from "../check.page-type.ts"

export const pagePropertyHasItsFile = {
  id: "01a04d86-434f-7119-b8cc-858d63edf631",
  pageTypeSlug: "check",
  slug: "page-property-has-its-file",
  definition: "the check refusing a page that states a property held in a file it does not have",
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
        "Which properties are held in a file is read from the page properties whose page type is `file-property` rather than from a list written here.",
    },
    {
      invariantKind: "departure",
      statement: "Presence is the whole test.",
    },
    {
      invariantKind: "absence",
      statement: "The index files the path a page states whether or not a file stands there.",
    },
    {
      invariantKind: "departure",
      statement: "A file is present when the change answers with a body for its path.",
    },
    {
      invariantKind: "departure",
      statement: "It is absent when the change answers with nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "What stands at a path the change does not name is answered by the base commit.",
    },
    {
      invariantKind: "departure",
      statement: "A page named for a page type the change itself carries is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file property the change introduces is asked for its file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the index says carries a changed path is judged even when the change never names that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages the index says carry a changed path is read from the index as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal is laid on the page that states the property rather than on the missing file.",
    },
    {
      invariantKind: "gap",
      statement: "A file a page has stopped claiming is refused.",
    },
  ],
} as const satisfies Check
