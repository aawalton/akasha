import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyClone = {
  id: "01a17f38-e4a8-704c-b8f5-64a5048e96f6",
  type: "page-type/command",
  slug: "story-clone",
  definition: "the command cloning a played story under a new slug into a testing world",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story of any world is cloned, since the clone's world is a testing world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug a played story holds, or whose clone world's folder is there, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source whose game master is no game master seat name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source whose code imports a page of that story is refused, naming the files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a clone copies is read from what the source has committed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A clone carries its source's turns and chapters, with the prose and beats beside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source with a turn not yet at the player is refused, naming each such turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a copied page among its parts names the copy there as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone lands in one landing, and the answer names its game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That landing is the command's own, so no read its caller made can hold it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each copied page is handed a fresh id, since nothing mints one under a copied type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copied file beside a page, such as a lore page's secrets, is handed no id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone whose renaming leaves text past its limit is refused, and nothing lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names each page and property, rather than the text being shortened.",
    },
  ],
  name: "clone",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/clone-as", required: true },
  ],
  createdAt: "2026-10-27T21:16:37.415Z",
  updatedAt: "2026-10-30T15:28:47.324Z",
} as const satisfies Command
