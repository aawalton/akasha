import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storeWriting = {
  id: "01a05aec-eaaa-7be1-9528-6c84a071ce1c",
  type: "page-type/module",
  slug: "store-writing",
  definition: "a body carried to the store at a path, and the commit it lands as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names a path and the whole body standing at that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write of pages names each page's type and slug and the values that page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store renders a page written that way, so no caller composes the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that committed answers with the commit the write landed as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that committed nothing is answered as not written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer is a name and an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer shaped otherwise is refused before the store is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read answers with a whole body and the commit the body was read at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here renders a page's body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here addresses a row inside a page.",
    },
  ],
} as const satisfies Module
