export type SaveQueue = {
  readonly enqueue: (write: () => Promise<void>) => Promise<void>
}

export function createSaveQueue(announceFailure: () => undefined): SaveQueue {
  let chain: Promise<void> = Promise.resolve()
  return {
    enqueue(write: () => Promise<void>): Promise<void> {
      const gate = Promise.withResolvers<void>()
      const unhandled = chain.then(async () => {
        try {
          await write()
        } catch (cause) {
          announceFailure()
          throw cause
        } finally {
          gate.resolve()
        }
      })
      chain = gate.promise
      return unhandled
    },
  }
}
