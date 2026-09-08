export type EffectiveAuthInput = {
  signInOnInvalidSession: boolean
  hadSessionCookie: boolean
  sessionValid: boolean
}

export function isEffectivelyAuthenticated(input: EffectiveAuthInput): boolean {
  return input.signInOnInvalidSession ? input.sessionValid : input.hadSessionCookie
}
