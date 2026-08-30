import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaSystem = {
  id: "01a049e9-651c-7000-b6c1-0d4d87c8b4c5",
  pageTypeSlug: "domain",
  slug: "akasha-system",
  definition: "code, data and text in a page with a type in a file",
  partSlugs: [
    "domain/akasha-code",
    "domain/akasha-data",
    "domain/akasha-text",
    "domain/akasha-file",
    "domain/file-system",
    "domain/pages-system",
    "domain/domain-system",
    "domain/graph-system",
    "domain/akasha-type",
    "domain/akasha-check",
    "domain/checks-system",
    "domain/code-system",
    "domain/command-system",
    "domain/hook-system",
    "domain/editor-extension",
    "domain/testing-system",
    "domain/seat-system",
    "domain/persona-system",
    "domain/role-system",
    "domain/context-system",
    "domain/agents-system",
    "domain/akasha-required-reading",
    "domain/akasha-migration",
    "domain/person-system",
    "domain/alan-harness",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The akasha system is the `akasha` subfolder in the `akasha` repo.",
    },
    {
      invariantKind: "departure",
      statement:
        "The akasha folder holds some four hundred of this repository's near ninety thousand files.",
    },
    {
      invariantKind: "departure",
      statement: "The rest have yet to move in.",
    },
    {
      invariantKind: "departure",
      statement: "Code and data are text.",
    },
    {
      invariantKind: "departure",
      statement: "Code and text are data.",
    },
    {
      invariantKind: "departure",
      statement: "Data and text are code.",
    },
    {
      invariantKind: "departure",
      statement: "The repository is a database.",
    },
    {
      invariantKind: "departure",
      statement: "This tree is its master replica.",
    },
    {
      invariantKind: "departure",
      statement: "What is missing was lost rather than not yet made.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Champions Not Owners",
      act: "Change what needs changing, wherever it stands, when you hold what it takes to do it right.",
      warrant:
        "Work waits at every border a domain draws, and nobody is served by a fix that stops at one.",
      aids: [
        "Holding what it takes means having read it, not having heard of it.",
        "Where you cannot do it right, hand it on rather than halve it.",
      ],
    },
  ],
} as const satisfies Domain
