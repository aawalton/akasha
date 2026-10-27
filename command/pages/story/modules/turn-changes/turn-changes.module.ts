import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnChanges = {
  id: "01a10262-bbed-735d-a323-5c1e9b056260",
  type: "page-type/module",
  slug: "turn-changes",
  definition: "a turn or chapter's beats file read and written, and its changes checked and cached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's beats, scenes, changes and memory are read from its one beats file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file that does not read refuses the advance rather than reading as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move rewrites the beats file with only its own step's part replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter's pictures sit in its beats file, so its page stays small.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master's move keeps every step's part of the beats before its first moved one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's changes are checked against the pages, after the turn's changes so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages hold the values from before the turn until it moves to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player writes every change onto its page, in the one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn at beats writes each beat's changes onto their pages as the beat is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn at beats checks a beat's changes after the changes of beats not yet shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move at beats writes the beats file as that one beat's part leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change's lines for a file beside a page are appended to that file, and the page names its ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page a change makes sits under its story where that story's pages of its kind sit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the story has none of that kind, it sits where other stories keep that kind under theirs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move writes its prose, its beats and its issue lists as files beside the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Prose handed in for each beat is written onto the beats, and the prose file is rebuilt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key a move hands over as undefined is cleared, so a file beside the turn holding it goes too.",
    },
  ],
  createdAt: "2026-10-03T15:29:47.501Z",
  updatedAt: "2026-10-27T19:49:36.414Z",
} as const satisfies Module
