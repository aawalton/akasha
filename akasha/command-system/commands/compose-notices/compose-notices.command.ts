import type { Command } from "../command.page-type.ts"

export const composeNotices = {
  id: "01a0693b-42f9-7c87-95fd-2c7147ecd1f2",
  pageTypeSlug: "command",
  slug: "compose-notices",
  definition: "what a seat is told when it is put back to work, as one JSON object",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [{ said: "--out <path>", takes: "a file to write into, rather than saying it" }],
  helpNotes: [
    "it prints one JSON object of notice slug to composed text, and nothing else.",
    "every notice page under `akasha/seat-system/notices/pages` is rendered, keyed by its file name.",
    "callers ask for a notice by slug, so a page renamed there is a notice one of them no longer finds.",
    "nothing says so before a fleet meets it: the check that did went with an orphaned folder and has no successor yet.",
    "wrapping is the author's convenience and not part of the text.",
    "the lines of a paragraph are joined with a space, and a blank line between two paragraphs survives as one.",
    "a notice page holding nothing is rendered as an empty text rather than left out.",
    "the JSON is indented two spaces, unlike the other verbs the editor asks, so a caller diffing it reads a match as a match.",
    "named `--out`, it writes there and says nothing, so a run that wrote prints no line at all.",
    "a relative `--out` path is read against the repository root rather than the calling folder.",
    "the editor's seat revive asks this as a child and reads the `editor-revive` key alone.",
    "the supervisor asks the file rather than this command, and reads `restart-immediate`, `restart-deferred` and `restart-recovery-clause`.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notice is keyed by its file name rather than by anything the file says.",
    },
    {
      invariantKind: "departure",
      statement: "The lines of a paragraph are joined with a space, wrapping being the author's.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line between two paragraphs survives as one blank line.",
    },
    {
      invariantKind: "departure",
      statement: "A notice page holding nothing is answered an empty text rather than left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder that is not there, or holds no notice page, is refused rather than emptied.",
    },
    {
      invariantKind: "departure",
      statement: "The JSON is indented two spaces, which the callers diffing it read.",
    },
    {
      invariantKind: "departure",
      statement:
        "Named `--out`, it writes there and says nothing rather than saying what it wrote.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relative `--out` path is read against the repository root, not the caller's folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which notice a caller asks for.",
    },
    {
      invariantKind: "absence",
      statement: "Named no `--out`, a run writes nothing.",
    },
  ],
} as const satisfies Command
