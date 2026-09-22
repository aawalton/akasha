import { initNextBoss } from "akasha/temper/addon/pages/hud/temper-events/modules/next-boss-init/next-boss-init.module.code.ts"

export function initializeEvents(this: void): undefined {
  initNextBoss()
  return undefined
}
