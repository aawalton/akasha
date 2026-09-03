import type { Module } from "@akasha/code-system/module"

export const watcherWorker = {
  id: "01a0674e-d7f8-75c9-a6ee-f3a19f736aca",
  pageTypeSlug: "module",
  slug: "watcher-worker",
  definition: "the collaborators a watcher worker runs on, chosen and handed to the start",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module is the only place the watcher worker's collaborators are chosen.",
    },
    {
      invariantKind: "departure",
      statement: "The start is handed a collaborator rather than reaching for one.",
    },
    {
      invariantKind: "departure",
      statement: "The process shell the start refuses to hold is held here.",
    },
    {
      invariantKind: "departure",
      statement: "An exit the start answers is carried out here.",
    },
    {
      invariantKind: "departure",
      statement: "A signal handler is installed here rather than in the start.",
    },
    {
      invariantKind: "departure",
      statement: "The queue running uploads in turn runs each upload after the one before it ends.",
    },
    {
      invariantKind: "departure",
      statement: "An upload that throws leaves the queue ready for the next upload.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout a source update advances is the akasha checkout this runs from.",
    },
    {
      invariantKind: "departure",
      statement: "The session is opened once and every later reader takes that same session.",
    },
    {
      invariantKind: "departure",
      statement: "A reader taken before the session is open is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The account a run outcome is reported under is read off the open session.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what the watcher does with a file it read.",
    },
  ],
} as const satisfies Module
