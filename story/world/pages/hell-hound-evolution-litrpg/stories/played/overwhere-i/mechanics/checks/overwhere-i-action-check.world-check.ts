import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIActionCheck = {
  id: "01a0ed21-5ed8-7476-8439-ac8b7d7e371d",
  type: "page-type/world-check",
  slug: "overwhere-i-action-check",
  title: "Action Check",
  world: "world/hell-hound-evolution-litrpg",
  definition: "whether a declared act in Overwhere I comes off, and how well",
  description: "Whether an attempt in doubt succeeds, and how well.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every act whose outcome is in doubt and matters is settled here, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that is sure, trivial or harmless to fail is told with no roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is picked from the fiction before the roll, never after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act clearing its target by five or more comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by four or less comes off at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the situation worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cost is a real price: hurt, lost time, noise, a lost thing, a worse position or a bad name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stat an act leans on adds minus one under 10, nought to 19, one to 29, two to 39.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That stat adds three from 40 and four from 50.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Strength is for force, Dexterity for deftness and speed, Vigor for bearing strain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Attunement is for working the elements and mana, Luck for chance and fortune's turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting skill adds one at levels one to three, two at four to six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting skill adds three at levels seven to nine and four at ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting tool, a plan using a weakness, help or preparation adds one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill adds to an act only once the System has granted it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act Starfall Surge powers against a foe from her level to ten above is two bands easier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such an act also adds her Starfall Legacy rank as a bonus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Surge strike on an ordinary beast or person of this region, level 15 or under, is easy at worst.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "No band is easier than easy, and a band harder than extreme stays extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A failed act against an ordinary foe costs position, time, gear, pride or a wound.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No failed act against an ordinary foe costs Nala her life.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foe twenty or more levels above her, or one Analyze shows as ??, is far beyond her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every act against a foe far beyond her is extreme, Surge or no Surge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Before she commits against a foe far beyond her, the game master shows her the danger plainly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a choice made with open eyes against a foe far beyond her puts her life at stake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's unfamiliar body costs one on bodily acts her first three days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, thirst, cold and want of sleep cost what the needs and harm say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe's attack is settled as her act to dodge, block or turn it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands is then settled by the harm check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Settled by `akasha story settle --story overwhere-i --check overwhere-i-action-check`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"band":"easy","bonuses":[{"from":"legacy rank","by":1}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome is told as the roll answered it, never softened to save the scene.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No die, band, bonus or margin appears in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill spends the mana its own page names each time it is used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's most health is thirty-five, and five more for each level she has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most mana is four for each point of Attunement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most stamina is three for each point of Vigor, and three more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rise in most health, mana or stamina adds the same amount at once to what is left.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing else a level gives fills health, mana or stamina.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana comes back at a tenth of most mana every ten minutes, resting or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill with too little mana left for it cannot be used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sprint, a climb, a fight or a heavy lift spends stamina: one to five a scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought stamina every bodily act is a band harder until she rests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A few minutes' rest gives back five stamina; a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change in mana or stamina is written with a line of its history.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No mana or stamina shows as a number save where her status shows it.",
    },
  ],
} as const satisfies WorldCheck
