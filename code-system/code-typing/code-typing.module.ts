import type { Module } from "../modules/module.page-type.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  pageTypeSlug: "module",
  type: "module",
  slug: "code-typing",
  definition: "a program built over the pages, and what the checker says a spelling means",
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
      statement: "A spelling is matched by the declaration the checker resolves the spelling to.",
    },
    {
      invariantKind: "departure",
      statement: "Two properties with one key are told apart by where each property is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key stated in an object literal is resolved through the type that literal satisfies.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key taken apart in a binding is resolved through the type the key is taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A key one part of a union alone declares is resolved through that part.",
    },
    {
      invariantKind: "departure",
      statement: "A key more than one part of a union declares apart is resolved through no part.",
    },
    {
      invariantKind: "departure",
      statement: "Where a key one file spells resolves is answered beside a shorthand's names.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand names the key and the value.",
    },
    {
      invariantKind: "departure",
      statement: "A file is read for every place the file spells one key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shorthand's names are answered as the declarations the checker resolves that shorthand to.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a shorthand states the value that shorthand represented.",
    },
    {
      invariantKind: "departure",
      statement: "A key reached by a string keeps its quotes when respelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is found where its own file exports the name rather than where a body spells the name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name imported under another name is found where that name is imported rather than where used.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a file keeps to itself is found wherever in that file that name is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a declaration's name starts is answered as a line counted from the first line.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declarations a name reaches from a place are answered from the scopes over that place.",
    },
    {
      invariantKind: "departure",
      statement: "A name shadowing an imported name inside a scope is left as that name is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Renaming a binding a shorthand represented states that binding rather than the key.",
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
