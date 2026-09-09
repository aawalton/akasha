import type { Command } from "../../../command.page-type.ts"

export const seatComposeNotices = {
  id: "01a0693b-42f9-7c87-95fd-2c7147ecd1f2",
  pageTypeSlug: "command",
  slug: "seat-compose-notices",
  definition: "what a seat is told when it is put back to work, as one JSON object",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [{ said: "--out <path>", takes: "a file to write into, rather than saying it" }],
  helpNotes: [
    "it prints one JSON object of notice slug to composed text, and nothing else.",
    "every notice page under `seat-system/notices/pages` is rendered, keyed by its file name.",
    "callers ask for a notice by slug, so a page renamed there is a notice one of them no longer finds.",
    "nothing says so before a fleet meets it: the check that did went with an orphaned folder and has no successor yet.",
    "wrapping is the author's convenience and not part of the text.",
    "the lines of a paragraph are joined with a space, and a blank line between two paragraphs survives as one.",
    "a notice page holding nothing is rendered as an empty text rather than left out.",
    "the JSON is indented two spaces, unlike the other verbs the editor asks, so a caller diffing it reads a match as a match.",
    "named `--out`, it writes there and says nothing, so a run that wrote prints no line at all.",
    "a relative `--out` path is read against the repository root rather than the calling folder.",
    "nothing calls this from code: the editor's seat revive and the supervisor both import the compose module and call it.",
    "the editor reads the `editor-revive` key alone, and the supervisor `restart-immediate`, `restart-deferred` and `restart-recovery-clause`.",
  ],
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
      statement: "The JSON is indented two spaces.",
    },
    {
      invariantKind: "departure",
      statement: "The callers of this command diff the JSON written.",
    },
    {
      invariantKind: "departure",
      statement: "A run named `--out` writes the JSON there rather than saying the JSON.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relative `--out` path is read against the repository root rather than the caller's folder.",
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
      statement: "A run named no `--out` writes nothing.",
    },
  ],
} as const satisfies Command
