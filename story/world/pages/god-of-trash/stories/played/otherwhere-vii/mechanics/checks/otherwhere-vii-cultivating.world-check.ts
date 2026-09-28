import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiCultivating = {
  id: "01a0ea36-9909-728c-82ff-a3dfebc985e1",
  type: "page-type/world-check",
  slug: "otherwhere-vii-cultivating",
  title: "Cultivating",
  world: "world/god-of-trash",
  definition: "whether an act of waking mana or climbing a step in Otherwhere VII comes off",
  description: "Whether an act of sensing mana or breaking through comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop of mana potion swallowed wakes mana at once, with no roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Waking that way leaves the belly hot and full, costing one on every act for a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "More than a drop at first waking brings mana-sickness, and a whole potion cracks the core.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Waking with no potion is sensing: a hard act of stillness, tried once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sensing needs a method, a teacher, or a truth her path has found about the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gathering is an hour of breathing mana into the core, and a day counts one hour of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step within a Tier is tried after thirty gathering days at the step below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From Tier 1 each step takes twice the days of the Tier below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gathering in the wilds, a meal of beast meat or a drop of mana potion counts a day as three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step within a Tier is hard, and a step into a new Tier is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step into a new Tier needs an insight: a technique learned, or a truth of her path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Thick mana, a teacher's hand, or a potion that fits each give a bonus of two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Impurities clogging her, fear, grief, hunger or a wound each cost two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each failed try at the same step costs one more, up to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step landed at a cost rises, but the backlash harms as a light blow with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A failed step does not rise, and the backlash harms as a solid blow with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step failed by more than eight cracks the core, a lasting condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mortal may train her body with no mana, and gains strength but no step.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No dice, steps or numbers show in the prose, save what the System shows her.",
    },
  ],
} as const satisfies WorldCheck
