import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  type: "module",
  slug: "code-typing",
  definition: "a program built over the pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The settings the akasha folder compiles under are said here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file of the akasha folder compiles against the full ESNext library.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A program built over made-up files names the library those files compile against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file from outside the akasha folder is parsed without the link from each node to the one above it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A global under a name the browser also declares collides rather than replacing that declaration.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Code built for a runtime with no browser is judged without the browser.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The program reads every body through one reader handed to the program.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file outside the akasha folder is read as the file is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the akasha folder compiles is named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The akasha folder compiles TypeScript written with JSX.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A package manifest is read through the reader the program was handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A placement names the folder each package's manifest sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A placement is worked out from the manifests among the paths handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path through the packages folder under a placed name is answered where that manifest sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path through the packages folder under an unplaced name is answered where its link leads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A real path is worked out from the placement before the link on disk is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link is followed whether or not a file is there to follow that link to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest the reader answers nothing for is read from the disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the answers this module finds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body served to the program has a version.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The compiler's own library is parsed once for the life of the process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body the akasha folder compiles is parsed anew for each program.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes inside the akasha folder.",
    },
  ],
} as const satisfies Module
