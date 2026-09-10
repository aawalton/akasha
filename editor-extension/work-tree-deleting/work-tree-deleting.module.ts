import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeDeleting = {
  id: "01a08c50-69e1-76f0-a610-90ebd835ef29",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-deleting",
  definition: "the row Alan deletes in the work tree named to the command that deletes it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is deleted from the menu the editor draws over that row.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is named to the command by its initiative and its statement.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row's initiative is read off that row's key by the module reading a drag's key.",
    },
    {
      invariantKind: "departure",
      statement: "The statement named is the label the row is drawn under.",
    },
    {
      invariantKind: "departure",
      statement: "A row that is no intent deletes no intent.",
    },
    {
      invariantKind: "departure",
      statement: "Deleting an intent is made by the command taking an intent out.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative is named to the command by the slug its row is keyed by.",
    },
    {
      invariantKind: "departure",
      statement: "A row that is no initiative deletes no initiative.",
    },
    {
      invariantKind: "departure",
      statement: "Deleting an initiative is made by the command taking an initiative away.",
    },
    {
      invariantKind: "departure",
      statement: "Alan is asked to confirm before an initiative goes, in a modal he answers.",
    },
    {
      invariantKind: "departure",
      statement: "The modal says the intents go with the initiative and a seat's assignment stays.",
    },
    {
      invariantKind: "departure",
      statement: "An answer other than the confirming word deletes nothing and says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A deletion waits the ceiling the harness names rather than one named here.",
    },
    {
      invariantKind: "departure",
      statement: "A deletion that failed is said to Alan once and written to the panel's channel.",
    },
    {
      invariantKind: "departure",
      statement: "The editor is handed in rather than imported, so a test runs outside the editor.",
    },
    {
      invariantKind: "departure",
      statement: "The harness call is handed in rather than imported, for that same reason.",
    },
    {
      invariantKind: "departure",
      statement: "The panel is told a row is going before the command that deletes it is called.",
    },
    {
      invariantKind: "departure",
      statement: "Alan answers the modal before the panel is told an initiative is going.",
    },
    {
      invariantKind: "departure",
      statement: "The panel is told the row stayed where the command refused.",
    },
    {
      invariantKind: "departure",
      statement: "The panel is told the deletion answered where the command landed it.",
    },
    {
      invariantKind: "departure",
      statement: "A row the command deleted is told to the panel once and no more.",
    },
    {
      invariantKind: "departure",
      statement: "The panel is told rather than drawn to, so a test runs outside the editor.",
    },
    {
      invariantKind: "absence",
      statement: "Alan is not asked to confirm before an intent goes.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here writes the initiative's page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
