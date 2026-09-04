import { USER_ID } from "@akasha/supabase-auth/user-id"

export interface PushApp {
  readonly bundleId: string
  readonly userId: string
}

export const ALANWALTON_PUSH_APP: PushApp = {
  bundleId: "com.alanwalton.app",
  userId: USER_ID,
}

export const SMILINGJENNY_PUSH_APP: PushApp = {
  bundleId: "me.smilingjenny.app",
  userId: "9bc63b11-d301-4a51-8839-7371336262c7",
}
