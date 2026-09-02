import type { PortToFriendMenuHolder } from "../housing-state-types/housing-state-types.module.code.ts"

function asPortToFriendMenuHolder(value: unknown): PortToFriendMenuHolder {
  return value as PortToFriendMenuHolder
}

export const portToFriendMenu: PortToFriendMenuHolder = asPortToFriendMenuHolder({
  name: "PortToFriendMenu",
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
