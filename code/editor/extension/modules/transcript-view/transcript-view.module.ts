import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transcriptView = {
  id: "01a06811-01d3-7003-a56a-b2779b494581",
  type: "module",
  slug: "transcript-view",
  definition: "the webview a seat's transcript is drawn into, and what each read draws again",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Entries before the first tool call awaiting a result are settled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A settled entry is drawn once and appended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The entries after the settled ones are drawn again on every read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both slices are drawn against one read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read that folded nothing anywhere leaves the panel as that panel is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file folded from its first byte starts the panel over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript that rotated starts the panel over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One read is in flight at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write arriving mid-read is read for once that read finishes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel reads when a file the panel is fed by is written and at no other time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder with a transcript is watched rather than the transcript.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One watcher on that folder catches an append and a rotation alike.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a transcript's subagents sit in is watched as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The transcript's place is asked for once and then only where that place can have moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name moving beside the transcript says the transcript may have moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change naming no file at all is taken as a move that may have happened.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A change under the subagents folder says nothing about where the transcript is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that is not there yet is watched once the next read finds that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A watcher whose folder went is closed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next read watches a folder that went again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Closing a panel closes every watcher that panel registered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A disclosure the reader opened stays open when the tail is drawn again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A disclosure is matched again by the id of the call that disclosure draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The view follows the end only while the reader is already at the end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Being at the end is judged with a tolerance rather than exactly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The webview runs only the script the shell has a nonce for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One channel reports every transcript panel's read cost.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No transcript content passes through that channel.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No timer starts a read.",
    },
  ],
} as const satisfies Module
