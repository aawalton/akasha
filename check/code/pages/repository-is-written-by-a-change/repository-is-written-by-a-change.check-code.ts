import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const repositoryIsWrittenByAChange = {
  id: "01a08299-65c2-7c83-9d05-8a3e841dfe48",
  type: "check-code",
  slug: "repository-is-written-by-a-change",
  definition: "the check refusing code outside the changes that writes into the repository",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The change machinery and the command page type are asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The change machinery is looked for as a page type rather than under every page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The command page type is looked for as a page type rather than under every page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page of another type carrying that slug is not taken for that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Code inside either page type is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change writes there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write is a call to a name taken from `node:fs` or `node:fs/promises`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`Bun.write` is a write too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file whose text names neither `fs` nor `Bun.write` is passed over before it is parsed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The argument judged is the argument a write lands on rather than the argument a write reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename is judged on both its paths.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename empties the path that rename leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checkout root is read off a `root` field or taken from the module answering that root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name built from a rooted name is rooted whether declared or assigned later.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whatever the repository ignores is read from `.gitignore` rather than named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That `.gitignore` is read as the change leaves it rather than as the disk holds it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change taking `.gitignore` away leaves nothing but `.git` ignored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is read as the name left once its stars and its edging slashes are gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`.git` is ignored though no rule names `.git`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name built from a name spelling an ignored name spells that name too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a page's code is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree a test sets up is no reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A destination is refused where the destination is rooted and names nothing ignored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Making a directory writes no body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`mkdir` is no write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name `node:os` answers is away from the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name built from such a name is away from the checkout too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The value a function answers with is read as whatever every name in that function is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A destination holding a name that is away is let through though that destination is rooted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root read as data rather than as a prefix writes nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the line the write sits on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A destination is judged only where the destination spells a name to judge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ignored folder is named where a whole part of the path is that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ignored ending is named where a part of the path ends there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name that is away is away everywhere in its file whatever that name holds there.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A `.gitignore` below the root is read by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A write another module makes for this one is seen by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A root a caller hands in under a name other than `root` is no checkout root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name a destructuring pattern binds is no rooted name and no spelled name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A parameter's name is no rooted name and no spelled name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name a `for` declaration binds is no rooted name and no spelled name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A write from a language other than TypeScript is not judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An un-ignoring rule drops the whole ignored name it reaches rather than only the path it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A descriptor is a write where its flag spells one, and a flag that is no spelled name is no write.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
