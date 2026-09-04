import type { CodeCheck } from "../../code-check.page-type.ts"

export const pagePropertyHasItsFile = {
  id: "01a04d86-434f-7119-b8cc-858d63edf631",
  pageTypeSlug: "code-check",
  slug: "page-property-has-its-file",
  definition: "the check refusing a page that states a property held in a file it does not have",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which properties are held in a file is read from the page properties rather than from a list here.",
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
      statement: "A file is absent when the change answers with nothing.",
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
        "Which pages the index says carry a changed path is read from the index as the index stands.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change takes away is passed over.",
    },
    {
      invariantKind: "gap",
      statement: "A file a page has stopped claiming is refused.",
    },
  ],
} as const satisfies CodeCheck
