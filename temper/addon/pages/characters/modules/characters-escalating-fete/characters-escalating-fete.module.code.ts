import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const ESCALATING_FETE = 155176

type Fete = {
  stacks: number
  changedMsAgo?: number
}

let stacksSeen = 0

let changedAt: number | undefined

export function noteFeteChanged(
  changeType: number,
  stackCount: number,
  abilityId: number
): undefined {
  if (abilityId !== ESCALATING_FETE) return
  const stacks = changeType === EFFECT_RESULT_FADED ? 0 : stackCount
  const gainedOrFaded = changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_FADED
  if (gainedOrFaded || stacks !== stacksSeen) changedAt = GetGameTimeMilliseconds()
  stacksSeen = stacks
}

export function feteOf(
  held: readonly { readonly abilityId: number; readonly stacks: number }[]
): Fete | undefined {
  let stacks: number | undefined
  for (const buff of held) if (buff.abilityId === ESCALATING_FETE) stacks = buff.stacks
  if (changedAt === undefined) return stacks === undefined ? undefined : { stacks }
  return { stacks: stacks ?? 0, changedMsAgo: GetGameTimeMilliseconds() - changedAt }
}
