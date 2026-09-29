import {
  needsSettled,
  type Settled,
} from "akasha/story/world/mechanics/modules/needs-weighing/needs-weighing.module.code.ts"

const MOST_COST = -2

type Answered = Extract<Settled, { readonly answered: unknown }>["answered"]

type Felt = Answered["thirst"]

function wearing(felt: Felt): Felt {
  return { ...felt, bonus: Math.max(MOST_COST, felt.bonus), harmPerHour: 0 }
}

export function settled(reading: unknown): Settled {
  const felt = needsSettled(reading)
  if ("refused" in felt) return felt
  const { thirst, hunger, sleep, cold } = felt.answered
  return {
    answered: {
      thirst: wearing(thirst),
      hunger: wearing(hunger),
      sleep: wearing(sleep),
      cold: wearing(cold),
    },
  }
}
