import type { WhoIsReading } from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import type { ReadUser } from "akasha/page/access/modules/answer/answer.module.code.ts"
import { INNWORLD_VISITOR } from "akasha/product/wandering-inn-wiki/web/modules/innworld-visitor/innworld-visitor.module.code.ts"

export const whoIsReading: WhoIsReading = async () => ({ user: { person: INNWORLD_VISITOR } })

export const readsInnworld: ReadUser = async (request) => ({
  ...(await whoIsReading(request)),
  headers: new Headers(),
})
