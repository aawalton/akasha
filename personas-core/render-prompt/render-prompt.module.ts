import type { Module } from "../../code-system/modules/module.page-type.ts"

export const renderPrompt = {
  id: "01a05b70-a58d-7a82-b208-fbcd6f5976f9",
  pageTypeSlug: "module",
  slug: "render-prompt",
  definition: "the prompt text a persona's image is re-rendered from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The whole frame is recomposed afresh rather than the original edited.",
    },
    {
      invariantKind: "absence",
      statement: "No man is ever put in the frame.",
    },
    {
      invariantKind: "departure",
      statement: "A scene left unwritten is stood in for by a placeholder.",
    },
  ],
} as const satisfies Module
