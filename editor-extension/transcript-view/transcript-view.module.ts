import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptView = {
  id: "01a06811-01d3-7003-a56a-b2779b494581",
  pageTypeSlug: "module",
  slug: "transcript-view",
  definition: "the webview a seat's transcript is drawn into, and what each read draws again",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Entries before the first tool call awaiting a result are settled.",
    },
    {
      invariantKind: "departure",
      statement: "A settled entry is drawn once and appended.",
    },
    {
      invariantKind: "departure",
      statement: "The entries after the settled ones are drawn again on every read.",
    },
    {
      invariantKind: "departure",
      statement: "Both slices are drawn against one read.",
    },
    {
      invariantKind: "departure",
      statement: "A read that folded nothing anywhere leaves the panel as that panel is.",
    },
    {
      invariantKind: "departure",
      statement: "A file folded from its first byte starts the panel over.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript that rotated starts the panel over.",
    },
    {
      invariantKind: "departure",
      statement: "One read is in flight at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A write arriving mid-read is read for once that read finishes.",
    },
    {
      invariantKind: "departure",
      statement: "The panel reads when a file it is fed by is written and at no other time.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holding a transcript is watched rather than the transcript.",
    },
    {
      invariantKind: "departure",
      statement: "One watcher on that folder catches an append and a rotation alike.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a transcript's subagents sit in is watched as well.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is not there yet is watched once the next read finds it.",
    },
    {
      invariantKind: "departure",
      statement: "Closing a panel closes every watcher that panel registered.",
    },
    {
      invariantKind: "departure",
      statement: "A disclosure the reader opened stays open when the tail is drawn again.",
    },
    {
      invariantKind: "departure",
      statement: "A disclosure is matched again by the id of the call that disclosure draws.",
    },
    {
      invariantKind: "departure",
      statement: "The view follows the end only while the reader is already at the end.",
    },
    {
      invariantKind: "departure",
      statement: "Being at the end is judged with a tolerance rather than exactly.",
    },
    {
      invariantKind: "departure",
      statement: "The webview runs only the script the shell carries a nonce for.",
    },
    {
      invariantKind: "departure",
      statement: "One channel says what every transcript panel's read cost.",
    },
    {
      invariantKind: "absence",
      statement: "No transcript content passes through that channel.",
    },
    {
      invariantKind: "absence",
      statement: "No timer starts a read.",
    },
  ],
} as const satisfies Module
