import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import {
  SETS_DROP_MECHANIC_ANTIQUITIES,
  SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_ARENA_STAGE_CHEST,
  SETS_DROP_MECHANIC_BATTLEGROUND_REWARD,
  SETS_DROP_MECHANIC_BATTLEGROUND_VENDOR,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_BRUMA,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL_CHORROL_WEYNON_PRIORY,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_CHORROL_WEYNON_PRIORY,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_CROPSFORD,
  SETS_DROP_MECHANIC_CITY_CYRODIIL_VLASTARUS,
  SETS_DROP_MECHANIC_CRAFTED,
  SETS_DROP_MECHANIC_CYRODIIL_BOARD_MISSIONS,
  SETS_DROP_MECHANIC_DAILY_QUEST_REWARD_COFFER,
  SETS_DROP_MECHANIC_DOLMEN_HARROWSTORM_MAGICAL_ANOMALIES,
  SETS_DROP_MECHANIC_DUNGEON_CHEST,
  SETS_DROP_MECHANIC_ENDLESS_ARCHIVE,
  SETS_DROP_MECHANIC_FISHING_HOLE,
  SETS_DROP_MECHANIC_GOLDEN_PURSUIT,
  SETS_DROP_MECHANIC_GROUP_DUNGEON_BOSS,
  SETS_DROP_MECHANIC_HARVEST_NODES,
  SETS_DROP_MECHANIC_IMPERIAL_CITY_TREASURE_TROVE_SCAMP,
  SETS_DROP_MECHANIC_IMPERIAL_CITY_VAULTS,
  SETS_DROP_MECHANIC_LEVEL_UP_REWARD,
  SETS_DROP_MECHANIC_MAIL_DAILY_RANDOM_DUNGEON_REWARD,
  SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY,
  SETS_DROP_MECHANIC_MOB_TYPE,
  SETS_DROP_MECHANIC_MONSTER_NAME,
  SETS_DROP_MECHANIC_NIGHT_MARKET,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON,
  SETS_DROP_MECHANIC_OVERLAND_CHEST,
  SETS_DROP_MECHANIC_OVERLAND_LOOT,
  SETS_DROP_MECHANIC_OVERLAND_OBLIVION_PORTAL_FINAL_CHEST,
  SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS,
  SETS_DROP_MECHANIC_PUBLIC_DUNGEON_CHEST,
  SETS_DROP_MECHANIC_REWARD_BY_NPC,
  SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_TRIAL_BOSS,
  SETS_DROP_MECHANIC_ZONE_STORYLINE,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-dropmechanics/sets-const-dropmechanics.module.code.ts"
import {
  SETS_SETTYPE_ARENA,
  SETS_SETTYPE_BATTLEGROUND,
  SETS_SETTYPE_CLASS,
  SETS_SETTYPE_CRAFTED,
  SETS_SETTYPE_CYRODIIL,
  SETS_SETTYPE_CYRODIIL_MONSTER,
  SETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD,
  SETS_SETTYPE_DUNGEON,
  SETS_SETTYPE_IMPERIALCITY,
  SETS_SETTYPE_IMPERIALCITY_MONSTER,
  SETS_SETTYPE_MONSTER,
  SETS_SETTYPE_MYTHIC,
  SETS_SETTYPE_OVERLAND,
  SETS_SETTYPE_SPECIAL,
  SETS_SETTYPE_TRIAL,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-settype-ids/sets-const-settype-ids.module.code.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const checkIfPTSAPIVersionIsLive = lib.checkIfPTSAPIVersionIsLive

const clientLocalization = asPresent(lib.localization[lib.clientLang])

const DROP_MECHANIC_ID_TO_TEXTURE: { [dropMechanicId: number]: string } = {
  [SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY]: "/esoui/art/chatwindow/chat_mail_up.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_BRUMA]: "/esoui/art/icons/mapkey/mapkey_avatown.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_CROPSFORD]: "/esoui/art/icons/mapkey/mapkey_avatown.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_VLASTARUS]: "/esoui/art/icons/mapkey/mapkey_avatown.dds",
  [SETS_DROP_MECHANIC_ARENA_STAGE_CHEST]: "/esoui/art/icons/undaunted_dungeoncoffer.dds",
  [SETS_DROP_MECHANIC_MONSTER_NAME]: "/esoui/art/icons/quest_head_monster_014.dds",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE]: "/esoui/art/zonestories/completiontypeicon_delve.dds",
  [SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS]: "/esoui/art/icons/mapkey/mapkey_groupboss.dds",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON]: "/esoui/art/journal/journal_quest_dungeon.dds",
  [SETS_DROP_MECHANIC_OVERLAND_CHEST]: "/esoui/art/icons/undaunted_smallcoffer.dds",
  [SETS_DROP_MECHANIC_BATTLEGROUND_REWARD]:
    "/esoui/art/battlegrounds/battlegrounds_tabicon_battlegrounds_up.dds",
  [SETS_DROP_MECHANIC_MAIL_DAILY_RANDOM_DUNGEON_REWARD]: "/esoui/art/icons/quest_letter_001.dds",
  [SETS_DROP_MECHANIC_IMPERIAL_CITY_VAULTS]:
    "/esoui/art/icons/servicemappins/ic_monstrousteeth_complete.dds",
  [SETS_DROP_MECHANIC_LEVEL_UP_REWARD]: "/esoui/art/menubar/menubar_levelup_up.dds",
  [SETS_DROP_MECHANIC_ANTIQUITIES]: "/esoui/art/hud/gamepad/gp_loothistory_icon_antiquities.dds",
  [SETS_DROP_MECHANIC_BATTLEGROUND_VENDOR]: "/esoui/art/icons/quest_container_001.dds",
  [SETS_DROP_MECHANIC_CRAFTED]: "/esoui/art/zonestories/completiontypeicon_setstation.dds",
  [SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT]: "/esoui/art/tutorial/loot_telvarbag.dds",
  [SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT]:
    "/esoui/art/lfg/lfg_indexicon_alliancewar_up.dds",
  [SETS_DROP_MECHANIC_REWARD_BY_NPC]: "/esoui/art/icons/achievement_u26_skyrim_mainquest_3.dds",
  [SETS_DROP_MECHANIC_OVERLAND_OBLIVION_PORTAL_FINAL_CHEST]:
    "/esoui/art/icons/achievement_u30_obliviongate.dds",
  [SETS_DROP_MECHANIC_DOLMEN_HARROWSTORM_MAGICAL_ANOMALIES]:
    "/esoui/art/icons/mapkey/mapkey_u26_harrowstorm_complete.dds",
  [SETS_DROP_MECHANIC_DUNGEON_CHEST]: "/esoui/art/icons/housing_alt_fur_treasurechest001.dds",
  [SETS_DROP_MECHANIC_DAILY_QUEST_REWARD_COFFER]:
    "/esoui/art/icons/achievements_indexicon_quests_up.dds",
  [SETS_DROP_MECHANIC_FISHING_HOLE]: "/esoui/art/treeicons/achievements_indexicon_fishing_up.dds",
  [SETS_DROP_MECHANIC_OVERLAND_LOOT]: "/esoui/art/icons/housing_cre_exc_minlootpile001.dds",
  [SETS_DROP_MECHANIC_TRIAL_BOSS]:
    "/esoui/art/treeicons/gamepad/gp_reconstruction_tabicon_trialgroup.dds",
  [SETS_DROP_MECHANIC_MOB_TYPE]: "/esoui/art/icons/pet_slateskinneddaedrat.dds",
  [SETS_DROP_MECHANIC_GROUP_DUNGEON_BOSS]: "/esoui/art/journal/journal_quest_group_instance.dds",
  [SETS_DROP_MECHANIC_PUBLIC_DUNGEON_CHEST]: "/esoui/art/icons/undaunted_mediumcoffer.dds",
  [SETS_DROP_MECHANIC_HARVEST_NODES]: "/esoui/art/crafting/smithing_tabicon_refine_up.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL]: "/esoui/art/icons/poi/poi_town_complete.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_CHORROL_WEYNON_PRIORY]:
    "/esoui/art/icons/poi/poi_town_complete.dds",
  [SETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL_CHORROL_WEYNON_PRIORY]:
    "/esoui/art/icons/poi/poi_town_complete.dds",
  [SETS_DROP_MECHANIC_CYRODIIL_BOARD_MISSIONS]:
    "/esoui/art/icons/housing_gen_lsb_announcementboard001.dds",
  [SETS_DROP_MECHANIC_IMPERIAL_CITY_TREASURE_TROVE_SCAMP]:
    "/esoui/art/icons/achievement_ic_treasurescamp.dds",
  [SETS_DROP_MECHANIC_ENDLESS_ARCHIVE]: "/esoui/art/icons/poi/poi_endlessdungeon_incomplete.dds",
  [SETS_DROP_MECHANIC_GOLDEN_PURSUIT]: "/esoui/art/lfg/lfg_indexicon_promotionalevents_up.dds",
  [SETS_DROP_MECHANIC_NIGHT_MARKET]: "/esoui/art/treeicons/nightmarket_down.dds",
  [SETS_DROP_MECHANIC_ZONE_STORYLINE]: "/esoui/art/journal/gamepad/gp_questtypeicon_zonestory.dds",
}
lib.dropMechanicIdToTexture = DROP_MECHANIC_ID_TO_TEXTURE

