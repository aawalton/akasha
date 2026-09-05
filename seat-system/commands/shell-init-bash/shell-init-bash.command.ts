import type { Command } from "@akasha/command-system/command"

export const shellInitBash = {
  id: "01a0680a-fa30-7da6-aede-88d6a9a5e49a",
  pageTypeSlug: "command",
  slug: "shell-init-bash",
  definition: "the command composing the bash a terminal sources",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "this takes no word and no flag: it composes one set, for bash, and every terminal sources the same one.",
    "the set is written to the output stream for a shell to evaluate, so nothing else is ever printed there.",
    "the accounts a `c<N>` launcher is composed for are the claude account pages akasha carries.",
    "an account whose page states no alias index gets no launcher, and the rest are composed as before.",
    "reading no account at all is refused rather than composed as a set with no account launcher in it.",
    "every launcher in the set composes the set again by calling this, so a change here reaches a terminal already open.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The set is composed whole on every call rather than kept between calls.",
    },
    {
      invariantKind: "departure",
      statement: "What is composed goes to the report, so a shell can evaluate the output stream.",
    },
    {
      invariantKind: "departure",
      statement: "One line of the set is one line of the report.",
    },
    {
      invariantKind: "departure",
      statement: "A word given to this command is refused, because it takes none.",
    },
    {
      invariantKind: "departure",
      statement: "The accounts are read from the pages rather than from a snapshot beside them.",
    },
    {
      invariantKind: "departure",
      statement: "Reading no account is a data refusal rather than a set with no launchers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or starts a seat.",
    },
    {
      invariantKind: "gap",
      statement: "A terminal reaches its own functions only where this command can be read.",
    },
  ],
} as const satisfies Command
