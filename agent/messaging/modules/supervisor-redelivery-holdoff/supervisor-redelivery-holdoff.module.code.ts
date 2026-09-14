const REDELIVERY_HOLDOFF_MS = 45_000

export function redeliveryHoldoff(
  childExited: Promise<unknown>,
  ms: number = REDELIVERY_HOLDOFF_MS
): Promise<boolean> {
  const elapsed = new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => resolve(true), ms)
    timer.unref?.()
  })
  return Promise.race([
    elapsed,
    childExited.then(
      () => false,
      () => false
    ),
  ])
}
