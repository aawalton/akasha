import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const buildStamp = {
  id: "01a05934-fe0c-75ac-a104-88e6686eb2af",
  type: "page-type/shell-script",
  slug: "build-stamp",
  definition: "the commit a binary was built from, put where the upload gate reads it",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A stamp is written in the same step that skipping the stamp would otherwise hide.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag skips a stamp.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The app stamp is appended last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The app stamp's strip runs to the end of the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The widget stamp is written between the widget source copy and the Xcode project rebuild.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Swift a stamp emits is an `@objc` class.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A marker's spelling is shared with the cut's build-stamp gate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A marker and the gate reading that marker move in one commit.",
    },
  ],
} as const satisfies ShellScript
