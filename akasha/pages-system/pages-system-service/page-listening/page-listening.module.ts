import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageListening = {
  id: "01a05a43-5af9-7b66-ac4c-33e3f06d1c87",
  pageTypeSlug: "module",
  slug: "page-listening",
  definition: "the port a page query arrives on, and what is bound to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The port is read from the page describing the service.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no port leaves nothing to listen on.",
    },
    {
      invariantKind: "departure",
      statement: "What is bound answers every question the same way a handed request is answered.",
    },
    {
      invariantKind: "departure",
      statement: "Running this file starts the service.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file starts nothing.",
    },
  ],
} as const satisfies Module
