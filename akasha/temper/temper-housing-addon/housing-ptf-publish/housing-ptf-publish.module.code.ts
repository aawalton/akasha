import { portToFriend as holder } from "../housing-state/housing-state.module.code.ts"

declare global {
  var PortToFriend: import("../housing-holder-types/housing-holder-types.module.code.ts").PortToFriendHolder
}

globalThis.PortToFriend = holder
