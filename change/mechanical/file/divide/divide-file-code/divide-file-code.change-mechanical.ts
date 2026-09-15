import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const divideFileCode = {
  id: "01a09c43-477b-70bb-8ac6-1c63e5ab3632",
  type: "change-mechanical",
  slug: "divide-file-code",
  changeMode: "change-mode/change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code body divided in two, the exports named landing in a file made for them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The exports carried are named together in one argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is parted from the next by a space or by a line's end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no export is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing path already holding a body is refused rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the change carrying an export into a body already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every export named is carried by one answer rather than one at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the division leaves is worked out by the module this change names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal that module answers is the refusal this change answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file the exports land in is written by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports that file names are judged by the guard that change carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passages the division leaves in every other body are answered as edits here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change acting on what a file holds is reached here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
