import { USER_ID } from "akasha/alan/harness/supabase-auth/modules/user-id/user-id.module.code.ts"
import { alanwalton } from "akasha/code/ios-app/pages/alanwalton/alanwalton.ios-app.ts"
import { smilingjenny } from "akasha/code/ios-app/pages/smilingjenny/smilingjenny.ios-app.ts"

export interface PushApp {
  readonly bundleId: string
  readonly userId: string
}

export const ALANWALTON_PUSH_APP: PushApp = {
  bundleId: alanwalton.bundleId,
  userId: USER_ID,
}

export const SMILINGJENNY_PUSH_APP: PushApp = {
  bundleId: smilingjenny.bundleId,
  userId: "9bc63b11-d301-4a51-8839-7371336262c7",
}
