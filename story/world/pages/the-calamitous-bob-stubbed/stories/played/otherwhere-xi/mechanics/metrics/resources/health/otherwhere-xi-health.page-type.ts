import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiHealth = {
  id: "01a0ea7b-4aea-7a52-b106-65831588cb70",
  type: "page-type/page-type",
  slug: "otherwhere-xi-health",
  definition: "the health a character in Otherwhere XI has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most health is twenty, two for each Endurance, and ten for each step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beast's most health follows its danger: 10 to 30 not dangerous, to 60 not very, to 150 dangerous.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lethal beast has 150 health or more; a dragon a thousand or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she falls senseless and dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm dealt past nought of a fifth of her most health or more kills her outright.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A third of her most health or more lost to one blow leaves a lasting injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lasting injury is a wrench, deep gash, bad bite, burn or break in the part the blow struck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every act leaning on the injured part is one band harder until it heals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrench or gash heals in a week of light use; a break in six weeks, splinted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healer's care halves an injury's healing; hard use before it heals doubles it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lasting injury is written as a fact on the injured one's lore page when it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of true rest gives back one health; hunger or cold stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep fed and sheltered gives back a quarter of her most health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a wise woman's care double what rest gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wise woman's life-mana healing gives back ten at once, once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mending potion gives back twenty at once and closes a gash or bite.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The interface never shows her health; she knows it only as her body feels it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
