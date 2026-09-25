import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCompletionImport = {
  id: "01a060d7-c8cc-7e3d-bff7-b5db10d7b35f",
  type: "page-type/domain",
  slug: "temper-completion-import",
  definition: "the addon's saved variables read back as what a player has completed",
  parts: ["module/completion-input-schema", "module/completion-saved-variables-parser"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the addon wrote badly falls away rather than failing the whole file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record read here is parsed with the completion record's schema.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record the schema refuses refuses the whole file rather than reaching a stored completion.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is written here.",
    },
  ],
} as const satisfies Domain
