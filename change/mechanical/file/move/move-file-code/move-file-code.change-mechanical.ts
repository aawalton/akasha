import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const moveFileCode = {
  id: "01a07718-c9b6-7bb2-9eb2-27a44ed4fe7d",
  type: "change-mechanical",
  slug: "move-file-code",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code file moved to another path, with every body importing it repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing path under no TypeScript name is refused here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the path a file is moved from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no body is refused rather than moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a body already sits at is refused rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is moved by the change this change reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body moved names its own imports by the paths its new folder reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The module repointing a body is called rather than reached through a rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body importing the file names the path that file landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index that cannot answer which bodies import the file refuses the move.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports left over the move are judged by the guard this change names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generated body importing what moved is written by the generator.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
