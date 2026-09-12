import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatRefreshSettings = {
  id: "01a0685f-5754-74e9-8b40-493ffdcdadda",
  type: "command",
  slug: "seat-refresh-settings",
  definition:
    "the command rewriting each running seat's settings file from the document as it now is",
  code: "ts",
  taking: [{ said: "--json", takes: "give the rows as JSON rather than as tab-separated lines" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A running client watches the settings file that client was launched with.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file's name stops describing that file's contents once the body is written again.",
    },
    {
      invariantKind: "departure",
      statement: "A hook's registration is read once, when the client starts.",
    },
    {
      invariantKind: "departure",
      statement: "Every settings file a running process names is read.",
    },
    {
      invariantKind: "departure",
      statement: "The document is read once and every file is written from that one reading.",
    },
    {
      invariantKind: "departure",
      statement: "The per-spawn keys a file has are carried into the file replacing that file.",
    },
    {
      invariantKind: "departure",
      statement: "A file already with the body that would be written is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The digest in a file's name is left as the digest is.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not read is reported rather than written.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file is acted on rather than the run stopping at the first that will not read.",
    },
    {
      invariantKind: "departure",
      statement: "Reading no live settings file at all is a data refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stops a seat or a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the settings document.",
    },
  ],
  name: "refresh-settings",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
