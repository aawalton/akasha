export const PROTOCOL = 2

export const LEASE_MS = 30_000

export const LEASE_ENV = "AKASHA_COMMAND_SERVER_LEASE_MS"

export function parseLease(stated: string | undefined): number {
  const asked = stated === undefined || stated === "" ? Number.NaN : Number(stated)
  return Number.isFinite(asked) && asked > 0 ? asked : LEASE_MS
}

export function leaseAsked(): number {
  return parseLease(process.env[LEASE_ENV])
}
