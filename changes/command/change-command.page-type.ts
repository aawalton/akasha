import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeCommand = Change & {
  isCommand: true
  runsChecks: true
}

export const changeCommand = {
  id: "01a0776c-f9ba-74a8-b1da-14ae06ba52f3",
  pageTypeSlug: "page-type",
  slug: "change-command",
  definition: "a change the change command runs",
  pluralSlug: "change-command",
  partSlugs: [
    "change-command/add-file",
    "change-command/change-file",
    "change-command/remove-page",
    "change-command/remove-page-type",
  ],
  extendsSlug: ["page-type/change"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command change is one option the change command offers.",
    },
    {
      invariantKind: "departure",
      statement: "A command change is a function the change command calls.",
    },
    {
      invariantKind: "departure",
      statement: "A command change runs the checks.",
    },
    {
      invariantKind: "departure",
      statement: "A command change is expected to pass checks.",
    },
    {
      invariantKind: "departure",
      statement: "A command change decides which partial change fits the page named.",
    },
    {
      invariantKind: "departure",
      statement: "A command change runs partial changes rather than working out bodies itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an argument off the command line.",
    },
  ],
} as const satisfies PageType
