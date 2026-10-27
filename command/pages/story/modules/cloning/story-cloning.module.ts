import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storyCloning = {
  id: "01a17f38-e4a8-7415-9f24-b2df1e657c10",
  type: "page-type/module",
  slug: "story-cloning",
  definition: "the files a clone of a played story is made of",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a played story under the test world is cloned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone copies every file under its source's folder but its turns and chapters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone copies no file play or the index writes beside a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source's slug becomes the clone's wherever it is a whole name or begins one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That renaming reaches paths and the values of pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code file is copied as one line forwarding its exports to the source's code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So no rule is spelled in two files, and a fix to the source reaches every clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test beside code is not copied, since the source's test proves that code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code importing a page of its own story is found, since forwarding it is wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copied page states no id and no instant, so its generators state fresh ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A copied page states no history, since the clone has no turn a history line names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone's game master is its source's game master persona, named for the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every seat a clone's turns start is named for the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone opens at the latest end its source's turns and chapters state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone names the story it was cloned from.",
    },
  ],
  createdAt: "2026-10-27T21:16:37.415Z",
  updatedAt: "2026-10-27T21:38:10.117Z",
} as const satisfies Module
