import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const addonLog = {
  id: "01a08e26-c147-7c8e-baea-f2cad9ded7c8",
  type: "module",
  slug: "addon-log",
  definition: "the log line written for each value an add-on hands over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An info line goes to the chat window where no log viewer is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A line other than info is written only while logging is on.",
    },
    {
      invariantKind: "departure",
      statement: "An info line is written whether logging is on or off.",
    },
    {
      invariantKind: "departure",
      statement: "A table already written out is named rather than written out again.",
    },
    {
      invariantKind: "departure",
      statement: "A first value holding a placeholder takes the values after it as its fillings.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a log viewer is loaded is read once, as an add-on's log is made.",
    },
    {
      invariantKind: "absence",
      statement: "A log viewer loading after that read is not seen.",
    },
  ],
} as const satisfies Module
