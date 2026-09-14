import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const divideFileCode = {
  id: "01a09c43-477b-70bb-8ac6-1c63e5ab3632",
  type: "change-mechanical",
  slug: "divide-file-code",
  changeMode: "change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code body divided in two, the exports named landing in a file made for them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The exports carried are named together in one argument.",
    },
    {
      invariantKind: "departure",
      statement: "A name is parted from the next by a space or by a line's end.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no export is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path already holding a body is refused rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the change carrying an export into a body already there.",
    },
    {
      invariantKind: "departure",
      statement: "Every export named is carried by one answer rather than one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "What the division leaves is worked out by the module this change names.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal that module answers is the refusal this change answers.",
    },
    {
      invariantKind: "departure",
      statement: "The file the exports land in is written by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The imports that file names are judged by the guard that change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The passages the division leaves in every other body are answered as edits here.",
    },
    {
      invariantKind: "absence",
      statement: "No change acting on what a file holds is reached here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
