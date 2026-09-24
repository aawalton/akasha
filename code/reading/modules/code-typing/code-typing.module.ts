import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  type: "page-type/module",
  slug: "code-typing",
  definition: "a program built over the pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings the akasha folder compiles under are said here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of the akasha folder compiles against the full ESNext library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A program built over made-up files names the library those files compile against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file from outside the akasha folder is parsed without the link from each node to the one above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A global under a name the browser also declares collides rather than replacing that declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The full ESNext library carries the browser's library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a file compiles is judged by `typecheck` rather than by a program built here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The program reads every body through one reader handed to the program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file outside the akasha folder is read as the file is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the akasha folder compiles is named `.ts` or `.tsx`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The akasha folder compiles TypeScript written with JSX.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A package manifest is read through the reader the program was handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placement names the folder each package's manifest sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placement is worked out from the manifests among the paths handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path through the packages folder under a placed name is answered where that manifest sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path through the packages folder under an unplaced name is answered where its link leads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A real path is worked out from the placement before the link on disk is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link is followed whether or not a file is there to follow that link to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest the reader answers nothing for is read from the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the answers this module finds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body served to the program has a version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The compiler's own library is parsed once for the life of the process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the akasha folder compiles is parsed anew for each program.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes inside the akasha folder.",
    },
  ],
} as const satisfies Module
