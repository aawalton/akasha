import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiHarm = {
  id: "01a0ea39-8ec3-7e39-afa7-037e617fa830",
  type: "page-type/world-check",
  slug: "otherwhere-viii-harm",
  title: "Harm",
  world: "world/breaker-of-horizons",
  definition: "how much harm a blow that landed in Otherwhere VIII deals, and the wound it leaves",
  description: "How badly a blow, bite, burn, bolt or fall hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an action check has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fists, a shove and a thrown stone are light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A club or knife, a student's bruising bolt and a fall of three metres are solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A police stave's bolt at full, a boar's tusk and a wolf's bite are heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fall of six metres is heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A military bolt, arcanic fire and a lightning sequence are savage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield-piercer or an incinerating sequence at full is crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fall of twelve metres is crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward is nought for bare skin, one for a heavy coat, three for a keyed pendant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A duelling shield wards five, and an agent's or arena shield seven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala has twenty health, and harm is taken from what she has left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Above fifteen left she is whole, then scraped, hurt to ten, grievous to one, down at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hurt costs one on every act, and grievous costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Down with danger present is a real loss, never softened to save the scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's rest restores two health, and tended wounds four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healer's sequence restores from six to all at once, as its tier says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose.",
    },
  ],
} as const satisfies WorldCheck
