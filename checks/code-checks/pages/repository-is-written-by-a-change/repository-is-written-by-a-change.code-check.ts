import type { CodeCheck } from "../../code-check.page-type.ts"

export const repositoryIsWrittenByAChange = {
  id: "01a08299-65c2-7c83-9d05-8a3e841dfe48",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "repository-is-written-by-a-change",
  definition:
    "the check refusing code outside the changes that writes TypeScript into the repository",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The change machinery and the command system are asked of the index rather than spelled.",
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
      statement: "A name built from a name spelling `.ts` spells `.ts` too.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page's code is judged, so the tree a test sets up is no reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination is refused where the destination is rooted and named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "departure",
      statement: "A directory made under the root is no source file, so making one is let through.",
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
      statement: "A write of anything but TypeScript is not seen.",
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
