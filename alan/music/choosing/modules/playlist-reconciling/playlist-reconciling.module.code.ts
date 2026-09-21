export type Reconciled = {
  readonly adding: readonly string[]
  readonly removing: readonly string[]
  readonly keeping: readonly string[]
}

function onceIn(said: readonly string[]): readonly string[] {
  return [...new Set(said)]
}

export function reconciling(wanted: readonly string[], held: readonly string[]): Reconciled {
  const holding = new Set(held)
  const wanting = new Set(wanted)
  const adding: string[] = []
  const keeping: string[] = []
  for (const one of onceIn(wanted)) {
    if (holding.has(one)) keeping.push(one)
    else adding.push(one)
  }
  const removing = onceIn(held).filter((one) => !wanting.has(one))
  return { adding, removing, keeping }
}
