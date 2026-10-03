import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetPanel = {
  id: "01a0629b-6851-766f-a3b3-76b010efa64a",
  type: "page-type/module",
  slug: "sheet-panel",
  definition: "a character sheet in three tabs, being stats, skills and items",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity is shown once gained, being knowledge its holder has earned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity is shown as its name and the bare count it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cap an affinity's count fills toward is not shown beside that count.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No number behind an affinity is shown, neither its bias nor its cost nor its backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is shown as its rung and the level it holds within that rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills tab lists the character's traits below its skills, once a trait is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a gain felt like belongs to the prose rather than to this sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with nothing in it is not shown, so gear not yet owned is not foretold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The titles are not shown at all until the first title lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stats tab opens on the character's species, class, rank and status, where shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character's resources come next, above its attributes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills tab lists the character's legacies below its traits, once one is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Resources are drawn one to a line, so a resource's name and its count never wrap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value shown in words wraps within its own side, and its name beside it never does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items tab opens on the character's purse, above what the character carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse with a ledger opens that ledger when tapped, newest change first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawing this sheet says whether it shows the stats and the bonds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A part of the sheet already opened says it holds none yet rather than going away.",
    },
  ],
} as const satisfies Module
