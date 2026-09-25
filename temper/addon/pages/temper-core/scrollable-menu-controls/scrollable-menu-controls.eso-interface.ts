import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const scrollableMenuControls = {
  id: "01a06275-c447-7a91-b3a6-e3e6daef8679",
  type: "page-type/eso-interface",
  slug: "scrollable-menu-controls",
  definition: "the row, header and dropdown controls building every menu of this library",
  markup: "xml",
  loadedAs: "XML/TemperScrollableMenu.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One virtual control is declared for each entry type a menu row may take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row handler calls back into the library through the TemperScrollableMenu global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dividers and header rules are 1px lines in the fourth surface's gray, not game art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The submenu arrow, the filter's reset, the header's collapse and the sort buttons are lucide icons.",
    },
  ],
} as const satisfies EsoInterface
