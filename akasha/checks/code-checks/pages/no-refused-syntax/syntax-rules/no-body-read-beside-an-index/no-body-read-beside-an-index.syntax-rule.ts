import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noBodyReadBesideAnIndex = {
  id: "01a06428-de96-7f88-b896-bf883f93871c",
  pageTypeSlug: "syntax-rule",
  slug: "no-body-read-beside-an-index",
  definition:
    "the rule refusing a page body read off a repository root by code already handed the index",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`Answering` names the index.",
    },
    {
      invariantKind: "departure",
      statement: "The `Reading` the indexes declare names the index.",
    },
    {
      invariantKind: "departure",
      statement: "`Shadow` names the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is the index only where the name is bound from the module declaring that name.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter typed as text is a root where its name carries `root`.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter typed as text is a root where its name carries `repo`.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter typed as text is a root where its name carries `repository`.",
    },
    {
      invariantKind: "departure",
      statement: "A page body is read by `valueAt`.",
    },
    {
      invariantKind: "departure",
      statement: "A page body is read by what wraps `valueAt`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function taking a root beside the index and reading a page body from that root is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read one call down through a function of the same file taking a root is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A function taking a root and no index is admitted.",
    },
    {
      invariantKind: "departure",
      statement: "A function taking the index and no root is admitted.",
    },
    {
      invariantKind: "departure",
      statement: "A function taking a root beside the index and reading no page body is admitted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body-reading function called by an index-carrying function with no root of its own is admitted.",
    },
    {
      invariantKind: "departure",
      statement: "A file git is told to keep out of the commit is no page body.",
    },
    {
      invariantKind: "departure",
      statement: "No change carries such a file.",
    },
    {
      invariantKind: "departure",
      statement: "No base version of such a file is there to go stale against.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the line the read is on.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names what to do instead.",
    },
    {
      invariantKind: "absence",
      statement: "No file is exempt.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is exempt.",
    },
    {
      invariantKind: "absence",
      statement: "No function is exempt.",
    },
    {
      invariantKind: "absence",
      statement: "The path of the file judged is not read.",
    },
    {
      invariantKind: "absence",
      statement: "Only the file handed in is read.",
    },
    {
      invariantKind: "gap",
      statement:
        "A reader of the values a page keeps in a file beside that page is not judged here.",
    },
    {
      invariantKind: "gap",
      statement: "A page body read by `readFileSync` off a root is not judged here.",
    },
    {
      invariantKind: "gap",
      statement: "A reader reached through a second file is not followed.",
    },
    {
      invariantKind: "gap",
      statement: "A root reaching a function under a name carrying no root word is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A function reading twice is refused at its first read alone.",
    },
  ],
} as const satisfies SyntaxRule
