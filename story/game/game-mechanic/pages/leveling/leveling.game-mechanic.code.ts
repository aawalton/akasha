const FIRST_LEVEL = 1
const LEVELS_PER_FLOOR = 1
const POINTS_PER_LEVEL = 3

type Reading = { readonly floorsCleared: number }

type Levelled = {
  readonly level: number
  readonly attributePoints: number
}

export function runMechanic(reading: Reading): Levelled {
  const level = FIRST_LEVEL + reading.floorsCleared * LEVELS_PER_FLOOR
  return { level, attributePoints: (level - FIRST_LEVEL) * POINTS_PER_LEVEL }
}
