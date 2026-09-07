import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const addFile = {
  id: "01a07810-4657-7cb0-8eff-29902c541102",
  pageTypeSlug: "change-mechanical",
  slug: "add-file",
  definition: "one body written at one path, with nothing else judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/body-not-written-over"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path holding no body is written as an addition.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding another body is refused by the guard this change names.",
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
} as const satisfies ChangeMechanical
