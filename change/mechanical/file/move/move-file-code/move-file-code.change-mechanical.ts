import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const moveFileCode = {
  id: "01a07718-c9b6-7bb2-9eb2-27a44ed4fe7d",
  type: "page-type/change-mechanical",
  slug: "move-file-code",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "a code file moved to another path, with every body importing it repointed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing path under no TypeScript name is refused here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path a file is moved from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body is refused rather than moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a body already sits at is refused rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is moved by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body moved names its own imports by the paths its new folder reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The module repointing a body is called rather than reached through a rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body importing the file names the path that file landed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index naming no importer of the file moves that file and repoints nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated body importing what moved is written by the generator.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
