import type { Command } from "@akasha/command-system/command"

export const temperAddonTypecheck = {
  id: "01a0603c-c1cb-7d74-ac42-cf9ae26b02f5",
  pageTypeSlug: "command",
  slug: "temper-addon-typecheck",
  definition:
    "the command typechecking each addon against its own compiler settings with nothing emitted",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--code-root <path>", takes: "the checkout whose addons are typechecked" }],
  helpNotes: [
    "an addon's own compiler settings are the only statement of what it compiles and which game globals it may name.",
    "the compiler is therefore run once per addon rather than once over the workspace.",
    "a declaration held by a sibling addon is read by neither the build nor this, so naming it is caught here and nowhere else.",
    "the addons are taken in canonical-name order and the first one that does not typecheck ends the run.",
    "an addon whose own files the compile leaves unread is refused, since a clean result there reports on work the compiler never read.",
    "the whole run is bounded rather than each addon, so a compiler making no progress refuses with the addon it was on.",
  ],
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
      statement: "A declaration a sibling addon holds is out of scope for the addon compiled.",
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
      invariantKind: "absence",
      statement: "Nothing is emitted by the compiler here.",
    },
  ],
} as const satisfies Command
