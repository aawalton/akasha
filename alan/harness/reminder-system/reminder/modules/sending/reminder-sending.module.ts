import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reminderSending = {
  id: "01a05f4b-4a6f-7000-b814-4d63f9e06e66",
  type: "module",
  slug: "reminder-sending",
  definition: "the reminders there are, when each next falls due, and taking a spent one away",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reminders are read from the index rather than by walking a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona a reminder is sent to and from reads back as the slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Systemd answers when a schedule next falls due.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A schedule naming no time still to come is answered as never.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "When a reminder next falls due is kept beside the page rather than in the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder taken away loses the values kept beside the page too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page taken away is named before the values beside it are taken, which can throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder is taken away by a program rather than by an agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The change taking a file away takes the reminder away rather than an edit composed here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends anything.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
