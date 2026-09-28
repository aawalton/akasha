import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViHp = {
  id: "01a0ea3d-ca8e-7d79-90cd-3499cdb8dfbf",
  type: "page-type/page-type",
  slug: "otherwhere-vi-hp",
  definition: "the HP a character in Otherwhere VI has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person's HP maximum is twenty, three for each Vitality, and one for each level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Tier a person's Class advances adds half again to that maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's maximum is the one its status shows, and roughly doubles each Tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with an HP page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below half her HP she hurts, and every act costs her one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she falls senseless and dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm dealt past nought of a fifth of her maximum or more kills her outright.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A third of her maximum or more lost to one blow leaves a lasting injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of true rest gives back one HP; hunger or cold stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep fed and sheltered gives back a quarter of her maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a healer's care double what rest gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A health potion gives back twenty at once; healing magic knits a lasting injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows her harm as a line such as 【HP -7】 as it lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in HP is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "HP shows as a number only where the System shows it; otherwise as the body feels it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
