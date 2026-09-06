import type { SetVolume } from "./properties/set-volume.computed-property.ts"
import type { SetLog } from "./set-log.page-type.ts"

export type WorkedSetLog = SetLog & {
  setVolume?: SetVolume
}
