import type { Module } from "@akasha/code/module"

export const sourceGlobbing = {
  id: "01a08293-ce34-754b-8be5-2829fd5fb36e",
  pageTypeSlug: "module",
  type: "module",
  slug: "source-globbing",
  definition:
    "the trees a Tailwind entry stylesheet reads utilities from, worked out from its packages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The source globs an entry stylesheet has are written by a machine rather than by an author.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stylesheet is one whose rules import Tailwind.",
    },
    {
      invariantKind: "departure",
      statement:
        "A glob names a package the stylesheet's own package reaches through the manifests.",
    },
    {
      invariantKind: "departure",
      statement: "A package the globs name is one whose tree has a file a browser draws from.",
    },
    {
      invariantKind: "departure",
      statement: "A package under another the globs already name is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A glob is spelled against the folder the stylesheet sits in.",
    },
    {
      invariantKind: "departure",
      statement: "An inline source list is the author's and is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The globs go where the first of them was, or after the last import where there was none.",
    },
    {
      invariantKind: "departure",
      statement:
        "The globs are worked out again only where the change could turn what the globs have.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet already with the body that would be written again is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "What is written again is answered as a change rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet the change does not carry is written again by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
