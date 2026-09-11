import type { gameCharacters } from "akasha/story/games/properties/game-characters.file-property.ts"

export type GameCharacters = (typeof gameCharacters.extensions)[number]
