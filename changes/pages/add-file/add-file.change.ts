import type { Change } from "../../change.page-type.ts"

export const addFile = {
  id: "01a07810-4657-7cb0-8eff-29902c541102",
  pageTypeSlug: "change",
  slug: "add-file",
  definition: "one body written at one path, with nothing else judged",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path holding no body is written as an addition.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding another body is written over.",
    },
    {
      invariantKind: "departure",
      statement: "The body a path already held is answered beside the body written.",
    },
    {
      invariantKind: "departure",
      statement: "A path already holding the body given is refused rather than written again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a body may be written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Change
