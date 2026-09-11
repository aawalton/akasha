import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const emberWerewolfParse = {
  id: "01a090d2-f75d-7a2d-98e2-136f0cae87ed",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "ember-werewolf-parse",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement: "Three-Color Stalker wears the full Update 50 Savage Werewolf parse setup.",
      workingMemory:
        "Shoulders, necklace and ring are farmed. One one-handed weapon is still owed; the second is reconstructed from the set collection rather than farmed, reconstruction being per weapon type. The gold Medium Divines Slimecraw head and the Shattered Paths Signet are in the bank. Five Order's Wrath Light body pieces are crafted at Steadfast Hammer and Saw on High Isle. Armour is Divines with Stamina glyphs, jewellery Infused with Increase Physical Harm, weapons Charged with Poison and Flame.",
    },
    {
      statement: "Three-Color Stalker's bar, masteries and Champion Points are the werewolf setup.",
      workingMemory:
        "One bar and no weapon swap: Feral Carnage, Hircine's Rage, Ferocious Roar, Bloody Gnash and Bloodclaws under Werewolf Berserker. Class Mastery rather than subclassing, taking An Eye for Exploitation and Above and Beyond over Assassination, Shadow and Siphoning. Warfare takes Wrathful Strikes, Fighting Finesse, Deadly Aim and Master-at-Arms, which the guide sims for Khajiit in place of Backstabber. Fitness takes Boundless Vitality, Fortified, Rejuvenation and Celerity. The Thief, and 64 Stamina.",
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
