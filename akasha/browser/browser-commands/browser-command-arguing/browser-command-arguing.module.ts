import type { Module } from "@akasha/code-system/module"

export const browserCommandArguing = {
  id: "01a06862-06c8-7005-a0b9-40b1cee375d7",
  pageTypeSlug: "module",
  slug: "browser-command-arguing",
  definition: "the words a browser command was called with, read against what that command takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag naming a value takes the word after it.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no command names is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a caller got wrong is named rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word standing where a whole number is wanted is the caller's mistake.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a browser or reaches the network.",
    },
  ],
} as const satisfies Module
