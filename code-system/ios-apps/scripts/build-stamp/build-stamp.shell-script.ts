import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const buildStamp = {
  id: "01a05934-fe0c-75ac-a104-88e6686eb2af",
  pageTypeSlug: "shell-script",
  slug: "build-stamp",
  definition: "the commit a binary was built from, put where the upload gate reads it",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A stamp is written in the same step that skipping the stamp would otherwise hide.",
    },
    {
      invariantKind: "absence",
      statement: "No flag skips a stamp.",
    },
    {
      invariantKind: "departure",
      statement: "The app stamp is appended last.",
    },
    {
      invariantKind: "departure",
      statement: "The app stamp's strip runs to the end of the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The widget stamp is written between the widget source copy and the Xcode project rebuild.",
    },
    {
      invariantKind: "departure",
      statement: "The Swift a stamp emits is an `@objc` class.",
    },
    {
      invariantKind: "departure",
      statement: "A marker's spelling is shared with the cut's build-stamp gate.",
    },
    {
      invariantKind: "departure",
      statement: "A marker and the gate reading that marker move in one commit.",
    },
  ],
} as const satisfies ShellScript
