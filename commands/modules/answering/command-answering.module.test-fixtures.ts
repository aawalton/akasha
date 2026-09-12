export type Working = (done: string[]) => Promise<never>

export function throwingAfter(wrote: readonly string[], thrown: Error): Working {
  return async (done) => {
    for (const one of wrote) done.push(one)
    throw thrown
  }
}
