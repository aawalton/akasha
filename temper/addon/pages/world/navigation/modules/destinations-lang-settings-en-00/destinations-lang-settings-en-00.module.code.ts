import { achievementName } from "akasha/temper/addon/pages/world/navigation/modules/destinations-data-runtime/destinations-data-runtime.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const SETTINGS_STRINGS_00: Record<string, string> = {
  SI_TEMPER_DESTINATIONS_COMMANDS: "Destinations commands list:",
  SI_TEMPER_DESTINATIONS_COMMAND_DHLP: "/dhlp (Destinations Help) : You just used it ;)",
  SI_TEMPER_DESTINATIONS_COMMAND_DSET:
    "/dset (Destinations Settings) : Opens the Destinations Settings window.",
  SI_TEMPER_DESTINATIONS_FILTER_AYLEID: "(Dest) Ayleid Wells",
  SI_TEMPER_DESTINATIONS_FILTER_BORDER: "(Dest) Craglorn Border Line",
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL: "(Dest) " + zo_strformat(achievementName(1247)),
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL_DONE:
    "(Dest) " + zo_strformat(achievementName(1247)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING: "(Dest) " + zo_strformat(achievementName(1349)),
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING_DONE:
    "(Dest) " + zo_strformat(achievementName(1349)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION: "(Dest) Dungeon Champions",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION_DONE: "(Dest) Dungeon Champions Done",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE: "(Dest) Collectibles Pins",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE_DONE: "(Dest) Collectibles Done",
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE: "(Dest) " + zo_strformat(achievementName(1383)),
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE_DONE:
    "(Dest) " + zo_strformat(achievementName(1383)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_DEADLANDS_ENTRANCE: "(Dest) Deadlands Entrance",
  SI_TEMPER_DESTINATIONS_FILTER_DWEMER: "(Dest) Dwemer Ruins",
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS: "(Dest) " + zo_strformat(achievementName(1121)),
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS_DONE:
    "(Dest) " + zo_strformat(achievementName(1121)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING: "(Dest) Fishing Pins",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING_DONE: "(Dest) Fishing Done",
  SI_TEMPER_DESTINATIONS_FILTER_HIGHISLE_DRUIDICSHRINE: "(Dest) Druidic Shrine",
  SI_TEMPER_DESTINATIONS_FILTER_KNOWN: "(Dest) Known POIs",
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ: "(Dest) " + zo_strformat(achievementName(872)),
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ_DONE: "(Dest) " + zo_strformat(achievementName(872)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER: "(Dest) " + zo_strformat(achievementName(406)),
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER_DONE:
    "(Dest) " + zo_strformat(achievementName(406)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME: "(Dest) " + zo_strformat(achievementName(704)),
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME_DONE:
    "(Dest) " + zo_strformat(achievementName(704)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER: "(Dest) Other Achievements",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER_DONE: "(Dest) Other Achievements Done",
  SI_TEMPER_DESTINATIONS_FILTER_PATRON: "(Dest) " + zo_strformat(achievementName(1316)),
  SI_TEMPER_DESTINATIONS_FILTER_PATRON_DONE:
    "(Dest) " + zo_strformat(achievementName(1316)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER: "(Dest) " + zo_strformat(achievementName(716)),
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER_DONE:
    "(Dest) " + zo_strformat(achievementName(716)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER: "(Dest) " + zo_strformat(achievementName(1250)),
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER_DONE:
    "(Dest) " + zo_strformat(achievementName(1250)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_UNKNOWN: "(Dest) Unknown POIs",
  SI_TEMPER_DESTINATIONS_FILTER_VAMPIRE_ALTAR: "(Dest) Vampire Alters",
  SI_TEMPER_DESTINATIONS_FILTER_WEREWOLF_SHRINE: "(Dest) Werewolf Shrines",
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER: "(Dest) " + zo_strformat(achievementName(1331)),
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER_DONE:
    "(Dest) " + zo_strformat(achievementName(1331)) + " Done",
  SI_TEMPER_DESTINATIONS_FILTER_WWVAMP: "(Dest) Werewolfs and Vampires",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_DIST: "Pin distance on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_TOGGLE: "Show Achievements on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_PIN_LAYER: "Pin layer for all Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BRAWL_HEADER: "One Last Brawl",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BREAKING_HEADER: "Breaking and Entering",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE: "Zone pin to Front",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT:
    "This will toggle if ZONE pins (if active) should be shown in front of dungeon pins or not",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_HEADER: "Dungeon Champions",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_SIZE: "Pin size for Dungeon Champions",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE: "Show on Zone Maps",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE_TT:
    "This is for turning Champions (solo dungeons bosses) on/off on ZONE MAPS",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CUTPURSE_HEADER: "A Cutpurse Above",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_EARTHLYPOS_HEADER: "Earthly Possessions",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER: "Achievement Positions - Global settings",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER_TT:
    "This submenu covers the Global Achievement settings",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER: "Achievement Positions",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER_TT:
    "This submenu covers most of the achievements in the game (too many to list here)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_MAIQ_HEADER: "I Like M'aiq",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_NOSEDIVER_HEADER: "Nose Diver",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ON_ME_HEADER: "This One's on Me",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_OTHER_HEADER: "Lightbringer, Give to the Poor and Crime Pays",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PATRON_HEADER: "Orsinium Patron",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PEACEMAKER_HEADER: "Peacemaker",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE: "Pin color (completed)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE_TT:
    "Affects the PIN color of complete Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS: "Pin color (incomplete)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS_TT:
    "Affects the PIN color of incomplete Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_SIZE: "Pin size for Achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_STYLE: "Pin style for Achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE: "Show incomplete Achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE_DONE: "Show completed Achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_RELIC_HUNTER_HEADER: "Wrothgar Master Relic Hunter",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE: "Pin text color (completed)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE_TT:
    "Affects the pin TEXT of complete Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS: "Pin text color (incomplete)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS_TT:
    "Affects the pin TEXT of incomplete Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER: "Wrothgar Cliff Jumper",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLORS_HEADER: "Collectible pin colors ",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE: "Completed text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE_TT:
    "Affects the pin TEXT for completed Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE: "Header title text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE_TT:
    "Affects the title of the Collectibles achievement text",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE: "Missing text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE_TT:
    "Affects the pin TEXT for missing Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST: "Distance on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST_TT:
    "Distance for Collectibles areas on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE: "Show on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE_TT: "Show Collectibles on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE: "Show completed Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE_TT: "Show completed Collectibles areas",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER: "Collectible Positions",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER_TT:
    "This submenu covers all Collectibles related settings.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_MISC_HEADER: "Misc",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR: "Missing pin color",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE: "Completed pin color",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE_TT:
    "Sets the color of the PINS for completed collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_TT:
    "Sets the color of the PINS for missing collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER: "Pin layer for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER_TT: "Pin layer for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE: "Pin size for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE_TT: "Pin size for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_STYLE: "Pin style for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM: "Show item names on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM_TT:
    "Shows the name of the items needed to complete the achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME: "Show mob names on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME_TT:
    "Shows the names of the monsters (in english at the moment) that can drop the items needed to complete the achievement",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SUBHEADER: "Collectible Settings",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE: "Show incomplete Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE_TT:
    "Shows areas where beasts can be killed to collect collectibles for achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE: "Completed Bait type text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE_TT:
    "Affects the pin BAIT text for completed Fish, if activated",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE: "Missing Bait type text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE_TT:
    "Affects the pin BAIT text for missing Fish, if activated",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE: "Completed text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE_TT: "Affects the pin TEXT for completed Fish",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_HEADER: "Fishing Pin Colors",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE: "Achievement title text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE_TT:
    "Affects the title of the Fishing achievement text",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE: "Missing text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE_TT: "Affects the pin TEXT for missing Fish",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE: "Completed Water type text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE_TT:
    "Affects the pin WATER text for completed Fish, if activated",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE: "Missing Water type text color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE_TT:
    "Affects the pin WATER text for missing Fish, if activated",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST: "Distance on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST_TT: "Distance for Fishing Holes on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE: "Show on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE_TT: "Show Fishing Holes on compass",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE: "Show completed positions",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE_TT: "Show completed Fishing Holes positions",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER: "Fishing Positions",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER_TT:
    "This submenu covers all Fishing related settings.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_MISC_HEADER: "Misc",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR: "Missing pin color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE: "Completed pin color",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE_TT:
    "Sets the color of the PINS for collected Fish",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_TT:
    "Sets the color of the PINS for missing Fish",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER: "Pin layer for Fishing",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER_TT: "Pin layer for Fishing",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_SIZE: "Pin size for Fishing",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_SIZE_TT: "Pin size for Fishing",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_STYLE: "Pin style for Fishing",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_TEXT_HEADER: "Fishing Pin Text",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT: "Show optimal bait on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT_LEFT: "Show bait left on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT_LEFT_TT:
    "Shows how much bait of the optimal types you have left in the bag. IF there is a third number, then that is the Simple Bait",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT_TT: "Shows the optimal bait to use",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_FISHNAME: "Show fish names on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_FISHNAME_TT:
    "Shows the missing fish for that type of water",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_WATER: "Show water type on pins",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_WATER_TT: "Shows the type of water",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SUBHEADER: "Fishing Settings",
}
