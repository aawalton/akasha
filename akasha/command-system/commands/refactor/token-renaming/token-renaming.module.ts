import type { Module } from "@akasha/code-system/module"

export const tokenRenaming = {
  id: "01a0598c-9096-7000-8946-4e4927fad360",
  pageTypeSlug: "module",
  slug: "token-renaming",
  definition: "the name a body carries changed wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is named by the file carrying that name rather than by the name alone.",
    },
    {
      invariantKind: "departure",
      statement: "One name is carried by many files.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name the named file does not carry is refused rather than answered as nothing to do.",
    },
    {
      invariantKind: "departure",
      statement: "A name the renamed declaration reaches is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching the renamed declaration is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement: "A name bound only where the renamed declaration cannot reach refuses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What a name reaches from a declaration is asked of the checker's scopes.",
    },
    {
      invariantKind: "departure",
      statement: "A key rename is refused wherever the file carries the name the key would become.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name carried anywhere in a file the rename would respell is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The places a name is spelled are read from the checker rather than matched as text.",
    },
    {
      invariantKind: "departure",
      statement: "A name representing something else in that name's own scope is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A name a file keeps to itself is renamed though nothing exports that name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a file carries in more than one place and no line names is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A line names which of the declarations carrying one name is renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A line names the declaration whose name starts on that line.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line no declaration of the name starts on is refused rather than renaming nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a name carried in more than one place names each line to say.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration the line does not name is not renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling resolving to a declaration the line does not name is not respelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A spelling this module cannot read as a line is refused rather than counted as no line.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says the line the caller named where a line was named.",
    },
    {
      invariantKind: "departure",
      statement: "A key a type declares is renamed wherever the checker resolves to that key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file carrying one spelling as a name and as a key is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A key one shorthand names the renamed name in is welded to that name.",
    },
    {
      invariantKind: "departure",
      statement: "What a shorthand names is asked of the checker rather than read off the syntax.",
    },
    {
      invariantKind: "departure",
      statement: "Welding is judged over the whole file rather than around the declaration.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key written out where the checker resolves that key to the renamed key welds as a shorthand does.",
    },
    {
      invariantKind: "departure",
      statement: "A key spelled where the checker resolves that key to nothing welds nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key spelled where the checker resolves that key to another declaration welds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand naming anything but the renamed name welds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A key no shorthand ever fills welds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A welded key and name are renamed as one act rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand a welded rename carries is left as the one name.",
    },
    {
      invariantKind: "departure",
      statement: "A welded rename needs no line.",
    },
    {
      invariantKind: "departure",
      statement: "A welded rename takes the line either declaration starts on.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every line still spelling the name that was renamed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name spelled inside a string is respelled only where the caller asks for that name.",
    },
    {
      invariantKind: "departure",
      statement: "A string is respelled over the body the checker already changed.",
    },
    {
      invariantKind: "departure",
      statement: "What still names the name is looked for after the strings were respelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths a name is resolved over arrive apart from the paths a leftover spelling is looked for in.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands in the paths and the bodies.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No file is carried and no path changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands what this module works out.",
    },
  ],
} as const satisfies Module
