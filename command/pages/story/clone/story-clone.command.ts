import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyClone = {
  id: "01a17f38-e4a8-704c-b8f5-64a5048e96f6",
  type: "page-type/command",
  slug: "story-clone",
  definition: "the command cloning a played story of the test world under a new slug",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story outside the test world is refused, and nothing lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug a played story or a folder of the test world holds already is refused.",
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
  ],
  name: "clone",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/clone-as", required: true },
  ],
  createdAt: "2026-10-27T21:16:37.415Z",
  updatedAt: "2026-10-27T23:24:33.107Z",
} as const satisfies Command
