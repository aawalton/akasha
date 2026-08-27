import { assertCredentialPathAllowed } from "../../../../../shared/supabase-auth/src/protected-user"
import { USER_ID } from "../../../../../shared/supabase-auth/src/user-id"

export const PROTECTED_SAVE_USER_ID = USER_ID

export function assertNotProtectedSaveUser(userId: string): undefined {
  return assertCredentialPathAllowed({ resolvedUserId: userId })
}
