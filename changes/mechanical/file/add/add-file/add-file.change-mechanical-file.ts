import type { ChangeMechanicalFile } from "akasha/changes/mechanical/file/change-mechanical-file.page-type.types.ts"

export const addFile = {
  id: "01a07810-4657-7cb0-8eff-29902c541102",
  type: "change-mechanical-file",
  slug: "add-file",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path, with the entries in that body given their ids",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path with no body is written as an addition.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path with another body is written over as a replace with the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "A path already with the body given is refused rather than written again.",
    },
    {
      invariantKind: "departure",
      statement: "A line of a file of entries arriving without an `id` is given one here.",
    },
    {
      invariantKind: "departure",
      statement: "A line already stating an `id` keeps that `id`.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a path holds entries is read from the module minting an entry's `id`.",
    },
    {
      invariantKind: "departure",
      statement: "Every caller writing a whole body at a path reaches this change to write it.",
    },
    {
      invariantKind: "departure",
      statement: "An `id` is worked out after the body given is weighed against the body there.",
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
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFile
