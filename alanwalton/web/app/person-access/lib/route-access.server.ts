const REBUILDING =
  "person enrolment was taken away with the old person pages and has yet to be rebuilt on " +
  "`supabase-auth-user-id`, so no account can be read to a person and no route opens"

export async function holdsRouteAccess(_accountUserId: string, _target: string): Promise<boolean> {
  process.stderr.write(`[route-access] refusing: ${REBUILDING}\n`)
  return false
}
