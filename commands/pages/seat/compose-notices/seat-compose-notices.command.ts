import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatComposeNotices = {
  id: "01a0693b-42f9-7c87-95fd-2c7147ecd1f2",
  type: "command",
  slug: "seat-compose-notices",
  definition:
    "the command answering what a seat is told when it is put back to work, as one JSON object",
  code: "ts",
  test: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The notices are composed by the compose module rather than in here.",
    },
    {
      invariantKind: "departure",
      statement: "A composing that throws refuses the call rather than answering with no notice.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is the machine's fault rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "The JSON is indented two spaces.",
    },
    {
      invariantKind: "departure",
      statement: "The callers of this command diff the JSON written.",
    },
    {
      invariantKind: "departure",
      statement: "The editor asks the command server for this command by slug to revive a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A run named `--output` writes the JSON there rather than saying the JSON.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relative `--output` path is read against the repository root rather than the caller's folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every word the command does not take is named in the refusal rather than the first alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which notice a caller asks for.",
    },
    {
      invariantKind: "absence",
      statement: "A run named no `--output` writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every notice page the index files is answered, keyed by that page's slug.",
    },
    {
      invariantKind: "gap",
      statement:
        "A notice slug a caller names that no page carries is refused before a fleet meets it.",
    },
  ],
  name: "compose-notices",
  arguments: [{ argument: "argument/output" }],
} as const satisfies Command
