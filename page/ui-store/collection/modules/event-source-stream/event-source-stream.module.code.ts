import type { StreamLike } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"

export function streamAt(at: string): StreamLike {
  const source = new EventSource(at)
  return {
    on: (name, heard) => {
      source.addEventListener(name, (event) => {
        heard(event instanceof MessageEvent ? event.data : undefined)
      })
      return undefined
    },
    closed: () => source.readyState === EventSource.CLOSED,
    close: () => {
      source.close()
      return undefined
    },
  }
}
