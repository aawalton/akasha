import { crunchyrollSighted } from "akasha/alan/collection/watching/modules/crunchyroll-reading/crunchyroll-reading.module.code.ts"
import { skipIntros } from "akasha/alan/collection/watching/modules/intro-skipping/intro-skipping.module.code.ts"
import { watchPlayback } from "akasha/alan/collection/watching/modules/playback-watching/playback-watching.module.code.ts"
import { chromeOf } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

export function runSite(): undefined {
  watchPlayback(chromeOf(), crunchyrollSighted)
  skipIntros()
}
