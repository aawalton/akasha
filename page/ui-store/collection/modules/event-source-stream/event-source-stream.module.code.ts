import { streamOver } from "akasha/page/service/modules/events-reading/events-reading.module.code.ts"
import type { StreamLike } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"

export function streamAt(at: string): StreamLike {
  return streamOver((signal) =>
    fetch(at, { method: "GET", headers: { accept: "text/event-stream" }, signal })
  )
}
