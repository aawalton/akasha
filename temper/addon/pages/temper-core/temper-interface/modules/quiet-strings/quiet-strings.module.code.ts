import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

export const STRINGS = {
  QUIET_AVA_HEADER: "AvA Messages",
  QUIET_AVA: "Blocking options:",
  QUIET_AVA_TOOLTIP:
    "Select how you want to handle AvA messages outside of the AvA world:\n|cFFFFFFnone|r - no changes to AvA messages\n|cFFFFFFchat message|r - messages are redirected to the chat\n|cFFFFFFsilent|r - messages are completely removed",
  QUIET_GROUPZONE_HEADER: "Group Area Mesages",
  QUIET_GROUPZONE: "Blocking options:",
  QUIET_GROUPZONE_TOOLTIP:
    "Select how you want to handle Group Area messages :\n|cFFFFFFnone|r - no changes to Group Area messages\n|cFFFFFFchat message|r - messages are redirected to the chat\n|cFFFFFFsilent|r - messages are completely removed",
  QUIET_FRIENDS_HEADER: "Friends Status Messages",
  QUIET_FRIENDS_ACTIVITY: "Block friends status alerts(will be applied after the reload UI)",
  QUIET_FRIENDS_ACTIVITY_TOOLTIP:
    "Block chat alerts when friend has logged on or out:\n- |cFFFFFF[@username] has logged on with [character]|r\n- |cFFFFFF[@username] has logged off with [character]|r",
  QUIET_TEXT_ALERTS_HEADER: "Text Alerts",
  QUIET_MOB_IMMUNE: 'Block "target immune" alerts',
  QUIET_SCREENSHOT: 'Block "screenshot saved" alerts',
  QUIET_SCREENSHOT_TOOLTIP:
    "Block alerts when you take a screenshot:\n- |cFFFFFFScreenshot saved as: <path>|r",
  QUIET_ENLIGHTENED: 'Block "enlightened" alert',
  QUIET_ENLIGHTENED_TOOLTIP:
    "Block enlightened alert when player is activated:\n- |cFFFFFFYou are enlightened|r",
  QUIET_CRAFTRESULT: "Block crafting result alerts",
  QUIET_REPAIR: "Block repair alerts",
  QUIET_REPAIR_TOOLTIP: "Block repair alerts:\n- |cFFFFFF<item> repaired.|r",
  QUIET_ALERT_THROTTLING: "Delay between the same alerts",
  QUIET_ALERT_THROTTLING_TOOLTIP: "Don't show the same alert more often then selected (seconds)",
  QUIET_SOUND_HEADER: "Sound Alerts",
  QUIET_ULTISOUND: 'Mute "ultimate ready" sound:',
  QUIET_ULTISOUND_TOOLTIP: 'Select when you want to mute "ultimate ready" sound.',
  QUIET_MARKET_ADS: "Hide market annoucement",
  QUIET_MARKET_ADS_TOOLTIP: "Hide market announcement when you log into the game.",
  QUIET_MAIL_HEADER: "Delete Mail dialog",
  QUIET_MAIL: 'Remove "Delete Mail" dialog',
  QUIET_MAIL_TOOLTIP: "Remove confirmation dialog when deleting empty mail.",
  QUIET_FENCE_HEADER: "Fence dialog",
  QUIET_FENCE: 'Remove "Can\'t buyback from fence" dialog',
  QUIET_FENCE_TOOLTIP: "Remove confirmation dialog when selling rare items to fence.",
  QUIET_GROUPS_HEADER: "Group dialogs",
  QUIET_GROUPS_DISBAND: 'Remove "Disband Group" dialog',
  QUIET_GROUPS_DISBAND_TOOLTIP: "Remove confirmation dialog when trying to disband a group.",
  QUIET_GROUPS_LARGE: 'Remove "Large group conversion" dialog',
  QUIET_GROUPS_LARGE_TOOLTIP: "Remove confirmation dialog when trying to create a large group.",
  QUIET_CRAFT_HEADER: "Crafting dialogs",
  QUIET_CRAFT: 'Remove "Attempt Item Improvement" dialog',
  QUIET_CRAFT_TOOLTIP: "Remove confirmation dialog when trying to improve an item.",
  QUIET_CHAMELEON_HEADER: "Crown Mimic Stones",
  QUIET_CHAMELEON: "Hide the Crown Mimic Stones checkbox",
  QUIET_CHAMELEON_TOOLTIP: "Hide the Crown Mimic Stones checkbox when you don't have any of them",
  QUIET_CHAT_HEADER: "Chat System Button",
  QUIET_CHAT: "Fade friends button",
  QUIET_CHAT_TOOLTIP: "Enable fade out for friend button above chat window.",
  QUIET_RETICLE_HEADER: "Reticle",
  QUIET_RETICLE_TAKE: "Disable reticle for insects",
  QUIET_RETICLE_TAKE_TOOLTIP: 'Disable the "Take" interaction for collecting butterflies, etc.',
  QUIET_EMPTY_INTERACT: "Disable interaction when the crate is empty",
  QUIET_EMPTY_INTERACT_TOOLTIP: "Disable the interaction text when the targetted crate is empty.",
  QUIET_NOREPORTONITEMS: 'Don\'t show "Get Help" entry for Items',
  QUIET_NOREPORTONITEMS_TOOLTIP:
    'Don\'t show "Get Help" entry for Items. This entry is used to report an item to ZOS.',
  QUIET_NOBINDALERT: "Don't warn when trying to equip a bindable item",
  QUIET_NOBINDALERT_TOOLTIP:
    "Disable the confirmation dilaog when trying to equip an item bind on equip",
  QUIET_NOPORTONLEADER: "Disable porting to group leader dialog",
  QUIET_NOPORTONLEADER_TOOLTIP:
    "Disable the dialog window inviting you to jump to the group leader position",
  QUIET_TAMRIEL: "Hide everything on Tamriel map",
  QUIET_TAMRIEL_TOOLTIP: "Don't show any icon on Tamriel map",
  QUIET_WAYSHRINES: "Wayshrines on Tamriel map",
  QUIET_WAYSHRINES_TOOLTIP: "Choose the behavior of Tamriel map for discovered Wayshrines",
  QUIET_DUNGEONS: "Dungeons on Tamriel map",
  QUIET_DUNGEONS_TOOLTIP: "Choose the behavior of Tamriel map for discovered Dungeons",
  QUIET_UNOWNED_HOUSES: "Unwowned Houses",
  QUIET_UNOWNED_HOUSES_TOOLTIP: "Choose the behavior of maps for ownowned Houses",
  QUIET_OWNED_HOUSES: "Owned Houses",
  QUIET_OWNED_HOUSES_TOOLTIP: "Choose the behavior of maps for owned Houses",
  QUIET_NOWRITQUESTS: "Don't show Writ quests automatically",
  QUIET_NOWRITQUESTS_TOOLTIP: "Don't show Writ quests automatically when looting a Master Writ",
  QUIET_GUILDS_HEADER: "Guild invites",
  QUIET_GUILDS: "Ignore guild invites",
  QUIET_GUILDS_TOOLTIP: "Ignore guild invites messages and notifications.",
  QUIET_GUILDSAPP: "Hide guild application notifications",
  QUIET_GUILDSAPP_TOOLTIP: "Hide the guild application notifications.",
  QUIET_GROSTER_HEADER: "Guild Roster Alerts",
  QUIET_GROSTER_HEADER_TOOLTIP: "Select how you want to handle guild roster alerts.",
  QUIET_GROSTER: "Blocking options:",
  QUIET_GROSTER_TOOLTIP:
    "Select how you want to handle guild roster alerts:\n|cFFFFFFnone|r - no changes\n|cFFFFFFchat message|r - alerts are redirected to the chat\n|cFFFFFFsilent|r - alerts are completely blocked",
  QUIET_RAIDSCORE_HEADER: "Raid Score Notifications",
  QUIET_RAIDSCORE_HEADER_TOOLTIP: "Select how you want to handle Raid Score notifications",
  QUIET_RAIDSCORE_ONLYFOR: "Show:",
  QUIET_RAIDSCORE_ONLYFOR_TOOLTIP:
    "Select when do you want to see Raid Score Notifications:\n|cFFFFFFalways|r - no changes to notification\n|cFFFFFFnever|r - block all Raid Score Notifications",
  QUIET_RAIDSCORE_REDIRECT: "Redirect notifications to the chat",
  QUIET_RAIDSCORE_ENDLESS: "Show Endless Archive notifications",
  QUIET_RAIDSCORE_SOUND: "Enable Notification Sound",
  QUIET_RAIDSCORE_SOUND_TOOLTIP:
    "This turns off/on the Notification Sound (Applies to anything that uses NEW_NOTIFICATION sound)",
  QUIET_MOTD_HEADER: "Guild MotD Notifications",
  QUIET_MOTD_HEADER_TOOLTIP: "Select how you want to handle Guild Message of the Day notifications",
  QUIET_MOTD_BLOCK: "Blocking options:",
  QUIET_MOTD_BLOCK_TOOLTIP:
    "Select how you want to handle Guild MotD Notifications:\n|cFFFFFFnone|r - no changes\n|cFFFFFFchat message|r - notifications are redirected to the chat\n|cFFFFFFsilent|r - notifications are completely blocked",
  QUIET_GUILDLEAVE_HEADER: "Guild Leave",
  QUIET_GUILDLEAVE_HEADER_TOOLTIP:
    "Select how you want to handle the Guild Leave Keybind in Guild Panel",
  QUIET_GUILDLEAVE_BLOCK: "Deactivation for:",
  QUIET_GUILDLEAVE_BLOCK_TOOLTIP:
    "Select how you want to handle the Guild Leave keybind:\n|cFFFFFFNo deactivation|r - no changes\n|cFFFFFFAll Guilds|r - Disabled for all guilds\n|cFFFFFFPer Guild|r - Select which guild should have this keybind disabled",
  QUIET_CAMERA_HEADER: "Camera & Interaction",
  QUIET_CAMERA_INTERRUPT: "Don't interrupt interactions",
  QUIET_CAMERA_INTERRUPT_TOOLTIP:
    "Don't interrupt interactions (harvesting, fishing, ...) when you open map, inventory or other SCENES.",
  QUIET_CAMERA_ROTATE: "Don't rotate game camera",
  QUIET_CAMERA_ROTATE_TOOLTIP:
    "Don't rotate game camera while showing map, skills or other SCENES.",
  QUIET_CAMERA_ROTATE_STATS: "Don't rotate game camera while showing status",
  QUIET_CAMERA_ROTATE_STATS_TOOLTIP:
    "Don't rotate game camera while showing status. If you turn this ON, you can't change outfit on status window by ESO feature.",
  QUIET_CAMERA_ROTATE_INV: "Don't rotate game camera while showing inventory",
  QUIET_CAMERA_ROTATE_INV_TOOLTIP:
    "Don't rotate game camera while showing inventory. If you turn this ON, you can't preview any item by ESO feature.",
  QUIET_NOLOREREADER: "Don't read discovered books",
  QUIET_NOLOREREADER_TOOLTIP:
    "Select how you want to handle Lore Library messages:\n|cFFFFFFnone|r - no changes to Lore Library messages\n|cFFFFFFchat message|r - messages are redirected to the chat\n|cFFFFFFsilent|r - messages are completely removed",
  QUIET_NOLOREDISCOVERIES: 'Block Message "Lorebook Discovered"',
  QUIET_NOLOREDISCOVERIES_TOOLTIP:
    "Select how you want to handle Lore Library messages:\n|cFFFFFFnone|r - no changes to Lore Library messages\n|cFFFFFFchat message|r - messages are redirected to the chat\n|cFFFFFFsilent|r - messages are completely removed",
  QUIET_NOSKILLSPROGRESS: 'Block Message "Ability progressed to Rank X"',
  QUIET_NOSKILLSPROGRESS_TOOLTIP:
    "Select how you want to handle Skills Progression messages:\n|cFFFFFFnone|r - no changes to Skills Progression messages\n|cFFFFFFchat message|r - messages are redirected to the chat\n|cFFFFFFsilent|r - messages are completely removed",
  QUIET_NOCRAFTBAG_NOTIF: "Disable Crafting Bag Notifications",
  QUIET_NOCRAFTBAG_NOTIF_TOOLTIP:
    "Won't notify that my items have been moved to the crafting bag when logging & zoning",
  QUIET_NOCHATAUTOCOMPLETE: "Disable Chat autocompletion",
  QUIET_NOCHATAUTOCOMPLETE_TOOLTIP:
    "Will disable chat autocompletion such as emote switchs & channel switchs",
  QUIET_NOCHATDISABLE: "Disable Chat Minimize at Trading House",
  QUIET_NOCHATDISABLE_TOOLTIP: "Will disable chat Minimization at trading house scene",
  QUIET_LUA_HEADER: "Lua errors",
  QUIET_LUA_MEMORY: "Redirect Lua Memory error to:",
  QUIET_LUA_MEMORY_TOOLTIP:
    "Redirect Lua Memory error to a notification or a dialog instead than the original popup",
  QUIET_LUA_ERROR: "Redirect Lua error to:",
  QUIET_LUA_ERROR_TOOLTIP: "Redirect Lua errors to a notification instead than the original popup",
  QUIET_LUAERR_MESSAGE: "Lua Error triggered",
  QUIET_LUAERR_HEADING: "Lua Error",
  QUIET_LUAERR_SHORT: "Lua Error",
  GUILD_INV_OPTION: ["never", "always", "when full of guilds"],
  AVA_MODE_OPTION: ["none", "chat message", "silent"],
  SOUND_MODE_OPTION: ["never", "out of combat", "in combat", "always"],
  GALERTS_OPTION: ["none", "chat message", "silent"],
  RAID_OPTION: ["always", "never"],
  MOTD_OPTION: ["none", "chat message", "silent"],
  GUILDLEAVE_OPTION: ["No deactivation", "All Guilds", "Per Guild"],
  LUAERR_OPTION: ["none", "Notification", "chat message"],
  NOPORTONLEADER_OPTION: ["Never", "When destination is unreachable", "Always"],
  WAYSHRINE_OPTION: ["Show", "Show only Capitals", "Hide everything"],
  DUNGEONS_OPTION: ["Show", "Show only Trials", "Hide Everything"],
  UNOWNED_HOUSES_OPTION: ["Show", "Show only on Zones / Cities", "Hide"],
} as const

