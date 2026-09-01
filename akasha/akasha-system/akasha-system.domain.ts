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
    "workspace-package/file-system",
    "workspace-package/utils-fs",
    "workspace-package/utils-process",
    "workspace-package/utils-system",
    "workspace-package/pages-system",
    "workspace-package/domain-system",
    "workspace-package/graph-system",
    "domain/akasha-type",
    "domain/akasha-check",
    "workspace-package/checks-system",
    "workspace-package/code-system",
    "workspace-package/command-system",
    "workspace-package/hook-system",
    "domain/editor-extension",
    "workspace-package/testing-system",
    "workspace-package/seat-system",
    "workspace-package/persona-system",
    "domain/role-system",
    "workspace-package/context-system",
    "workspace-package/agents-system",
    "domain/akasha-required-reading",
    "domain/akasha-migration",
    "workspace-package/person-system",
    "workspace-package/service-system",
    "domain/alan-harness",
    "domain/design",
    "workspace-package/id-minting",
    "workspace-package/file-page-identity",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The akasha system is the `akasha` subfolder in the `akasha` repo.",
    },
    {
      invariantKind: "departure",
      statement:
        "The akasha folder holds some two thousand two hundred of this repository's near eighty-five thousand files.",
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
