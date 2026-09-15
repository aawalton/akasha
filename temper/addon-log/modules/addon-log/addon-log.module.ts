import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonLog = {
  id: "01a08e26-c147-7c8e-baea-f2cad9ded7c8",
  type: "module",
  slug: "addon-log",
  definition: "the log line written for each value an add-on hands over",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An info line goes to the chat window where no log viewer is loaded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line other than info is written only while logging is on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An info line is written whether logging is on or off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A table already written out is named rather than written out again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A first value holding a placeholder takes the values after it as its fillings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a log viewer is loaded is read once, as an add-on's log is made.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A log viewer loading after that read is not seen.",
    },
  ],
} as const satisfies Module
