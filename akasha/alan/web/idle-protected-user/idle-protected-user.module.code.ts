import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { USER_ID } from "@akasha/supabase-auth/user-id"

export const PROTECTED_SAVE_USER_ID = USER_ID

export function assertNotProtectedSaveUser(userId: string): undefined {
  return assertCredentialPathAllowed({ resolvedUserId: userId })
}
