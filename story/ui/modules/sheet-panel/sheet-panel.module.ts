import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetPanel = {
  id: "01a0629b-6851-766f-a3b3-76b010efa64a",
  type: "page-type/module",
  slug: "sheet-panel",
  definition: "a character sheet in tabs, being stats, inventory, skills and traits",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tabs sit at the top of the card, above everything the card draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab with nothing to show is not drawn, and the stats tab always is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stats tab opens on the caption, then the titles, the experience and the cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The titles are not shown at all until the first title lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience is drawn as the bar under the level rather than as a resource.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience given only in words is drawn as those words, with no bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points left to spend are one line saying how many kinds are ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That line opens to each kind's count, and spends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Species, class, rank and status come next, then resources, then attributes.",
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
      statement: "A skill is shown as its rung and the level it holds within that rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The skills tab lists the skills, then the affinities, and a skill offers Use.",
    },
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
      statement: "The traits tab lists the traits, then the legacies, then the bonds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each list tab has a search over every list it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a gain felt like belongs to the prose rather than to this sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawing this sheet says whether it shows the stats and the bonds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawing this sheet hands it the acts only for the player's own sheet.",
    },
  ],
  createdAt: "2026-09-02T14:52:27.089Z",
  updatedAt: "2026-10-27T19:04:03.834Z",
} as const satisfies Module