export const INTERACTION_TAKE = "Take"
export const INSECT_NAMES = [
  "Butterfly",
  "Torchbug",
  "Wasp",
  "Fleshflies",
  "Dragonfly",
  "Netch Calf",
  "Fetcherfly",
  "Seth's Dovah-Fly",
] as const
export const ENTERING_GROUP_AREA = "Entering Group Area."
export const LEAVING_GROUP_AREA = "Leaving Group Area."
export const RAID_COMPLETE = " completed"
export const RAID_OTHERS = "and <<1>> others"

export const BINDING_NAME_NOCAMROTATE_TOGGLE = "Toggle Camera Rotate"

export function mobImmuneTooltip(this: void): string {
  return (
    "Block text alerts which are often spammed during the boss fight:\n- |cFFFFFF" +
    GetErrorString(162) +
    "|r\n- |cFFFFFF" +
    GetErrorString(177) +
    "|r\n- |cFFFFFF" +
    GetString("SI_ACTIONRESULT", ACTION_RESULT_MISSING_EMPTY_SOUL_GEM) +
    "|r\n- |cFFFFFF" +
    GetString("SI_ACTIONRESULT", ACTION_RESULT_IMMUNE) +
    "|r"
  )
}

export function craftResultTooltip(this: void): string {
  return (
    "Block crafting result alerts:\n- |cFFFFFF" +
    GetString(SI_TRADESKILLRESULT119) +
    "|r\n- |cFFFFFF" +
    GetString(SI_SMITHING_EXTRACTION_FAILED) +
    "|r\n- |cFFFFFF" +
    GetString(SI_SMITHING_DECONSTRUCTION_LEVEL_PENALTY) +
    "|r\n- |cFFFFFF" +
    GetString(SI_ALCHEMY_NO_YIELD) +
    "|r\n- |cFFFFFF" +
    GetString(SI_ENCHANT_NO_YIELD) +
    "|r"
  )
}
