import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildLoginReloaduiControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings,
  noEnlightenedSound: (this: void) => void,
  noShopAdvertisement: (this: void) => void
): LamControlData[] {
  return [
    { type: "header", name: "Login/Reloadui" },
    {
      type: "checkbox",
      name: "Remove enlightened sound",
      tooltip: "Silence the enlightened sound upon login/reloadui",
      getFunc: () => settings.noEnlightenedSound === true,
      setFunc: (value) => {
        settings.noEnlightenedSound = value
        noEnlightenedSound()
      },
      default: defaults.noEnlightenedSound === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide crown store advertisements",
      tooltip: "Hide the crown store advertisements popup after login",
      getFunc: () => settings.noShopAdvertisementPopup === true,
      setFunc: (value) => {
        settings.noShopAdvertisementPopup = value
        noShopAdvertisement()
      },
      default: defaults.noShopAdvertisementPopup === true,
      width: "full",
    },
  ]
}
