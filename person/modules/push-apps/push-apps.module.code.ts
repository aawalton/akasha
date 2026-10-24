import { alanwalton } from "akasha/code/ios-app/pages/alanwalton/alanwalton.ios-app.ts"
import { smilingjenny } from "akasha/code/ios-app/pages/smilingjenny/smilingjenny.ios-app.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"

interface PushApp {
  readonly bundleId: string
  readonly userId: string
  readonly routesTaps: boolean
}

export const ALANWALTON_PUSH_APP: PushApp = {
  bundleId: alanwalton.bundleId,
  userId: alan.id,
  routesTaps: true,
}

export const SMILINGJENNY_PUSH_APP: PushApp = {
  bundleId: smilingjenny.bundleId,
  userId: jenny.id,
  routesTaps: false,
}

const PUSH_APPS: readonly PushApp[] = [ALANWALTON_PUSH_APP, SMILINGJENNY_PUSH_APP]

export function pushAppOf(userId: string): PushApp | null {
  return PUSH_APPS.find((one) => one.userId === userId) ?? null
}
