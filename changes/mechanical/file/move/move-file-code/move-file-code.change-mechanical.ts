import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const moveFileCode = {
  id: "01a07718-c9b6-7bb2-9eb2-27a44ed4fe7d",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-file-code",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "one code file moved to another path, with every body importing it repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing path under no TypeScript name is refused here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path a file is moved from.",
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
      statement: "The file is moved by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The body moved names its own imports by the paths its new folder reaches.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing the file names the path that file landed at.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer which bodies import the file refuses the move.",
    },
    {
      invariantKind: "departure",
      statement: "The imports left over the move are judged by the guard this change names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest naming the moved file as a way in states the path that file landed at.",
    },
    {
      invariantKind: "departure",
      statement: "Which manifests name that file is read from the index rather than from the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The way in is restated by the change this change reaches for a manifest.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generated body importing what moved is written by the generator, so the answer names it nowhere.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
