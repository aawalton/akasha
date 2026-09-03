import type { Module } from "@akasha/code-system/module"

export const pageLandingJournal = {
  id: "01a0686e-6807-7006-92df-5547fb44ef9f",
  pageTypeSlug: "module",
  slug: "page-landing-journal",
  definition:
    "what a writer has queued to land, kept outside the checkout so another process can find it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A journal is named for the checkout it stands for rather than for its writer.",
    },
    {
      invariantKind: "departure",
      statement: "A journal is written whole, under another name, and then renamed into place.",
    },
    {
      invariantKind: "departure",
      statement: "A journal that will not parse reads as no journal rather than as a fault.",
    },
    {
      invariantKind: "departure",
      statement: "A journal naming no path reads as no journal.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the journals stand is said by `PAGE_LANDING_JOURNAL_DIR` and falls back to the user's state directory.",
    },
    {
      invariantKind: "departure",
      statement: "A writer whose liveness cannot be told apart from absence is read as alive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands anything or reads the checkout.",
    },
  ],
} as const satisfies Module
