import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const repositoryIsWrittenByAChange = {
  id: "01a08299-65c2-7c83-9d05-8a3e841dfe48",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "repository-is-written-by-a-change",
  definition: "the check refusing code outside the changes that writes into the repository",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The change machinery and the command page type are asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The change machinery is looked for as a page type rather than under every page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command page type is looked for as a page type rather than under every page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page of another type carrying that slug is not taken for that page type.",
    },
    {
      invariantKind: "departure",
      statement: "Code inside either page type is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A change writes there.",
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
        "The argument judged is the argument a write lands on rather than the argument a write reads.",
    },
    {
      invariantKind: "departure",
      statement: "A rename is judged on both its paths.",
    },
    {
      invariantKind: "departure",
      statement: "A rename empties the path that rename leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkout root is read off a `root` field or taken from the module answering that root.",
    },
    {
      invariantKind: "departure",
      statement: "A name built from a rooted name is rooted whether declared or assigned later.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whatever the repository ignores is read from `.gitignore` rather than named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "That `.gitignore` is read as the change leaves it rather than as the disk holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking `.gitignore` away leaves nothing but `.git` ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is read as the name left once its stars and its edging slashes are gone.",
    },
    {
      invariantKind: "departure",
      statement: "`.git` is ignored though no rule names `.git`.",
    },
    {
      invariantKind: "departure",
      statement: "A name built from a name spelling an ignored name spells that name too.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page's code is judged.",
    },
    {
      invariantKind: "departure",
      statement: "The tree a test sets up is no reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination is refused where the destination is rooted and names nothing ignored.",
    },
    {
      invariantKind: "departure",
      statement: "Making a directory writes no body.",
    },
    {
      invariantKind: "departure",
      statement: "`mkdir` is no write.",
    },
    {
      invariantKind: "departure",
      statement: "A name `node:os` answers is away from the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A name built from such a name is away from the checkout too.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value a function answers with is read as whatever every name in that function is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination holding a name that is away is let through though that destination is rooted.",
    },
    {
      invariantKind: "departure",
      statement: "A root read as data rather than as a prefix writes nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the write sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A destination is judged only where the destination spells a name to judge.",
    },
    {
      invariantKind: "departure",
      statement: "An ignored folder is named where a whole part of the path is that folder.",
    },
    {
      invariantKind: "departure",
      statement: "An ignored ending is named where a part of the path ends there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name that is away is away everywhere in its file whatever that name holds there.",
    },
    {
      invariantKind: "gap",
      statement: "A rule in a `.gitignore` below the root is read.",
    },
    {
      invariantKind: "gap",
      statement: "A write through a wrapper of another module is seen.",
    },
    {
      invariantKind: "absence",
      statement: "A root a caller hands in under a name other than `root` is no checkout root.",
    },
    {
      invariantKind: "absence",
      statement: "A name a destructuring pattern binds is no rooted name and no spelled name.",
    },
    {
      invariantKind: "absence",
      statement: "A parameter's name is no rooted name and no spelled name.",
    },
    {
      invariantKind: "absence",
      statement: "A name a `for` declaration binds is no rooted name and no spelled name.",
    },
    {
      invariantKind: "absence",
      statement: "A write from a language other than TypeScript is not judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "An un-ignoring rule drops the whole ignored name it reaches rather than only the path it names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A descriptor is a write where its flag spells one, and a flag that is no spelled name is no write.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
