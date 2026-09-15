import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseSplicing = {
  id: "01a09c37-a726-75c9-9295-675c73b2ee02",
  type: "module",
  slug: "prose-splicing",
  definition: "the edits restating the prose passages one page's body states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage under a key of its own is the text that key states.",
    },
    {
      invariantKind: "departure",
      statement: "A passage under a record is the text a named field of that record states.",
    },
    {
      invariantKind: "departure",
      statement: "The record worked is the one whose field states the words handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states no text under is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key with no record is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Text no record states under that field is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Text more than one record states under that field is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says how many records state it.",
    },
    {
      invariantKind: "departure",
      statement: "A passage already stating what was asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One passage refused refuses every passage in that body.",
    },
    {
      invariantKind: "departure",
      statement: "The text is written back quoted.",
    },
    {
      invariantKind: "departure",
      statement: "The object read is the object the first exported declaration has.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed once however many passages that body states.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every passage restated in one body answers one edit over the lines those passages sit between.",
    },
    {
      invariantKind: "departure",
      statement: "A body with no passage to restate answers no edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which passages are restated.",
    },
  ],
} as const satisfies Module
