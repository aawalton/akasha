import type { Command } from "akasha/command/command.page-type.types.ts"

export const initiativeDelete = {
  id: "01a08c55-e316-7936-bc74-abba6173f7b7",
  type: "page-type/command",
  slug: "initiative-delete",
  definition: "the command taking an initiative's page away with the files beside that page",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative is named by the slug the initiative declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no initiative is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming other than one word is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the page away is left to the mechanical change taking away a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The intents the initiative held go with the initiative's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages naming the initiative are read before the page goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page still naming the initiative is named in what a run says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says under which property each of those pages names the initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming an initiative a seat is assigned is not refused for that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat assigned the initiative is assigned the domain its persona champions instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each seat is assigned again in the landing that takes the initiative's page away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose persona champions no domain is left naming the initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names each seat it assigned again and what that seat answers to now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says the index files those names until a refresh runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says the commit that run landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refused is a fault of the data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No run refreshes the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks Alan to confirm.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No check runs over what a run lands.",
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
  name: "delete",
  arguments: [{ argument: "argument/initiative", required: true, saidAs: "word" }],
} as const satisfies Command
