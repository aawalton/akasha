import type { Change } from "../../change.page-type.ts"

export const moveFile = {
  id: "01a07883-67ed-7849-b6e5-e499695cac46",
  pageTypeSlug: "change",
  slug: "move-file",
  definition: "one file carried to another path, with nothing else judged",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body carried is the body standing at the path the move came from.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding no body is refused rather than carried.",
    },
    {
      invariantKind: "departure",
      statement: "A path a body already stands at is refused rather than written over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites the paths the carried body names.",
    },
    {
      invariantKind: "departure",
      statement: "The calling change repoints every body naming the path that moved.",
    },
  ],
} as const satisfies Change
