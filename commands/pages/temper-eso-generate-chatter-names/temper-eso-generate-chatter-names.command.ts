import type { Command } from "@akasha/command-system/command"

export const temperEsoGenerateChatterNames = {
  id: "01a0685d-f8fa-7c84-afa7-42c2af785557",
  pageTypeSlug: "command",
  slug: "temper-eso-generate-chatter-names",
  definition:
    "the command writing the chatter and interaction name registry the quests addon reads",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the enum declarations are read from and the registry written into",
    },
  ],
  helpNotes: [
    "the checkout defaults to what `CODE_ROOT` names, and to this repository where that names nothing.",
    "the source is the enum declaration file `temper-eso-generate-typings` writes, so the registry covers what those declarations opted into; widening the registry means regenerating the declarations.",
    "reading the declarations rather than the clone is what lets this answer on a workstation carrying no clone.",
    "a registry naming no constant of either kind refuses the call, because an empty registry reads to the trace as a clean answer.",
    "the trace resolves a code to a name by reading each global on its own rather than by walking the globals table, which would taint the game's call stack.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The registry is drawn from the emitted declarations rather than from the clone.",
    },
    {
      invariantKind: "departure",
      statement: "A registry naming no constant of either kind refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The written file names the command that wrote the file.",
    },
    {
      invariantKind: "departure",
      statement: "Both the file read and the file written are taken from the checkout named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the clone.",
    },
    {
      invariantKind: "gap",
      statement: "The rendering of the registry is in akasha.",
    },
  ],
} as const satisfies Command
