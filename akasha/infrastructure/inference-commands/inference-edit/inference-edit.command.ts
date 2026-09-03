import type { Command } from "@akasha/command-system/command"

export const inferenceEdit = {
  id: "01a0685e-fd50-7c57-a7d6-7a1be279c52c",
  pageTypeSlug: "command",
  slug: "inference-edit",
  definition: "the command remaking one image under an instruction, keeping what it is of",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--image <path>", takes: "the image edited, which carries the identity kept" },
    { said: "--refs <csv>", takes: "further images the edit refers to, named as one comma list" },
    { said: "--prompt <text>", takes: "the instruction the edit follows" },
    {
      said: "--prompt-file <path>",
      takes: "that instruction read from a path, or `-` for standard input",
    },
    { said: "--output <path>", takes: "where the image is written" },
    { said: "--engine <name>", takes: "the engine the edit goes through" },
    { said: "--aspect-ratio <ratio>", takes: "the shape the output is fixed to" },
    { said: "--size <1K|2K|4K>", takes: "the size the output is fixed to" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the engine runs for" },
    { said: "--no-persist", takes: "leave the image where it was written and file no page for it" },
  ],
  helpNotes: [
    "one image is named, and it is the one whose identity is kept.",
    "`--image` repeats, and each after the first becomes a reference rather than the subject.",
    "identity carries across a chain of single-image edits, so chaining beats re-naming an anchor.",
    "a ratio nothing named leaves the output at the input's own shape, and a size nothing named at its own size.",
    "the engine reaches Google through the key `GEMINI_API_KEY` holds, and no key set refuses the call.",
    "a run row is filed whether the edit finished or failed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first image named is the subject and every later one is a reference.",
    },
    {
      invariantKind: "departure",
      statement: "A ratio nothing named leaves the output at the input's own shape.",
    },
    {
      invariantKind: "departure",
      statement: "A size nothing named leaves the output at the input's own size.",
    },
    {
      invariantKind: "departure",
      statement: "The output is transcoded to the format the path named asks for.",
    },
    {
      invariantKind: "departure",
      statement: "Every reference is hashed onto the run row alongside the subject.",
    },
    {
      invariantKind: "departure",
      statement: "No key set refuses the call rather than reaching the engine.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the edit finished or failed.",
    },
  ],
} as const satisfies Command
