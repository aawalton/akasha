import type { Command } from "@akasha/command-system/command"

export const seatRefreshSettings = {
  id: "01a0685f-5754-74e9-8b40-493ffdcdadda",
  pageTypeSlug: "command",
  slug: "seat-refresh-settings",
  definition:
    "the command rewriting each running seat's settings file from the document standing now",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [{ said: "--json", takes: "give the rows as JSON rather than as tab-separated lines" }],
  helpNotes: [
    "a running client watches the settings file it was launched with, so a permission change reaches a seat here without stopping it.",
    "a spawn names its settings file for a digest of the contents, so a changed document makes a new file for the next spawn and never touches the one a running seat watches.",
    "the per-spawn keys are read off the file being replaced and written again, so a seat keeps the overrides it was launched with.",
    "the digest in a name is left as it stands and stops describing the contents, being a spawn-time cache key rather than a claim about the file.",
    "a hook's registration is read once, when the client starts, so a registration change needs the client cycled and nothing here cycles one.",
    "finding no running process that names a spawned settings file is the scan failing rather than the fleet being empty.",
  ],
  invariants: [
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
      statement: "The per-spawn keys a file holds are carried into what replaces it.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what would be written is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The digest in a file's name is left as it stands.",
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
} as const satisfies Command
