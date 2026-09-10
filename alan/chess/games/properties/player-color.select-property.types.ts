import type { playerColor } from "./player-color.select-property.ts"

export type PlayerColor = (typeof playerColor.values)[number]
