import type { CodeCheck } from "../../code-check.page-type.ts"

export const spelledPathStays = {
  id: "01a07cbe-a7cc-762b-a40a-50caecb6c51c",
  pageTypeSlug: "code-check",
  slug: "spelled-path-stays",
  definition: "the check refusing a change that takes away a path a string literal spells",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is there where a file sits at that path or under that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away is read off the paths the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers which paths are there rather than which paths go.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder above a path taken away goes too where no file is left under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking no path away is judged no further.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal spells a path where the longest run of path characters in the literal is a path.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming the repository's own folder spells the path beneath that name too.",
    },
    {
      invariantKind: "departure",
      statement: "A run of one part spells a path only where a slash closes that run.",
    },
    {
      invariantKind: "departure",
      statement: "A template is judged by its head alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the change leaves is read.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change carries no edit for is read too.",
    },
    {
      invariantKind: "gap",
      statement: "A run of one part closed by a slash is refused wherever that run is written.",
    },
    {
      invariantKind: "gap",
      statement: "A path no file was ever at is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A path a sentence closes with a full stop is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A path spelled after a substitution is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A path spelled outside TypeScript is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A path a run of code puts together from parts is not seen.",
    },
  ],
} as const satisfies CodeCheck
