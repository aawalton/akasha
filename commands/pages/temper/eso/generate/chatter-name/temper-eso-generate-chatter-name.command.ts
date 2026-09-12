import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoGenerateChatterName = {
  id: "01a0685d-f8fa-7c84-afa7-42c2af785557",
  type: "command",
  slug: "temper-eso-generate-chatter-name",
  definition:
    "the command writing the chatter and interaction name registry the quests addon reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The registry is drawn from the emitted declarations rather than from the clone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declarations read are the ones `akasha temper eso generate declaration` writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no checkout reads and writes what `CODE_ROOT` names, else this repository.",
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
      statement: "The registry lands as a mechanical change rather than written by this command.",
    },
    {
      invariantKind: "departure",
      statement: "A registry the checkout already has lands nothing and says so.",
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
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "chatter-name",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
