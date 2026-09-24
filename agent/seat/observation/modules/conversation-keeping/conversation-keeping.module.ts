import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conversationKeeping = {
  id: "01a0d432-be0b-7446-ad3d-cccc0bb9ae68",
  type: "page-type/module",
  slug: "conversation-keeping",
  definition: "every seat's conversation kept beside the seat as the seat's transcript grows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's transcript is read at the path kept beside the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A first read starts at the transcript's last compaction, found reading back from its end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript is read forward from the byte it was last read to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read ends at the last line end rather than part way through a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript no longer than when it was last read is not read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript shorter than when it was last read is read from its first byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose transcript moved is read from its new transcript's first byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was read is held in memory rather than read again from the file written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is written whole only where its entries changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write lands by a rename, so a reader never meets half a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript folder changing is what moves this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder of seats is followed so a seat's first transcript folder is found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that fails to be kept leaves every other seat kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This module writes into no transcript folder.",
    },
  ],
} as const satisfies Module
