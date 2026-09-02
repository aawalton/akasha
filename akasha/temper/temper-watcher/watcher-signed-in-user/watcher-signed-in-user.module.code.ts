export interface SignedInAnswer {
  readonly data: { readonly user: { readonly id: string } | null }
  readonly error: { readonly message: string } | null
}

export interface SignedInReader {
  readonly auth: { readonly getUser: () => Promise<SignedInAnswer> }
}

export const NO_USER_IN_ANSWER = "the session carried no user"

export async function signedInUserId(reader: SignedInReader, toDo: string): Promise<string> {
  const answer = await reader.auth.getUser()
  const user = answer.data.user
  if (answer.error != null || user == null) {
    const detail = answer.error?.message ?? NO_USER_IN_ANSWER
    throw new Error(`no signed-in user to ${toDo} (${detail})`)
  }
  return user.id
}

export async function userIdFor(
  reader: SignedInReader,
  stated: string | null | undefined,
  toDo: string
): Promise<string> {
  if (stated != null) return stated
  return signedInUserId(reader, toDo)
}
