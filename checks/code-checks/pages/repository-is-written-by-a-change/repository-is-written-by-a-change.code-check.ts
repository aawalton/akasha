import type { CodeCheck } from "../../code-check.page-type.ts"

export const repositoryIsWrittenByAChange = {
  id: "01a08299-65c2-7c83-9d05-8a3e841dfe48",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "repository-is-written-by-a-change",
  definition: "the check refusing code outside the changes that writes into the repository",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The change machinery and the command page type are asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "Either is looked for under every page type below `domain`.",
    },
    {
      invariantKind: "departure",
      statement: "Code inside either is passed over, a change being what writes there.",
    },
    {
      invariantKind: "departure",
      statement: "A write is a call to a name taken from `node:fs` or `node:fs/promises`.",
    },
    {
      invariantKind: "departure",
      statement: "`Bun.write` is a write too.",
    },
    {
      invariantKind: "departure",
      statement:
        "The argument judged is the one a write lands on rather than the one a write reads.",
    },
    {
      invariantKind: "departure",
      statement: "A rename is judged on both its paths, since a rename empties the path it leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkout root is read off a `root` field or taken from the module answering it.",
    },
    {
      invariantKind: "departure",
      statement: "A name built from a rooted name is rooted, whether declared or assigned later.",
    },
    {
      invariantKind: "departure",
      statement: "What the repository ignores is read from `.gitignore` rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is read as the name left once its stars and its edging slashes are gone.",
    },
    {
      invariantKind: "departure",
      statement: "`.git` is ignored though no rule names it.",
    },
    {
      invariantKind: "departure",
      statement: "A name built from a name spelling an ignored name spells that name too.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page's code is judged, so the tree a test sets up is no reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination is refused where the destination is rooted and names nothing ignored.",
    },
    {
      invariantKind: "departure",
      statement: "Making a directory writes no body, so `mkdir` is no write.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the write sits on.",
    },
    {
      invariantKind: "gap",
      statement: "A destination whose name is worked out at run time is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A destination holding an ignored name by chance is let through.",
    },
    {
      invariantKind: "gap",
      statement: "A rule un-ignoring a path is passed over, so that path is let through.",
    },
    {
      invariantKind: "gap",
      statement: "A write through a wrapper of another module is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A root reached through a function of another module is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A descriptor opened for writing is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A root a caller hands in under a name other than `root` is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A write from a language other than TypeScript is not seen.",
    },
  ],
} as const satisfies CodeCheck
