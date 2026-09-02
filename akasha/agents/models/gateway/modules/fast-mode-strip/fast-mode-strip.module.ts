import type { Module } from "@akasha/code-system/module"

export const fastModeStrip = {
  id: "01a0628d-3afc-782f-b008-da98b0a830e4",
  pageTypeSlug: "module",
  slug: "fast-mode-strip",
  definition: "a request stripped of what asks for fast mode",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body asks for fast mode by a speed field reading fast.",
    },
    {
      invariantKind: "departure",
      statement: "A beta header asks for fast mode by a token starting fast-mode-.",
    },
    {
      invariantKind: "departure",
      statement: "A request asking in the body or in the beta header is a fast-mode request.",
    },
    {
      invariantKind: "departure",
      statement: "Stripping the body drops the speed field.",
    },
    {
      invariantKind: "departure",
      statement: "Stripping the body keeps the fields beside speed.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying no speed field strips to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no JSON object strips to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Stripping a beta header drops the tokens starting fast-mode-.",
    },
    {
      invariantKind: "departure",
      statement: "Stripping a beta header keeps the tokens not starting fast-mode-.",
    },
    {
      invariantKind: "departure",
      statement: "A beta header left with no token is deleted rather than sent empty.",
    },
    {
      invariantKind: "departure",
      statement: "A strip that changes neither the body nor the beta header returns nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A strip leaves the headers handed in unchanged.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reads the beta header under the name anthropic-beta.",
    },
    {
      invariantKind: "gap",
      statement: "A request asking fast mode by header alone loses a speed field reading slow.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses which model serves a fast-mode request.",
    },
  ],
} as const satisfies Module
