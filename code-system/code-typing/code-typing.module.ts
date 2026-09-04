import type { Module } from "../modules/module.page-type.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  pageTypeSlug: "module",
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
      statement: "The program reads every body through one reader handed to the program.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the akasha folder is read as the file stands.",
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
      statement:
        "Two properties carrying one key are told apart by where each property is declared.",
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
      statement:
        "A key more than one part of a union declares apart is resolved through none of them.",
    },
    {
      invariantKind: "departure",
      statement: "Where a key one file spells resolves is answered beside what a shorthand names.",
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
        "What a shorthand names is answered as the declarations the checker resolves the shorthand to.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a shorthand states the value it stood for.",
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
        "A name imported under another is found where it is imported rather than where it is used.",
    },
    {
      invariantKind: "departure",
      statement: "A name a file keeps to itself is found wherever in that file it is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a declaration's name starts is answered as a line counted from the first line.",
    },
    {
      invariantKind: "departure",
      statement: "What a name reaches from a place is answered from the scopes over that place.",
    },
    {
      invariantKind: "departure",
      statement: "A name shadowing an imported one inside a scope is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Renaming a binding a shorthand stood for states that binding rather than the key.",
    },
    {
      invariantKind: "departure",
      statement: "A package manifest is read through the reader the program was handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path reached through the packages folder is answered where that package's link leads.",
    },
    {
      invariantKind: "departure",
      statement: "A link is followed whether or not a file is there to follow it to.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the reader answers nothing for is read from the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what this module finds.",
    },
    {
      invariantKind: "departure",
      statement: "A body served to the program carries a version.",
    },
    {
      invariantKind: "departure",
      statement: "What the checker said of a body is kept between runs.",
    },
    {
      invariantKind: "departure",
      statement: "What was kept is read back where the version of a body is unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "What was kept is dropped for every file a changed body reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A program that keeps what the checker said is checked as the program is built.",
    },
    {
      invariantKind: "departure",
      statement: "A program built over some of the bodies keeps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A program built to be read for names alone keeps nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes inside the akasha folder.",
    },
  ],
} as const satisfies Module
