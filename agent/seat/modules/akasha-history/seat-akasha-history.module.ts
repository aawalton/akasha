import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAkashaHistory = {
  id: "01a06949-b281-7b6f-900b-fa221e76dbd9",
  type: "page-type/module",
  slug: "seat-akasha-history",
  definition: "a seat's page read from git",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is read from the commit its root is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No history is walked, since a seat page taken away holds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's moment is when its page says its committed values last changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values come back under the key names the old page had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that will not load leaves that seat out of the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of a root's history is held only while that history has not moved.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A seat page removed from akasha is in no index.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A commit is read by the path a seat page had rather than by the seat page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A commit is read over the folder the seats sit in now and every folder they sat in before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat is named in history by the file its page is rather than by that file's folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat page taken away holds nothing in history.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat page moved is taken away at the path it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where more than one path could answer a seat's name, the newest path answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root's history has moved where the commit that root is on has changed.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-30T14:54:42.446Z",
} as const satisfies Module
