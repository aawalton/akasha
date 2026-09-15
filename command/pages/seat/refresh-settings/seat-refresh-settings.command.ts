import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatRefreshSettings = {
  id: "01a0685f-5754-74e9-8b40-493ffdcdadda",
  type: "command",
  slug: "seat-refresh-settings",
  definition:
    "the command rewriting each running seat's settings file from the document as it now is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A running client watches the settings file that client was launched with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file's name stops describing that file's contents once the body is written again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook's registration is read once, when the client starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every settings file a running process names is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The document is read once and every file is written from that one reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The per-spawn keys a file has are carried into the file replacing that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file already with the body that would be written is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The digest in a file's name is left as the digest is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not read is reported rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every file is acted on rather than the run stopping at the first that will not read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading no live settings file at all is a data refusal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here stops a seat or a client.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the settings document.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run that stopped part way is refused naming each file written before it stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that stopped before writing a file is refused as the fault alone.",
    },
  ],
  name: "refresh-settings",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
