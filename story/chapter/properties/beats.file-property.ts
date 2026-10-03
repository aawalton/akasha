import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const beats = {
  id: "01a10303-754b-73f7-80e7-91da765b1032",
  type: "page-type/file-property",
  slug: "beats",
  propertySlug: "beats",
  definition: "a turn or written chapter's beats, one json record to a beat, with each step's part",
  extensions: ["jsonl"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one beat, in order, naming its number and its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's line holds its scene, changes, memory and pictures beside its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance writes the beats afresh, with no later step's part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mechanics step replaces each beat's changes, and a recorder each beat's memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture recorder replaces the chapter's pictures whole, each on its beat.",
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
} as const satisfies FileProperty