if (checkIfPTSAPIVersionIsLive()) {
}

const SET_TYPE_TO_TEXTURE: { [key: string]: string } = {
  [SETS_SETTYPE_ARENA]: "/esoui/art/treeicons/gamepad/gp_reconstruction_tabicon_arenasolo.dds",
  [SETS_SETTYPE_BATTLEGROUND]:
    "/esoui/art/battlegrounds/battlegrounds_tabicon_battlegrounds_up.dds",
  [SETS_SETTYPE_CRAFTED]: "/esoui/art/zonestories/completiontypeicon_setstation.dds",
  [SETS_SETTYPE_CYRODIIL]: "/esoui/art/lfg/gamepad/lfg_activityicon_cyrodiil.dds",
  [SETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: "/esoui/art/lfg/gamepad/gp_lfg_menuicon_random.dds",
  [SETS_SETTYPE_DUNGEON]: "/esoui/art/lfg/gamepad/lfg_activityicon_normaldungeon.dds",
  [SETS_SETTYPE_IMPERIALCITY]: "/esoui/art/mappins/ava_imperialcity_neutral.dds",
  [SETS_SETTYPE_MONSTER]: "/esoui/art/icons/quest_head_monster_014.dds",
  [SETS_SETTYPE_OVERLAND]: "/esoui/art/icons/undaunted_smallcoffer.dds",
  [SETS_SETTYPE_SPECIAL]: "/esoui/art/tutorial/campaignbrowser_indexicon_specialevents_up.dds",
  [SETS_SETTYPE_TRIAL]: "/esoui/art/treeicons/gamepad/gp_reconstruction_tabicon_trialgroup.dds",
  [SETS_SETTYPE_MYTHIC]: "/esoui/art/icons/antiquities_u30_mythic_ring02.dds",
  [SETS_SETTYPE_IMPERIALCITY_MONSTER]: "/esoui/art/icons/quest_head_monster_012.dds",
  [SETS_SETTYPE_CYRODIIL_MONSTER]: "/esoui/art/icons/quest_head_monster_011.dds",
  [SETS_SETTYPE_CLASS]: "/esoui/art/icons/poi/poi_endlessdungeon_incomplete.dds",
  ["vet_dung"]: "/esoui/art/lfg/gamepad/lfg_activityicon_veterandungeon.dds",
  ["undaunted chest"]: "/esoui/art/icons/housing_uni_con_undauntedchestsml001.dds",
}
lib.setTypeToTexture = SET_TYPE_TO_TEXTURE

const SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR: { [key: string]: unknown } = {
  [SETS_SETTYPE_ARENA]: clientLocalization.dropZoneArena,
  [SETS_SETTYPE_BATTLEGROUND]: clientLocalization.dropZoneBattleground,
  [SETS_SETTYPE_CRAFTED]: clientLocalization.dropZoneCrafted,
  [SETS_SETTYPE_CYRODIIL]: clientLocalization.dropZoneCyrodiil,
  [SETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: clientLocalization.dropZoneMail,
  [SETS_SETTYPE_DUNGEON]: clientLocalization.dropZoneDungeon,
  [SETS_SETTYPE_IMPERIALCITY]: clientLocalization.dropZoneArena,
  [SETS_SETTYPE_MONSTER]: clientLocalization.dropZoneMonster,
  [SETS_SETTYPE_OVERLAND]: clientLocalization.dropZoneOverland,
  [SETS_SETTYPE_SPECIAL]: clientLocalization.dropZoneSpecial,
  [SETS_SETTYPE_TRIAL]: clientLocalization.dropZoneTrial,
  [SETS_SETTYPE_MYTHIC]: clientLocalization.dropZoneMythic,
  [SETS_SETTYPE_IMPERIALCITY_MONSTER]: clientLocalization.dropZoneImperialCity,
  [SETS_SETTYPE_CYRODIIL_MONSTER]: clientLocalization.dropZoneCyrodiil,
  [SETS_SETTYPE_CLASS]: clientLocalization.dropZoneEndlessArchive,
  ["vet_dung"]: clientLocalization.dropZoneDungeon,
}
lib.setTypeToDropZoneLocalizationStr = SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR

const POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED: { [category: string]: string } = {
  star: "EsoUI/Art/Collections/Favorite_StarOnly.dds",
  tank: "/esoui/art/inventory/inventory_tabicon_1handed_up.dds",
  stamDD: "/esoui/art/icons/store_staminapotion_001.dds",
  magDD: "/esoui/art/icons/store_magickadrink_001.dds",
  stamHeal: "/esoui/art/icons/alchemy/crafting_poison_trait_increasehealing.dds",
  magHeal: "/esoui/art/icons/alchemy/crafting_alchemy_trait_restorehealth_match.dds",
  hybrid: "/esoui/art/icons/crowncrate_staminahealth_drink.dds",
  PVPTank: "/esoui/art/progression/health_points_frame.dds",
  PVPStamDD: "/esoui/art/progression/stamina_points_frame.dds",
  PVPMagDD: "/esoui/art/progression/magicka_points_frame.dds",
  PVPStamHeal: "/esoui/art/icons/ability_healer_035.dds",
  PVPMagHeal: "/esoui/art/icons/ability_healer_024.dds",
  PVPHybrid: "/esoui/art/icons/ability_healer_029.dds",
  farm: "/esoui/art/inventory/inventory_tabicon_crafting_up.dds",
  sneak: "/esoui/art/icons/ability_legerdemain_improvedsneak.dds",
  bow: "/esoui/art/progression/icon_bows.dds",
  dualWield: "/esoui/art/progression/icon_dualwield.dds",
  twoHand: "/esoui/art/progression/icon_2handed.dds",
  frostStaff: "/esoui/art/progression/icon_icestaff.dds",
  fireStaff: "/esoui/art/progression/icon_firestaff.dds",
  lightningStaff: "/esoui/art/progression/icon_lightningstaff.dds",
}
lib.possibleSetSearchFavoriteCategoriesUnsorted = POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED

const POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_FOR_SORT: string[] = [
  "star",
  "tank",
  "stamDD",
  "magDD",
  "stamHeal",
  "magHeal",
  "hybrid",
  "PVPTank",
  "PVPStamDD",
  "PVPMagDD",
  "PVPStamHeal",
  "PVPMagHeal",
  "PVPHybrid",
  "farm",
  "sneak",
  "bow",
  "dualWield",
  "twoHand",
  "frostStaff",
  "fireStaff",
  "lightningStaff",
]
const POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_SORTED: {
  category: string
  categoryName: unknown
  texture: string
}[] = []
for (const [index, setSearchFavoriteCategory] of ipairs(
  POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_FOR_SORT
)) {
  POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_SORTED[index - 1] = {
    category: setSearchFavoriteCategory,
    categoryName: clientLocalization[setSearchFavoriteCategory],
    texture: asPresent(POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED[setSearchFavoriteCategory]),
  }
}
lib.possibleSetSearchFavoriteCategories = POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_SORTED
