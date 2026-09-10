import type { Module } from "../modules/module.page-type.types.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  pageTypeSlug: "module",
  type: "module",
  slug: "code-typing",
  definition: "a program built over the pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings the akasha folder compiles under are said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every file compiles against the full ESNext library.",
    },
    {
      invariantKind: "departure",
      statement:
        "A global under a name the browser also declares collides rather than replacing that declaration.",
    },
    {
      invariantKind: "gap",
      statement: "Code built for a runtime with no browser is judged without the browser.",
    },
    {
      invariantKind: "departure",
      statement: "The program reads every body through one reader handed to the program.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the akasha folder is read as the file is.",
    },
    {
      invariantKind: "departure",
      statement: "A file the akasha folder compiles is named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "departure",
      statement: "The akasha folder compiles TypeScript written with JSX.",
    },
    {
      invariantKind: "departure",
      statement: "A package manifest is read through the reader the program was handed.",
    },
    {
      invariantKind: "departure",
      statement: "A placement names the folder each package's manifest sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A placement is worked out from the manifests among the paths handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path through the packages folder under a placed name is answered where that manifest sits.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path through the packages folder under an unplaced name is answered where its link leads.",
    },
    {
      invariantKind: "departure",
      statement: "A real path is worked out from the placement before the link on disk is read.",
    },
    {
      invariantKind: "departure",
      statement: "A link is followed whether or not a file is there to follow that link to.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the reader answers nothing for is read from the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the answers this module finds.",
    },
    {
      invariantKind: "departure",
      statement: "A body served to the program has a version.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes inside the akasha folder.",
    },
  ],
} as const satisfies Module
