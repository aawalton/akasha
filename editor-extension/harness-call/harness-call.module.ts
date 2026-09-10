import type { Module } from "../../code-system/modules/module.page-type.types.ts"

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
      statement: "One held-open server answers the calls rather than a server for each call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a child but the server.",
    },
    {
      invariantKind: "departure",
      statement: "A call names the page whose code holds the export.",
    },
    {
      invariantKind: "departure",
      statement: "A call names the export that call asks for.",
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
      statement: "A call reaching a command that lands is given longer than a landing waits.",
    },
    {
      invariantKind: "departure",
      statement:
        "The ceiling stated here is the ceiling given to a caller reaching a command that lands.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A landing queued behind another landing lands after the caller gave up on that landing.",
    },
    {
      invariantKind: "departure",
      statement: "A call reaching a command that writes nothing is given whatever its caller says.",
    },
    {
      invariantKind: "departure",
      statement: "A call answering with a nonzero code is thrown as an error.",
    },
    {
      invariantKind: "departure",
      statement:
        "That error says the words the command said rather than naming the export and a code.",
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
    {
      invariantKind: "departure",
      statement: "Nothing the editor loads reads the index, because reading one needs bun.",
    },
    {
      invariantKind: "stopgap",
      statement: "The folder the command server sits in is spelled here.",
    },
    {
      invariantKind: "gap",
      statement: "The index answers where the command server's code sits.",
    },
  ],
} as const satisfies Module
