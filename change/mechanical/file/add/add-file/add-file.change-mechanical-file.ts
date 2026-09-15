import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const addFile = {
  id: "01a07810-4657-7cb0-8eff-29902c541102",
  type: "change-mechanical-file",
  slug: "add-file",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path, with the entries in that body given their ids",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no body is written as an addition.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path with another body is written over as a replace with the whole body each side.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path already with the body given is refused rather than written again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line of a file of entries arriving without an `id` is given one here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line already stating an `id` keeps that `id`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a path holds entries is read from the module minting an entry's `id`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every caller writing a whole body at a path reaches this change to write it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `id` is worked out after the body given is weighed against the body there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may state the body its own body was composed against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body stated that is not the body there refuses the change unwritten.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A caller stating no such body is held to nothing and writes over what is there.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a body may be written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
