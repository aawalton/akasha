import type { Module } from "@akasha/code-system/module"

export const supervisorAgentSettings = {
  id: "01a069bf-b8ea-7512-b82f-c386bd4270c4",
  pageTypeSlug: "module",
  slug: "supervisor-agent-settings",
  definition: "the settings document a seat spawns on, with the hooks akasha declares merged in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The document is read from this checkout rather than from a copy on disk.",
    },
    {
      invariantKind: "departure",
      statement: "The hooks akasha declares are merged over the hooks the document carries.",
    },
    {
      invariantKind: "departure",
      statement: "A document that is absent or is no JSON object is refused rather than emptied.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the document or spawns a seat.",
    },
  ],
} as const satisfies Module
