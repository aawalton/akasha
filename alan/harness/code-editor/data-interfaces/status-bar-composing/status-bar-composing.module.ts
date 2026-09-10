import type { Module } from "@akasha/code/module"

export const statusBarComposing = {
  id: "01a0789c-53c4-7eae-9e56-7aa7e07e6e06",
  pageTypeSlug: "module",
  type: "module",
  slug: "status-bar-composing",
  definition: "the one line the editor's status bar is drawn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The line has the fleet's spend and one section for each of the three readout groups.",
    },
    {
      invariantKind: "departure",
      statement: "A group's stoplights are the readout pages naming that group.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's reading is read off the file beside that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs a reading is read against are read off the scale the readout names.",
    },
    {
      invariantKind: "departure",
      statement: "A readout its own page stills is left out.",
    },
    {
      invariantKind: "departure",
      statement: "One reading of the readout pages answers all three groups.",
    },
    {
      invariantKind: "departure",
      statement:
        "A group answering no stoplight is answered as nothing rather than as an empty row.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folders a watch of this line follows are the folders the readout and account pages sit in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages service.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a child process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs on a beat.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which glyph a tier draws.",
    },
  ],
} as const satisfies Module
