import type { HouseTravelMenuHolder } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state-types/housing-state-types.module.code.ts"

function asHouseTravelMenuHolder(value: unknown): HouseTravelMenuHolder {
  return value as HouseTravelMenuHolder
}

export const houseTravelMenu: HouseTravelMenuHolder = asHouseTravelMenuHolder({
  name: "TemperHousingTravelMenu",
  lam: {
    panel: undefined,
    panelData: {
      type: "panel",
      name: "|c4592FFPort to Friend's House|r",
      registerForRefresh: true,
      registerForDefaults: false,
    },
  },
})
