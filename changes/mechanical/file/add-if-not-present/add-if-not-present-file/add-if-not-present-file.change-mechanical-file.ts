import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const addIfNotPresentFile = {
  id: "01a08188-1037-7ddd-b5cb-c727ac6ef590",
  pageTypeSlug: "change-mechanical-file",
  slug: "add-if-not-present-file",
  changeModeSlug: "change-mode-add-if-not-present",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file",
  definition: "one body written at one path that does not hold that body already",
  code: "ts",
  test: "ts",
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
      statement:
        "A path holding another body is written over as a replace holding the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "A path already holding the body given is left as that path is.",
    },
    {
      invariantKind: "departure",
      statement: "A body already there states no edit rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A program folding many bodies together lands the bodies that moved.",
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
} as const satisfies ChangeMechanicalFile
