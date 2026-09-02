import type { Command } from "@akasha/command-system/command"

export const musicListening = {
  id: "01a062f8-fe5a-7001-ae4a-4ede334b81af",
  pageTypeSlug: "command",
  slug: "music-listening",
  definition: "the command reading what Alan listens to on Spotify",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--window <short|medium|long>",
      takes: "the window the top lists are counted over, medium where none is said",
    },
    { said: "--limit <n>", takes: "the most rows given back for one list, ten where none is said" },
    { said: "--json", takes: "give one object holding every list rather than human text" },
  ],
  helpNotes: [
    "what is playing now, what was played lately, and the top artists and tracks are read together.",
    "the rows of what was played lately are capped at the fifty Spotify gives back for one page.",
    "a window Spotify does not carry is refused before any call is made.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The four reads are made together rather than one after another.",
    },
    {
      invariantKind: "departure",
      statement: "A short word for a window is read as the term Spotify names that window.",
    },
    {
      invariantKind: "departure",
      statement: "A limit of zero is read as ten rows.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Command
