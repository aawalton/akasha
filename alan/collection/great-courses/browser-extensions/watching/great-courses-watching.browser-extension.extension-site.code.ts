import { watchLectures } from "akasha/alan/collection/great-courses/modules/lecture-watching/lecture-watching.module.code.ts"
import { chromeOf } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

export function runSite(): undefined {
  watchLectures(chromeOf())
}
