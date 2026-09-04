export class CeilingExceeded extends Error {}

export function withCeiling<T>(waitingFor: string, ms: number, run: () => Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () => reject(new CeilingExceeded(`${waitingFor} did not answer inside ${ms}ms`)),
      ms
    )
  })
  return Promise.race([run(), ceiling]).finally(() => {
    if (timer !== undefined) clearTimeout(timer)
  })
}

export function describeErr(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}
