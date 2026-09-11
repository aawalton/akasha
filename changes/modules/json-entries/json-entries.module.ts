import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const jsonEntries = {
  id: "01a08239-7cf2-7f52-8f52-49c5a92d21c1",
  type: "module",
  slug: "json-entries",
  definition: "an entry a JSON body holds under one of its keys",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The object answered is the object the named key of the body's top-level object has.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose top level is no object answers no object.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding anything but an object answers no object.",
    },
    {
      invariantKind: "departure",
      statement: "A key the body states nothing under answers no object.",
    },
    {
      invariantKind: "departure",
      statement: "The text answered is the text the named key has where that key has a string.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding anything but a string answers no text.",
    },
    {
      invariantKind: "departure",
      statement: "The body's own top-level object is answered apart from any key the body has.",
    },
    {
      invariantKind: "departure",
      statement: "A key of the top-level object is dropped the way an entry under a key is.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry goes with the space before that entry back to where the preceding entry ended.",
    },
    {
      invariantKind: "departure",
      statement: "An entry followed by a comma goes with that comma.",
    },
    {
      invariantKind: "departure",
      statement: "An entry followed by no comma goes back to take the comma before that entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry dropped straight after its neighbour reaches back for no comma.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry the caller names under that key is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An entry the caller does not name is left where that entry is.",
    },
    {
      invariantKind: "departure",
      statement: "No comma is taken twice where neighbours go together.",
    },
    {
      invariantKind: "departure",
      statement: "A run going out of the end takes the comma before that run.",
    },
    {
      invariantKind: "departure",
      statement: "A body a run went out of reads as JSON.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
  ],
} as const satisfies Module
