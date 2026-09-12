export const SIGNED_OUT_MESSAGE = "You're signed out."

export function isAuthFailure(res: Response): boolean {
  return res.status === 401
}
