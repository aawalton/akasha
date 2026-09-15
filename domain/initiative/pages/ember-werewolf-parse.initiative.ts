import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberWerewolfParse = {
  id: "01a090d2-f75d-7a2d-98e2-136f0cae87ed",
  type: "initiative",
  slug: "ember-werewolf-parse",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Three-Color Stalker's parse gear is enchanted.",
      workingMemory:
        "The seven armour pieces each take a gold Glyph of Stamina. The Savage Werewolf necklace and ring each take a gold Glyph of Increase Physical Harm. The main-hand mace takes a Glyph of Poison and the off-hand mace a Glyph of Flame. The Shattered Paths Signet is a mythic in Triune and is worn as it is.",
    },
    {
      statement: "Three-Color Stalker wears the full Update 50 Savage Werewolf parse setup.",
      workingMemory:
        "The twelve slots are a Medium Divines Slimecraw head, Medium Divines Savage Werewolf shoulders, five Light Divines Order's Wrath body pieces, an Infused Savage Werewolf necklace and ring, the Shattered Paths Signet, and two Charged Savage Werewolf maces. The gold Slimecraw mask and the Signet are already in the ESO Plus bank. This is the guide's No Trial Gear variant, which sims 176.7k. An inventory capture after equipping shows this done; the last is from 29 August.\n",
    },
    {
      statement: "Three-Color Stalker's bar, masteries and Champion Points are the werewolf setup.",
      workingMemory:
        "One bar and no weapon swap: Feral Carnage, Hircine's Rage, Ferocious Roar, Bloody Gnash and Bloodclaws under Werewolf Berserker. Class Mastery rather than subclassing, taking An Eye for Exploitation and Above and Beyond. Warfare takes Wrathful Strikes, Fighting Finesse, Deadly Aim and Master-at-Arms. Fitness takes Boundless Vitality, Fortified, Rejuvenation and Celerity. The Thief, and 64 Stamina. The bar and Champion Points sit only inside buildHash, which the importer discards.\n",
    },
    {
      statement: "Three-Color Stalker parses 135,000 or more on the trials dummy.",
      workingMemory:
        "The Update 50 figures on the 21 million Iron Atronach are 176.7k for this setup and 150.4k for crafted-only, both on Nightblade, the strongest werewolf class. They come from a simulator assuming every light attack lands and bash weaving, so a real parse falls short, and the margin over 135k is why the farmed setup is worth the runs. Food is Braised Rabbit with Spring Vegetables, and potions are Armor from Bugloss, Mountain Flower and Mudcrab Chitin.",
    },
  ],
  constraints: [
    "Update 50 is live, and Update 51 lands on 28 September 2026 repricing every werewolf ability, so this build shifts under the work.",
    "Werewolf form carries only the six werewolf abilities, so Moon Hunter Keep is run in human form, where Precognition answers Mylenne Moon-Caller's pounce.",
    "Savage Werewolf binds on pickup and drops only in Moon Hunter Keep, which is Wolfhunter content.",
    "CombatMetrics and TemperCombat both hook combat events, so one is off before a parse is trusted.",
  ],
} as const satisfies Initiative
