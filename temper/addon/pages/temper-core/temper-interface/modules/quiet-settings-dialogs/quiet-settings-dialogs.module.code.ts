import { DEFAULTS } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-defaults/quiet-defaults.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-header/quiet-settings-header.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-strings/quiet-strings.module.code.ts"
import { noUniversalStones } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-world/quiet-world.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function buildDialogSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(GetString(SI_GAMEPAD_MAIN_MENU_CROWN_STORE_CATEGORY)),
    {
      type: "checkbox",
      name: STRINGS.QUIET_MARKET_ADS,
      tooltip: STRINGS.QUIET_MARKET_ADS_TOOLTIP,
      getFunc: () => savedVars.marketAnnouncement,
      setFunc: (value) => {
        savedVars.marketAnnouncement = value
      },
      default: DEFAULTS.marketAnnouncement,
      disabled: () => SCENE_MANAGER.scenes.marketAnnouncement === undefined,
    },
    header(STRINGS.QUIET_MAIL_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_MAIL,
      tooltip: STRINGS.QUIET_MAIL_TOOLTIP,
      getFunc: () => savedVars.emptyMail,
      setFunc: (value) => {
        savedVars.emptyMail = value
      },
      default: DEFAULTS.emptyMail,
    },
    header(STRINGS.QUIET_FENCE_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_FENCE,
      tooltip: STRINGS.QUIET_FENCE_TOOLTIP,
      getFunc: () => savedVars.fenceDialog,
      setFunc: (value) => {
        savedVars.fenceDialog = value
      },
      default: DEFAULTS.fenceDialog,
    },
    header(STRINGS.QUIET_GROUPS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_GROUPS_DISBAND,
      tooltip: STRINGS.QUIET_GROUPS_DISBAND_TOOLTIP,
      getFunc: () => savedVars.disbandDialog,
      setFunc: (value) => {
        savedVars.disbandDialog = value
      },
      default: DEFAULTS.disbandDialog,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_GROUPS_LARGE,
      tooltip: STRINGS.QUIET_GROUPS_LARGE_TOOLTIP,
      getFunc: () => savedVars.largeGroupDialog,
      setFunc: (value) => {
        savedVars.largeGroupDialog = value
      },
      default: DEFAULTS.largeGroupDialog,
    },
    dropdown({
      name: STRINGS.QUIET_NOPORTONLEADER,
      tooltip: STRINGS.QUIET_NOPORTONLEADER_TOOLTIP,
      choices: STRINGS.NOPORTONLEADER_OPTION,
      get: () => savedVars.noPortOnLeader,
      set: (index) => {
        savedVars.noPortOnLeader = index
      },
      defaultIndex: DEFAULTS.noPortOnLeader,
    }),
    header(STRINGS.QUIET_CRAFT_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_CRAFT,
      tooltip: STRINGS.QUIET_CRAFT_TOOLTIP,
      getFunc: () => savedVars.improveDialog,
      setFunc: (value) => {
        savedVars.improveDialog = value
      },
      default: DEFAULTS.improveDialog,
    },
    header(STRINGS.QUIET_CHAMELEON_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_CHAMELEON,
      tooltip: STRINGS.QUIET_CHAMELEON_TOOLTIP,
      getFunc: () => savedVars.noUniversalStones,
      setFunc: (value) => {
        savedVars.noUniversalStones = value
        noUniversalStones()
      },
      default: DEFAULTS.noUniversalStones,
    },
    header(STRINGS.QUIET_RETICLE_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_RETICLE_TAKE,
      tooltip: STRINGS.QUIET_RETICLE_TAKE_TOOLTIP,
      getFunc: () => savedVars.reticleTake,
      setFunc: (value) => {
        savedVars.reticleTake = value
      },
      default: DEFAULTS.reticleTake,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_EMPTY_INTERACT,
      tooltip: STRINGS.QUIET_EMPTY_INTERACT_TOOLTIP,
      getFunc: () => savedVars.emptyInteractions,
      setFunc: (value) => {
        savedVars.emptyInteractions = value
      },
      default: DEFAULTS.emptyInteractions,
    },
    header(STRINGS.QUIET_GUILDS_HEADER),
    dropdown({
      name: STRINGS.QUIET_GUILDS,
      tooltip: STRINGS.QUIET_GUILDS_TOOLTIP,
      choices: STRINGS.GUILD_INV_OPTION,
      get: () => savedVars.guildInvites,
      set: (index) => {
        savedVars.guildInvites = index
      },
      defaultIndex: DEFAULTS.guildInvites,
    }),
    {
      type: "checkbox",
      name: STRINGS.QUIET_GUILDSAPP,
      tooltip: STRINGS.QUIET_GUILDSAPP_TOOLTIP,
      getFunc: () => savedVars.guildApps,
      setFunc: (value) => {
        savedVars.guildApps = value
      },
      default: DEFAULTS.guildApps,
    },
  ]
}
