import { initNextBoss } from "akasha/temper/addon/events-addon/modules/next-boss-init/next-boss-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initNextBoss()
  return undefined
}
