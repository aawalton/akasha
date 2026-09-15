import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"

export function optionFor(named: string | undefined): DeviceOption {
  return named === undefined ? {} : { deviceId: named }
}

export function whereOf(named: string | undefined): string {
  return named === undefined ? "the active device" : `device ${named}`
}
