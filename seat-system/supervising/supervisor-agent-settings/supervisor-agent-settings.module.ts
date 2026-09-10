import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorAgentSettings = {
  id: "01a069bf-b8ea-7512-b82f-c386bd4270c4",
  pageTypeSlug: "module",
  slug: "supervisor-agent-settings",
  definition: "the settings document a seat spawns on, with the hooks akasha declares merged in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A caller wanting the settings imports and calls this module rather than running the module.",
    },
    {
      invariantKind: "departure",
      statement: "The document is read from this checkout rather than from a copy on disk.",
    },
    {
      invariantKind: "departure",
      statement: "The hooks akasha declares are merged over the hooks the document has.",
    },
    {
      invariantKind: "departure",
      statement: "The shared script paths are resolved through the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved script path is absolute rather than relative to a checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shell script the index answers no page for is refused rather than emitted as an empty path.",
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
