import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const renameFilePages = {
  id: "01a08335-76fe-7381-bcda-07d2b9c0f3d3",
  type: "page-type/change-mechanical",
  slug: "rename-file-pages",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page",
  changeTargetSubtype: "change-target-subtype/page",
  definition: "many pages renamed over one reading of the bodies naming them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every address handed in is restated over one reading of the bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The module restating addresses is called rather than reached through a rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That restating comes before any page is renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each page's own rename is left to the change renaming one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is told the addresses are restated already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is told the old spellings are named already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every old spelling still written is named over one search of the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That naming comes after every page is renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page handed in under the slug that page carries has no address restated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug and page type are read from that page's body rather than its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page stating its page type as an address is read by the slug that address holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address a page carries is worked out by the module renaming one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that cannot be read refuses the whole answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing in no page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first refusal answers for the whole call.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
