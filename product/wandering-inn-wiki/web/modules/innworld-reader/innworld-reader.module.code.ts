import type { WhoIsReading } from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import { readerNamed } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import type { ReadUser } from "akasha/page/access/modules/answer/answer.module.code.ts"

export const INNWORLD_VISITOR = "innworld-visitor"

export const whoIsReading: WhoIsReading = readerNamed(INNWORLD_VISITOR)

export const readsInnworld: ReadUser = async (request) => ({
  ...(await whoIsReading(request)),
  headers: new Headers(),
})
