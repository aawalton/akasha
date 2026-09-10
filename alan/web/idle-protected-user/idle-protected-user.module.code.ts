import { assertCredentialPathAllowed } from "akasha/alan/harness/supabase-auth/protected-user/protected-user.module.code.ts"
import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"

export const PROTECTED_SAVE_USER_ID = USER_ID

export function assertNotProtectedSaveUser(userId: string): undefined {
  return assertCredentialPathAllowed({ resolvedUserId: userId })
}
