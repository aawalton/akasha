import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIvCultivating = {
  id: "01a0ea00-b2f3-7d29-a1a3-ece62f1079dd",
  type: "page-type/world-check",
  slug: "otherwhere-iv-cultivating",
  title: "Cultivating",
  world: "world/beware-of-chicken",
  definition: "whether an act of cultivation in Otherwhere IV comes off",
  description: "Whether an act of drawing Qi or breaking through comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mortal can gather no Qi without a method: a manual, a teacher, or a spirit's guidance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first act is sensing Qi, a hard act of stillness tried once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening the dantian is a hard act, tried only after seven days of sensing Qi.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening the dantian lifts a mortal to the first stage of the Initiate's Realm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each later stage is one breakthrough, tried after a month of daily practice at the last stage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A breakthrough into a new realm is extreme, and one within a realm is hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Land thick with Qi, a spirit herb eaten, or a teacher's hand each give a bonus of 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grief, fear, hunger or a wound held in the body each cost a bonus of 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A breakthrough landed at a cost rises, and deviation harms 1d6 with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed breakthrough does not rise, and deviation harms 1d6 with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A failed breakthrough that misses by more than 8 also leaves a lasting condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strong spirit herb eaten by a body not ready for it harms 1d6 with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mortal may train her body and build muscle without any Qi.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No dice, stages or realms named as numbers show in the prose.",
    },
  ],
} as const satisfies WorldCheck
