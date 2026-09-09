import type { Module } from "../../code-system/modules/module.page-type.ts"

export const harnessCall = {
  id: "01a064f0-734d-7459-91b7-33e6eb60021d",
  pageTypeSlug: "module",
  type: "module",
  slug: "harness-call",
  definition: "the harness command run under bun and the whole answer that command gives",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A command stating its answer size is refused where a different count of bytes arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A command stating no answer size has its output handed back unchecked.",
    },
    {
      invariantKind: "departure",
      statement: "Bun is looked for under the home directory rather than on the inherited path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bun directory is put ahead of the inherited path rather than after that path.",
    },
    {
      invariantKind: "constraint",
      statement: "A harness call finding no installed bun is refused as unreachable.",
    },
    {
      invariantKind: "departure",
      statement: "An unset AKASHA_ROOT makes the harness root `repos/akasha` under the home.",
    },
    {
      invariantKind: "departure",
      statement:
        "One held-open server answers every served command rather than one server per call.",
    },
    {
      invariantKind: "departure",
      statement: "A command the server answers is never also spawned as a child.",
    },
    {
      invariantKind: "departure",
      statement: "A command the server does not answer is spawned as the dispatcher on PATH.",
    },
    {
      invariantKind: "departure",
      statement: "A command is named to the harness by its name rather than by its file.",
    },
    {
      invariantKind: "departure",
      statement: "A command's own file exports an answering function and prints nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name no command has is refused by the dispatcher rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A served command answering with a nonzero code is thrown as an error.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the server says on stdout or stderr is an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Noise reaching no listener is dropped.",
    },
  ],
} as const satisfies Module
