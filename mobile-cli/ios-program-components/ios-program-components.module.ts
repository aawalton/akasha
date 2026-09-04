import type { Module } from "@akasha/code-system/module"

export const iosProgramComponents = {
  id: "01a05cee-e560-7f62-99a4-8df3cd92480b",
  pageTypeSlug: "module",
  slug: "ios-program-components",
  definition: "the Swift components and build target an akasha ios-program page names",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reads the Swift to learn what a program compiles.",
    },
    {
      invariantKind: "departure",
      statement: "What a program compiles is stated on its akasha ios-program page.",
    },
    {
      invariantKind: "constraint",
      statement: "A Swift target names no imports between its own files.",
    },
    {
      invariantKind: "departure",
      statement:
        "A component list belongs to a program rather than to the app that builds the program.",
    },
    {
      invariantKind: "departure",
      statement: "Each component is alone in a directory named for its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The name Xcode builds a program under is read off its ios-program page.",
    },
  ],
} as const satisfies Module
