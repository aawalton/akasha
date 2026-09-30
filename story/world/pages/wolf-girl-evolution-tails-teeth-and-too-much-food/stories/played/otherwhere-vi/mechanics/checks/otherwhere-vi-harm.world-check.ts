import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViHarm = {
  id: "01a0ea40-5673-7ad9-a1b6-0b2ea6041981",
  type: "page-type/world-check",
  slug: "otherwhere-vi-harm",
  title: "Harm",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition: "how much harm a blow that landed in Otherwhere VI deals",
  description: "How badly a blow that lands hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act has landed it, rolling two six-sided dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is the dice plus the blow's force and might, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one three, a heavy one seven, a crushing one fourteen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bare hands, a thrown stone, a rat's bite and a fall from head height strike light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A club, a boot, a wolf's or dog's bite, a boar's tusk and a horned rabbit strike solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blade, a spear, an arrow, a bear's claw and a long fall strike heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named monster's blow, a Tier 1 beast's full blow and a spell strike crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Might is one for each five of the striker's Strength.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weapon braced against a charge strikes with the charger's might, not the holder's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blunt staff so braced strikes solid and turns the charge; a sharpened one strikes heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds four, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to ten for stone hide or plate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her shirt and tights ward nought; leather wards two, mail four, beast plates six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wolf's fur wards one, a boar's hide two, and an Earthen Bear's stone hide six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The harm dealt is written off the struck one's HP page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "HP is a health page titled HP.",
    },
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
      statement:
        "A lasting injury is a wrench, deep gash, bad bite or break in the part the blow struck.",
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
      statement: "An hour of true rest gives back one HP; hunger or cold stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep fed and sheltered gives back a quarter of her maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A night's sleep hungry, chilled or worse gives back no HP; freezing still costs it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a healer's care double what rest gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Care doubles rest only where it tends the hurts that cost most of the HP lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's sleep by a fire, fed, counts as a night's sleep fed and sheltered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A share of HP, SP or MP that is not whole rounds down.",
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
} as const satisfies WorldCheck
