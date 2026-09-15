import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editorStateLanding = {
  id: "01a09ca7-7d86-7447-bd3f-e5e996e940ef",
  type: "page-type/module",
  slug: "editor-state-landing",
  definition: "the editor's pictures of the pages written again once a landing has committed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code drawing those pictures is loaded when a landing asks rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That code is loaded by awaiting it, so a module the loader serves is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Loading that code is parted from calling it, so a caller holding a lock may call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load that would not answer is carried to the call rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pictures are drawn is the editor's own code to say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where that code sits is asked of the index rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout whose index names no such code has no picture written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that could not be written is answered rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pictures are written after the indexes are level with the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a picture is written to is one the repository ignores.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here carries a picture into the commit.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A landing that changed no page the pictures are drawn from writes them anyway.",
    },
  ],
} as const satisfies Module
