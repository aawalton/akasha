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
      statement: "One held-open server answers every call rather than one server per call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a child but the server.",
    },
    {
      invariantKind: "departure",
      statement: "A call names the page whose code holds the export, and names the export.",
    },
    {
      invariantKind: "departure",
      statement: "A page is named by its slug rather than by the path its code sits at.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page carries is refused by the server rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A call answering with a nonzero code is thrown as an error.",
    },
    {
      invariantKind: "departure",
      statement: "That error says what the command said rather than naming the export and a code.",
    },
    {
      invariantKind: "departure",
      statement: "A command answering nonzero and saying nothing is named with its code instead.",
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
