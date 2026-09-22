import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileAnswering = {
  id: "01a0784a-085f-7c1d-aec3-7e04a398f007",
  type: "page-type/module",
  slug: "file-answering",
  definition: "the bytes a page keeps under a file property",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is named by the page with that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is named by the key its page holds that file under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No caller names a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type has no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a property that keeps no file is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property held secret is refused rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property held outside the commit is answered off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page states in its own file a value for a property held outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ending such a file is named by is read from the page's uncommitted values first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page keeping no ending there is named by the first ending the property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the page states binds over the ending the property names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug sitting at more than one path is refused rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are answered as the bytes on disk rather than decoded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path the bytes came from is answered beside the bytes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The bytes on disk are read rather than the bytes the commit has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here listens.",
    },
  ],
} as const satisfies Module
