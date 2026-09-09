import type { Module } from "@akasha/code/module"

export const saidPathing = {
  id: "01a07bc3-901c-773f-b288-daaf87e33d78",
  pageTypeSlug: "module",
  type: "module",
  slug: "said-pathing",
  definition: "a path a command was handed, read against the repository root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root rather than against the folder a call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "An absolute path is resolved without the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path is resolved against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A path is answered relative to the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is answered as no path.",
    },
    {
      invariantKind: "departure",
      statement: "The repository root is no path inside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a path outside the repository is worded here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path bound for a write is weighed as joining that path onto the root leaves that path.",
    },
    {
      invariantKind: "departure",
      statement: "An absolute path a write joins onto the root is inside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A name opening with two dots is a name rather than a step out of the root.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a path written outside the repository is worded here.",
    },
    {
      invariantKind: "departure",
      statement: "The `.git` folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path under the `.git` folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder at the top of the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a `/` names no folder at the top of the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A path the disk has no folder at is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file's body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the repository.",
    },
  ],
} as const satisfies Module
