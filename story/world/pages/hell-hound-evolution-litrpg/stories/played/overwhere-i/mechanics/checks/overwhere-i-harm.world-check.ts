import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIHarm = {
  id: "01a0ed23-989a-7b30-981f-4ddfdf312eff",
  type: "page-type/world-check",
  slug: "overwhere-i-harm",
  title: "Harm",
  world: "world/hell-hound-evolution-litrpg",
  definition: "how much harm a blow that landed in Overwhere I deals, and the wound it leaves",
  description: "How badly a blow, bite, burn or fall hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an action check has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, crushing eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A starfall blow is a Surge blast: twelve at legacy rank one, four more each rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Fists, thrown stones and small bites are light; a club, knife or dog's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sword, a spear's thrust, a wolf's jaws or a fall of twenty feet is heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A war-axe's full swing, a bear's maul or a great beast's charge is crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward is nought for bare skin, two for leather, four for mail, eight for plate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one, unless a floor holds it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is taken from the health a character has left, as its health page holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "When an ordinary foe strikes Nala, the reading carries a floor of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor holds the health left at or above it, and a floor above it is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ordinary foe's blow takes Nala below one health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At one health she is beaten, knocked down or driven off, never killed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe far beyond her, faced with open eyes, strikes her with no floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought health anyone else is down and dying.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Above three quarters left is whole, then scraped, hurt to a quarter, grievous, down at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hurt costs one on every act, and grievous costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settled by `akasha story settle --story overwhere-i --check overwhere-i-harm`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"force":"heavy","landed":"success","left":40,"maxHealth":40,"floor":1}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A starfall reading names the legacy rank as `rank`, and a worn ward as `ward`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's most health, and what a rise in it adds, is as the action check states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary beast has 10 to 40 health; an ordinary fighter 30 to 60.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone else at nought is down and dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A third of most health lost to one blow leaves a wound that lasts until healed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour of rest gives back a tenth of most health; a night's sleep gives back half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healer's care or a potion gives back what its own page says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No health shows as a number save where her status shows it.",
    },
  ],
} as const satisfies WorldCheck
