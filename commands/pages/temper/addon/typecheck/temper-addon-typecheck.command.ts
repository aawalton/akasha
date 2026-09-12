import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAddonTypecheck = {
  id: "01a0603c-c1cb-7d74-ac42-cf9ae26b02f5",
  type: "command",
  slug: "temper-addon-typecheck",
  definition:
    "the command typechecking each addon against its own compiler settings with nothing emitted",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [{ said: "--code-root <path>", takes: "the checkout whose addons are typechecked" }],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The compiler is run once per addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon's own compiler settings say which game globals the addon may name.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration a sibling addon has is out of scope for the addon compiled.",
    },
    {
      invariantKind: "departure",
      statement: "The addons are taken in canonical-name order.",
    },
    {
      invariantKind: "departure",
      statement: "The first addon that does not typecheck ends the run.",
    },
    {
      invariantKind: "constraint",
      statement: "An addon whose own files the compile leaves unread refuses the run.",
    },
    {
      invariantKind: "departure",
      statement: "An addon naming no bundle entry is reported as compiled of nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "An addon whose settings cannot be written refuses the run by name.",
    },
    {
      invariantKind: "departure",
      statement: "The whole run is bounded rather than each addon.",
    },
    {
      invariantKind: "departure",
      statement: "A run passing its ceiling refuses with the addon that run was on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is emitted by the compiler here.",
    },
  ],
  name: "typecheck",
} as const satisfies Command
