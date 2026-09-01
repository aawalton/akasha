export type SaveQueue = {
  readonly enqueue: (write: () => Promise<void>) => Promise<void>
}

export function createSaveQueue(announceFailure: () => undefined): SaveQueue {
  let chain: Promise<void> = Promise.resolve()
  return {
    enqueue(write: () => Promise<void>): Promise<void> {
      let openGate: () => void = () => undefined
      const gate = new Promise<void>((resolve) => {
        openGate = resolve
      })
      const unhandled = chain.then(async () => {
        try {
          await write()
        } catch (cause) {
          announceFailure()
          throw cause
        } finally {
          openGate()
        }
      })
      chain = gate
      return unhandled
    },
  }
}
