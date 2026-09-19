import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const programNaming = {
  id: "01a0b844-5d3f-7743-a5aa-503fa54f9c45",
  type: "page-type/module",
  slug: "program-naming",
  definition: "the files a program is built over and the files that program answers for",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The program is built over the files judged and the declarations alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every declaration file akasha has is compiled with every change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration file states globals no import reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration file the change reaches is judged as any other file is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change taking away a file no import reaches and rooting nothing has the declarations judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Judging those costs no compiling, the program holding them already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration file the change moves is found where that change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file another config claims is left out of both answers.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a diagnostic.",
    },
  ],
} as const satisfies Module
