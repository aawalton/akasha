export type SwapDecision = {
  readonly stops: readonly string[]
  readonly start: string | null
}

export function decideSwap(args: {
  requested: string
  resident: readonly string[]
  warmSet: readonly string[]
}): SwapDecision {
  const { requested, resident, warmSet } = args
  const requestedWarm = warmSet.includes(requested)
  const stops = resident.filter((name) => {
    if (name === requested) return false
    return requestedWarm ? !warmSet.includes(name) : true
  })
  const start = resident.includes(requested) ? null : requested
  return { stops, start }
}
