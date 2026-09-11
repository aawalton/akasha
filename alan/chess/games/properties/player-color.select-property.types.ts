import type { playerColor } from "akasha/alan/chess/games/properties/player-color.select-property.ts"

export type PlayerColor = (typeof playerColor.values)[number]
