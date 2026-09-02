import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { DEFAULTS } from "../quiet-defaults/quiet-defaults.module.code.ts"
import { handleLuaErrorEvent } from "../quiet-lua-errors/quiet-lua-errors.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "../quiet-settings-header/quiet-settings-header.module.code.ts"
import { STRINGS } from "../quiet-strings/quiet-strings.module.code.ts"
import { noGuildLeave } from "../quiet-world/quiet-world.module.code.ts"

function questDivider(this: void): LamTextureData {
  return {
    type: "texture",
    image: "EsoUI/Art/Quest/questJournal_divider.dds",
    imageWidth: 510,
    imageHeight: 4,
  }
}

export function buildGuildSubmenus(this: void): LamControlData[] {
  const savedVars = getSavedVariables()

  const guildAlertsControls: LamControlData[] = [
    dropdown({
      name: STRINGS.NOTYOU_GROSTER,
      tooltip: STRINGS.NOTYOU_GROSTER_TOOLTIP,
      choices: STRINGS.GALERTS_OPTION,
      get: () => savedVars.guildAlerts,
      set: (index) => {
        savedVars.guildAlerts = index
      },
      defaultIndex: DEFAULTS.guildAlerts,
    }),
    questDivider(),
  ]

  const raidScoreControls: LamControlData[] = [
    dropdown({
      name: STRINGS.NOTYOU_RAIDSCORE_ONLYFOR,
      tooltip: STRINGS.NOTYOU_RAIDSCORE_ONLYFOR_TOOLTIP,
      choices: STRINGS.RAID_OPTION,
      get: () => savedVars.raid,
      set: (index) => {
        savedVars.raid = index
      },
      defaultIndex: DEFAULTS.raid,
    }),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_RAIDSCORE_ENDLESS,
      getFunc: () => savedVars.endless,
      setFunc: (value) => {
        savedVars.endless = value
      },
      default: DEFAULTS.endless,
      disabled: () => savedVars.raid === 1,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_RAIDSCORE_REDIRECT,
      getFunc: () => savedVars.raidToChat,
      setFunc: (value) => {
        savedVars.raidToChat = value
      },
      default: DEFAULTS.raidToChat,
      disabled: () => savedVars.raid === 1,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_RAIDSCORE_SOUND,
      tooltip: STRINGS.NOTYOU_RAIDSCORE_SOUND_TOOLTIP,
      getFunc: () => savedVars.notificationSound,
      setFunc: (value) => {
        savedVars.notificationSound = value
      },
      default: DEFAULTS.notificationSound,
    },
  ]

  const motdControls: LamControlData[] = [
    dropdown({
      name: STRINGS.NOTYOU_MOTD_BLOCK,
      tooltip: STRINGS.NOTYOU_MOTD_BLOCK_TOOLTIP,
      choices: STRINGS.MOTD_OPTION,
      get: () => savedVars.motd,
      set: (index) => {
        savedVars.motd = index
      },
      defaultIndex: DEFAULTS.motd,
    }),
    questDivider(),
  ]

  const guildLeaveControls: LamControlData[] = [
    dropdown({
      name: STRINGS.NOTYOU_GUILDLEAVE_BLOCK,
      tooltip: STRINGS.NOTYOU_GUILDLEAVE_BLOCK_TOOLTIP,
      choices: STRINGS.GUILDLEAVE_OPTION,
      get: () => savedVars.noGuildLeave,
      set: (index) => {
        savedVars.noGuildLeave = index
        noGuildLeave()
      },
      defaultIndex: DEFAULTS.noGuildLeave,
    }),
    questDivider(),
  ]

  for (let i = 1; i <= MAX_GUILDS; i++) {
    const guildIndex = i
    const gname = GetGuildName(GetGuildId(guildIndex))
    const name = gname !== "" ? gname : `Guild ${guildIndex}`

    guildAlertsControls.push({
      type: "checkbox",
      name,
      getFunc: () => savedVars.guildAlertsGuilds[guildIndex] === true,
      setFunc: (value) => {
        savedVars.guildAlertsGuilds[guildIndex] = value
        noGuildLeave()
      },
      default: DEFAULTS.guildAlertsGuilds[guildIndex] ?? false,
      disabled: () => savedVars.guildAlerts === 0,
    })

    motdControls.push({
      type: "checkbox",
      name,
      getFunc: () => savedVars.motdGuilds[guildIndex] === true,
      setFunc: (value) => {
        savedVars.motdGuilds[guildIndex] = value
        NOTIFICATIONS?.RefreshNotificationList()
      },
      default: DEFAULTS.motdGuilds[guildIndex] ?? false,
      disabled: () => savedVars.motd === 0,
    })

    guildLeaveControls.push({
      type: "checkbox",
      name,
      getFunc: () => savedVars.guildLeave[guildIndex] === true,
      setFunc: (value) => {
        savedVars.guildLeave[guildIndex] = value
      },
      default: DEFAULTS.guildLeave[guildIndex] ?? false,
      disabled: () => savedVars.noGuildLeave !== 2,
    })
  }

  const submenuGuildAlerts: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(STRINGS.NOTYOU_GROSTER_HEADER),
    tooltip: STRINGS.NOTYOU_GROSTER_HEADER_TOOLTIP,
    controls: guildAlertsControls,
  }
  const submenuRaidScore: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(STRINGS.NOTYOU_RAIDSCORE_HEADER),
    tooltip: STRINGS.NOTYOU_RAIDSCORE_HEADER_TOOLTIP,
    controls: raidScoreControls,
  }
  const submenuGuildMotD: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(STRINGS.NOTYOU_MOTD_HEADER),
    tooltip: STRINGS.NOTYOU_MOTD_HEADER_TOOLTIP,
    controls: motdControls,
  }
  const submenuGuildLeave: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(STRINGS.NOTYOU_GUILDLEAVE_HEADER),
    tooltip: STRINGS.NOTYOU_GUILDLEAVE_HEADER_TOOLTIP,
    controls: guildLeaveControls,
  }

  return [
    submenuGuildAlerts,
    submenuRaidScore,
    submenuGuildMotD,
    submenuGuildLeave,
    header(STRINGS.NOTYOU_LUA_HEADER),
    dropdown({
      name: STRINGS.NOTYOU_LUA_ERROR,
      tooltip: STRINGS.NOTYOU_LUA_ERROR_TOOLTIP,
      choices: STRINGS.LUAERR_OPTION,
      get: () => savedVars.luaError,
      set: (index) => {
        savedVars.luaError = index
        handleLuaErrorEvent()
      },
      defaultIndex: DEFAULTS.luaError,
    }),
    {
      type: "divider",
      width: "full",
      height: 70,
      alpha: 0.25,
    },
  ]
}
