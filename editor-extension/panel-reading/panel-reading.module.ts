import type { Module } from "@akasha/code-system/module"

export const panelReading = {
  id: "01a06954-f7dd-77bf-9553-4fdcb4d6edbe",
  pageTypeSlug: "module",
  slug: "panel-reading",
  definition: "what the extension's panels drew, taken by activating it under node",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is activated is the extension rather than a model of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The entry is bundled for node and its `activate` is called the way the host calls it.",
    },
    {
      invariantKind: "departure",
      statement: "The `vscode` it activates against is the stub page beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every member the bundle reaches is read off the bundle and held against the stub before anything is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A member the stub does not export refuses the run rather than emptying a panel.",
    },
    {
      invariantKind: "constraint",
      statement: "A namespace import answers undefined for a member the stub does not export.",
    },
    {
      invariantKind: "departure",
      statement: "A member named inside a quote is no reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each registered provider is asked for its children and its items down its whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "What is read is the row the editor would draw.",
    },
    {
      invariantKind: "departure",
      statement: "The reading goes to a file rather than down a pipe.",
    },
    {
      invariantKind: "departure",
      statement: "The run exits rather than waiting, activation leaving poll timers standing.",
    },
    {
      invariantKind: "departure",
      statement: "Activation writing no reading refuses with what node said.",
    },
    {
      invariantKind: "departure",
      statement: "Each feature's outcome on activation is kept as the channel it was written to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what was drawn.",
    },
  ],
} as const satisfies Module
