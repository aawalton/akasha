import type { playerColor } from "akasha/alan/chess/game/properties/player-color.select-property.ts"

export type PlayerColor = (typeof playerColor.values)[number]
