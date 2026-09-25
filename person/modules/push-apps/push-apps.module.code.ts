import { alanwalton } from "akasha/code/ios-app/pages/alanwalton/alanwalton.ios-app.ts"
import { smilingjenny } from "akasha/code/ios-app/pages/smilingjenny/smilingjenny.ios-app.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"

interface PushApp {
  readonly bundleId: string
  readonly userId: string
}

export const ALANWALTON_PUSH_APP: PushApp = {
  bundleId: alanwalton.bundleId,
  userId: alan.id,
}

export const SMILINGJENNY_PUSH_APP: PushApp = {
  bundleId: smilingjenny.bundleId,
  userId: jenny.id,
}
