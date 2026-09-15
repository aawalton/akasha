import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterChannel = {
  id: "01a0a114-877c-70bd-a3d0-f5d9ac5fe26e",
  type: "module",
  slug: "chapter-channel",
  definition: "a story's chapters drawn in a run, marked where the newest is and where reading is",
  code: "tsx",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The newest chapter is the last of every chapter rather than the last drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter outside the span drawn is counted rather than drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How far reading has come counts every chapter rather than the chapters drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter with no page to reach is drawn without a link to follow.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here scrolls the page until the person asks for the unread chapter.",
    },
  ],
} as const satisfies Module
