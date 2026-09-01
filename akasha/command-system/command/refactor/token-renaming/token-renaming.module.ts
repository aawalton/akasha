import type { Module } from "@akasha/code-system/module"

export const tokenRenaming = {
  id: "01a0598c-9096-7000-8946-4e4927fad360",
  pageTypeSlug: "module",
  slug: "token-renaming",
  definition: "the name a body carries changed wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is named by the file carrying it rather than by the name on its own.",
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
      statement: "A name the file already carries is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a file the rename would respell already carries is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The places a name is spelled are read from the checker rather than matched as text.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing for something else in its own scope is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A name a file keeps to itself is renamed though nothing exports it.",
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
      statement: "A line names the declaration whose name starts on it.",
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
      statement: "A spelling this cannot read as a line is refused rather than counted as none.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says the line the caller named where one was named.",
    },
    {
      invariantKind: "departure",
      statement: "A key a type declares is renamed wherever the checker resolves to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file carrying one spelling as a name and as a key is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every line still spelling the name that was renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A name spelled inside a string is respelled only where the caller asks for it.",
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
        "The paths a name is resolved over and the paths a spelling left behind is looked for in are handed in apart.",
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
      statement: "Nothing here lands what it works out.",
    },
  ],
} as const satisfies Module
