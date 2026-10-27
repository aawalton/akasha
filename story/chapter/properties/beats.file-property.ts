import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const beats = {
  id: "01a10303-754b-73f7-80e7-91da765b1032",
  type: "page-type/file-property",
  slug: "beats",
  propertySlug: "beats",
  definition: "a turn or chapter's beats, one json record to a beat, with each step's part",
  extensions: ["jsonl"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one beat, in order, naming its number and its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat's line holds its prose, scene, changes, memory and pictures beside its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master's advance keeps each beat's changes, memory and pictures before its first moved one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From the first moved beat on, a beat holds no later step's part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend keeps the beats' prose only where it moves no beat and drops none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mechanics seat's changes and each recorder's memory merge in by beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A writer at beats gives one beat its prose, and any other writer names every beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter joining turns whose prose sits only in prose files keeps none on its beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose file is its beats' prose end to end, a cache of the beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The picture recorder replaces the pictures on each beat it hands in, and keeps every other beat's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player writes each change and each memory onto its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file is held to no length, so a whole chapter's beats always fit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page beside it keeps only small fields, so it stays under its own ceiling.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-03T18:25:20.715Z",
  updatedAt: "2026-10-27T21:28:02.205Z",
} as const satisfies FileProperty
