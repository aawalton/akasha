import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanPicture = {
  id: "01a09c65-6c45-74f6-9f46-fbb5c1eb8702",
  type: "command",
  slug: "alan-picture",
  definition: "the command bringing a picture Alan's phone sent to a file on this machine",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The picture's id is the first word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is named for the id and carries the extension of the image kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path said here is written instead of the file under the home folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether an object store is there is settled before anything is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An id nothing is kept under is answered as missing data rather than as a wrong call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer names the path written, so a reader can open that file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the phone.",
    },
  ],
  name: "picture",
  arguments: [
    { argument: "argument/picture", required: true, saidAs: "flag-or-word" },
    { argument: "argument/output" },
  ],
} as const satisfies Command
