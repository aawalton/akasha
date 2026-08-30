// The two routes this stub gates. These stood in `@shared/person-access`, which was dropped
// with the old person-access pages; they are named here until route access is rebuilt on the
// `person-access` page type in `akasha/person-system`.
export const ROUTE_TARGETS = {
  DEVICE_SECRET_MINT: "device-secret-mint",
  READOUT_FEED: "readout-feed",
} as const

const REBUILDING =
  "person enrolment was taken away with the old person pages and has yet to be rebuilt on " +
  "`supabase-auth-user-id`, so no account can be read to a person and no route opens"

export async function holdsRouteAccess(_accountUserId: string, _target: string): Promise<boolean> {
  process.stderr.write(`[route-access] refusing: ${REBUILDING}\n`)
  return false
}
