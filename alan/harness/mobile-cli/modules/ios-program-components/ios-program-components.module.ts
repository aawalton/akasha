import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const iosProgramComponents = {
  id: "01a05cee-e560-7f62-99a4-8df3cd92480b",
  type: "page-type/module",
  slug: "ios-program-components",
  definition: "the components and the Xcode name that code reads from an iOS program page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the Swift to learn the components a program compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The components a program compiles are stated on its akasha ios-program page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A Swift target names no imports between its own files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A component list belongs to a program rather than to the app that builds the program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each component is alone in a directory named for its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name Xcode builds a program under is read off its ios-program page.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:26:06.434Z",
} as const satisfies Module
