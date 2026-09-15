import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const harnessCall = {
  id: "01a064f0-734d-7459-91b7-33e6eb60021d",
  type: "module",
  slug: "harness-call",
  definition: "the harness command run under bun and the whole answer that command gives",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A command stating its answer size is refused where a different count of bytes arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command stating no answer size has its output handed back unchecked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bun is looked for under the home directory rather than on the inherited path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The bun directory is put ahead of the inherited path rather than after that path.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A harness call finding no installed bun is refused as unreachable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unset AKASHA_ROOT makes the harness root `repos/akasha` under the home.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One held-open server answers the calls rather than a server for each call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here spawns a child but the server.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call names the page whose code holds the export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call names the export that call asks for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is named by its slug rather than by the path its code sits at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no page carries is refused by the server rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call reaching a command that lands is given longer than a landing waits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The ceiling stated here is the ceiling given to a caller reaching a command that lands.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A landing queued behind another landing lands after the caller gave up on that landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call reaching a command that writes nothing is given whatever its caller says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call answering with a nonzero code is thrown as an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That error says the words the command said rather than naming the export and a code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command answering nonzero and saying nothing is named with its code instead.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing the server says on stdout or stderr is an answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Noise reaching no listener is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing the editor loads reads the index, because reading one needs bun.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command server's file is named from that server's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder spelled here is the server's own folder rather than the folder above.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A move of that folder respells it here, where a move respells no folder above it.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The index answers where the command server's code sits.",
    },
  ],
} as const satisfies Module
