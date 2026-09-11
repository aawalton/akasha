import type { turnStates } from "akasha/story/elements-played/properties/turn-states.file-property.ts"

export type TurnStates = (typeof turnStates.extensions)[number]
