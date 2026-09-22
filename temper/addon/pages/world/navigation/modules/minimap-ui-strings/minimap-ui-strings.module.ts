import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const minimapUiStrings = {
  id: "01a06269-2975-7fb4-b000-c446f30904cb",
  type: "page-type/module",
  slug: "minimap-ui-strings",
  definition: "the strings the minimap settings show, by language",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A key here starting SI_BINDING_NAME_ names a keybind the game persists against a key Alan chose.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A keybind name is renamed only where the action it names in Bindings.xml is renamed with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other key here is a settings string, and is named SI_TEMPER_MINIMAP_.",
    },
  ],
} as const satisfies Module
