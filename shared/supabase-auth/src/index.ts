export {
  getClaimsUser,
  getUserFromToken,
  isInvalidCredentialsError,
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from "./auth"
export { assertCredentialPathAllowed } from "./protected-user"
export { NON_PRODUCTION_TEST_USER_IDS } from "./test-user-ids"
export type { AuthResult, SupabaseUser } from "./types"
export { USER_ID } from "./user-id"
