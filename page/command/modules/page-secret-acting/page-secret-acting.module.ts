import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageSecretActing = {
  id: "01a06812-3ce8-7ffb-9691-94df69748ba6",
  type: "module",
  slug: "page-secret-acting",
  definition: "what every act over a page's secrets settles before it acts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is named by a path read against the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which keys a page may hold is read off the page type that page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is spelled as the page type's own key rather than as its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type does not declare secret is refused before anything is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller's mistake and the data and an operational fault answer with codes of their own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a command line, which the argument reader reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file left holding nothing is taken away rather than written empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file is written and taken away through a change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a sops file goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault the landing threw is answered where that landing runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a refusal names the commit where the landing committed one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other fault here is thrown before anything is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the sops file itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no message commits under one naming the sops file.",
    },
  ],
} as const satisfies Module
