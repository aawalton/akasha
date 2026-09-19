import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexAnswering = {
  id: "01a05eca-0849-789d-8118-1e8d7ae05244",
  type: "page-type/module",
  slug: "index-answering",
  definition: "the index's answers bound to one reading, each asked without naming an index",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every question here is asked of the reading the answers were bound over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question here takes no index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question here takes no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question here takes no reader of page bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader whose reading could be left off is bound to the reading here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader whose reader of page bodies could be left off is bound to the reader of page bodies here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root is bound here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller filing a change binds no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing more is bound here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A question here takes the arguments the reader beneath takes besides the arguments bound here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The questions bound here are the ones asked of the index through a shadow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer here is the answer the reader beneath gives with that reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller whose pages come from files rather than from the index asks the tolerant reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tolerant reading answers nothing for a page type that reading cannot read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading beside the tolerant reading refuses over that same page type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question here taking no arguments is answered once and held.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A page is answered by its path from the reader of page bodies bound here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A face is built for one change and lives no longer than that change.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A reader guarding itself against the index reads that index and the commit at HEAD from the root.",
    },
  ],
} as const satisfies Module
