import type { Module } from "@akasha/code-system/module"

export const reminderSending = {
  id: "01a05f4b-4a6f-7000-b814-4d63f9e06e66",
  pageTypeSlug: "module",
  slug: "reminder-sending",
  definition: "the reminders there are, when each next falls due, and taking a spent one away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reminders are read from the index rather than by walking a folder.",
    },
    {
      invariantKind: "departure",
      statement: "Systemd answers when a schedule next falls due.",
    },
    {
      invariantKind: "departure",
      statement: "A schedule naming no time still to come is answered as never.",
    },
    {
      invariantKind: "departure",
      statement:
        "When a reminder next falls due is kept beside the page rather than in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder taken away loses what was kept beside the page too.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder is taken away by a program rather than by an agent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
