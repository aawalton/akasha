import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { arenaSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/arenas/combat-alerts-settings-arenas.module.code.ts"
import { asylumSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/asylum/combat-alerts-settings-asylum.module.code.ts"
import { bossHealthBarSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/boss-bar/combat-alerts-settings-boss-bar.module.code.ts"
import { cloudrestSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/cloudrest/combat-alerts-settings-cloudrest.module.code.ts"
import { dreadsailSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/dreadsail/combat-alerts-settings-dreadsail.module.code.ts"
import { dungeonSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/dungeons/combat-alerts-settings-dungeons.module.code.ts"
import { generalSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/general/combat-alerts-settings-general.module.code.ts"
import { hallsKynesSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/kynes-aegis/combat-alerts-settings-kynes-aegis.module.code.ts"
import { lucentMawSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/lucent/combat-alerts-settings-lucent.module.code.ts"
import { maelstromSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/maelstrom/combat-alerts-settings-maelstrom.module.code.ts"
import { miscSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/misc/combat-alerts-settings-misc.module.code.ts"
import { opulentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/opulent/combat-alerts-settings-opulent.module.code.ts"
import { osseinSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/ossein/combat-alerts-settings-ossein.module.code.ts"
import { rockgroveSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/rockgrove/combat-alerts-settings-rockgrove.module.code.ts"
import { sanitySettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/sanity/combat-alerts-settings-sanity.module.code.ts"
import { sunspireSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/sunspire/combat-alerts-settings-sunspire.module.code.ts"
import { worldIconSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/world-icons/combat-alerts-settings-world-icons.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

CRUTCH.CreateSettingsMenu = function (this: void) {
  const panelData: LamPanelData = {
    type: "panel",
    name: "|c08BD1DTemperCombat Alerts|r",
    author: "Kyzeragon",
    version: CRUTCH.version,
    registerForRefresh: true,
    registerForDefaults: true,
  }

  const optionsData: LamControlData[] = [
    {
      type: "checkbox",
      name: "Unlock UI",
      tooltip:
        "Unlock the frames for moving.\nShortcuts: |c99FF99/crutch lock|r and |c99FF99/crutch unlock|r",
      default: false,
      getFunc: () => CRUTCH.unlock,
      setFunc: CRUTCH.UnlockUI,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Use installation-wide settings",
      tooltip:
        "Use the same settings across all opted-in accounts and megaservers on this machine, instead of per-account. If this is the first time you turn it on, the settings from this account+server will be copied to the installation-wide settings. If you turn this back off, the settings will go back to your account settings before the switch to installation-wide",
      default: false,
      getFunc: () => CRUTCH.accountSVs.installationWide,
      setFunc: (value) => {
        CRUTCH.accountSVs.installationWide = value
      },
      width: "full",
      requiresReload: true,
    },
    ...generalSettings(),
    ...bossHealthBarSettings(),
    ...worldIconSettings(),
    ...miscSettings(),
    ...asylumSettings(),
    ...cloudrestSettings(),
    ...dreadsailSettings(),
    ...hallsKynesSettings(),
    ...lucentMawSettings(),
    ...opulentSettings(),
    ...osseinSettings(),
    ...rockgroveSettings(),
    ...sanitySettings(),
    ...sunspireSettings(),
    ...arenaSettings(),
    ...maelstromSettings(),
    ...dungeonSettings(),
  ]

  TemperCombatAlertsOptions = TemperAddonMenu.RegisterAddonPanel(
    "TemperCombatAlertsOptions",
    panelData
  )
  TemperAddonMenu.RegisterOptionControls("TemperCombatAlertsOptions", optionsData)
}
