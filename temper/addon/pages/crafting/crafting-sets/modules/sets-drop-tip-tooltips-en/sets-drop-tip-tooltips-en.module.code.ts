import {
  SETS_DROP_MECHANIC_ANTIQUITIES,
  SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON,
  SETS_DROP_MECHANIC_OVERLAND_CHEST,
  SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS,
  SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_TRIAL_BOSS,
  SETS_DROP_MECHANIC_ZONE_STORYLINE,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-dropmechanics/sets-const-dropmechanics.module.code.ts"
import { cyrodiilAndBattlegroundText } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-drop-tip-shared-text/sets-drop-tip-shared-text.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings/eso-lib-sets-strings.type-declaration.d.ts"

export const EN = {
  [SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY]:
    "Rewards for the worthy (" +
    cyrodiilAndBattlegroundText +
    " mail) - Contains only newest item sets!\nAs new sets continue to get added, older sets will be removed here and added into other Cyrodiil sources:\nAll PvP item sets will now drop from Cyrodiil delves, dolmens and board missions.\nTown Daily Quest and Merchants will be divided by Light, Medium and Heavy. Exception: Cheydinhal and Chorrol/Weynon Priory reward any set.\nAll PvP sets are available as individual containers on both Town Merchants and Elite Gear Vendors.\nDelves will drop waist and feet item sets\nDolmens will drop jewelry\nBoard Missions will drop all other armor pieces.\nBounty and Scout missions will award armor pieces.\nBattle and Warfront missions will reward weapon slot pieces.",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE]: "Delve bosses have a chance to drop a waist or feet.",
  [SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS]:
    "Overland group bosses have a 100% chance to drop head, chest, legs, or weapon.",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON]:
    "Public dungeon bosses have a chance to drop a shoulder, hand, or weapon.",
  [SETS_DROP_MECHANIC_OVERLAND_CHEST]:
    "Chests gained from defeating a Dark Anchor have a 100% chance to drop a ring or amulet.\nTreasure chests found in the world have a chance to grant any set piece that can drop in that zone:\n-Simple chests have a slight chance\n-Intermediate chests have a good chance\n-Advanced and Master chests have a guaranteed chance\n-Treasure chests found from a Treasure Map have a guaranteed chance",
  [SETS_DROP_MECHANIC_ANTIQUITIES]: GetString(SI_ANTIQUITY_TOOLTIP_TAG),
  [SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT]:
    "Chest that can be exchanged for TelVar Stones at a TelVar equipment vendor in your faction's base, in the Imperial City sewers.",
  [SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT]:
    "Chest that can be exchanged for Alliance Points at a elite gear lockbox merchant in Cyrodiil (Eastern Elsweyr Gate, Southern High Rock Gate, Northern Morrowind Gate), or a battleground merchant in Vvardenfell (Ald Carac, Foyada Quarry, Ularra)",
  [SETS_DROP_MECHANIC_TRIAL_BOSS]:
    "All bosses: Hands, Waist, Feet, Chest, Shoulder, Head, Legs\nFinal bosses: Weapon, Shield\nQuest reward containers: Jewelry, Weapon, Shield (Binds on pickup))",
  [SETS_DROP_MECHANIC_ZONE_STORYLINE]: "You can acquire it by going through the zone storyline",
}
