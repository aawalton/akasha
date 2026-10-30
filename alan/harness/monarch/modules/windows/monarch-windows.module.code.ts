export const TRUSTED_MONTHS = 12

export function trustedFrom(now: Date = new Date()): string {
  const at = new Date(now.getTime())
  at.setUTCMonth(at.getUTCMonth() - TRUSTED_MONTHS)
  return at.toISOString().slice(0, 10)
}

export const UNATTENDED_DAYS = 7

export function unattendedFrom(now: Date = new Date()): string {
  const at = new Date(now.getTime())
  at.setUTCDate(at.getUTCDate() - UNATTENDED_DAYS)
  return at.toISOString().slice(0, 10)
}
