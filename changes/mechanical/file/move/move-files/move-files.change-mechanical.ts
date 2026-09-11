import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const moveFiles = {
  id: "01a09230-ff9c-7e79-9c45-3d0b77f13b11",
  type: "change-mechanical",
  slug: "move-files",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "many files moved at once, with every body naming one of them repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The paths that move arrive as one map rather than one call for each file.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no path is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no body is refused rather than moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path a body already sits at is refused rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A path landing where it already sits is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved names its own imports by the paths its new folder reaches.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing a file that moved names the path that file landed at.",
    },
    {
      invariantKind: "departure",
      statement: "The importers are asked of the index once for the whole move.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer which bodies import a file refuses the move.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a moved file as a way in states the path that file landed at.",
    },
    {
      invariantKind: "departure",
      statement: "The imports left over the move are judged by the guard this change names.",
    },
    {
      invariantKind: "absence",
      statement: "No rung is reached for a file that moves.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
