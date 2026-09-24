import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateChatterName = {
  id: "01a0685d-f8fa-7c84-afa7-42c2af785557",
  type: "page-type/command",
  slug: "temper-eso-generate-chatter-name",
  definition:
    "the command writing the chatter and interaction name registry the quests addon reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The registry is drawn from the emitted declarations rather than from the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The declarations read are the ones `akasha temper eso generate declaration` writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which declarations those are is read from each page's stamp rather than a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every declaration carrying that stamp is read, in the order their slugs sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout carrying no page with that stamp refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration a stamped page names and the checkout has not refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no checkout reads and writes what `CODE_ROOT` names, else this repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A registry naming no constant of either kind refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The registry is written where a page already claims that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page beside the written file names the command that wrote the file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The registry carries no prose of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The registry lands as a mechanical change rather than written by this command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A registry the checkout already has lands nothing and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both the file read and the file written are taken from the checkout named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rendering of the registry is in akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "chatter-name",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
