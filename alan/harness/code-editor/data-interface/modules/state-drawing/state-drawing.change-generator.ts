import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const stateDrawing = {
  id: "01a0a682-3acc-7b55-b488-e7b96ed58cac",
  type: "page-type/change-generator",
  slug: "state-drawing",
  definition: "the pictures a landing carries, drawn from the change rather than from the disk",
  code: "ts",
  runsAfter: [
    "change-generator/change-runner-addressing",
    "change-generator/dockerfile-writing",
    "change-generator/game-panel-drawing",
    "change-generator/group-writing",
    "change-generator/lockfile-making",
    "change-generator/page-property-typing",
    "change-generator/page-type-typing",
    "change-generator/source-globbing",
    "change-generator/spacing-stepping",
    "change-generator/value-minting",
  ],
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is a file the change carries rather than a file a landing writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Drawing the pictures inside the hold would keep every other landing waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing overlapping another can write back a picture drawn before the other landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture made from committed pages alone is a file change the landing carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a picture is drawn from the change rather than from the pages on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture drawn the same as the one already filed is no file change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The picture already filed is read from the files on disk, because no commit holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change no shadow can be cast over draws nothing rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drawing that throws is said rather than thrown, and the landing goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture the change cannot have moved is not drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change moving no picture casts no shadow.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A picture here is made by reading every page of many page types.",
    },
  ],
} as const satisfies ChangeGenerator
