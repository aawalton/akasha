import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

type AlanReader = {
  readonly contributor: string
}

export async function alanContributor(request: Request): Promise<string | null> {
  const signed = await signedInAs(request)
  return signed === null ? null : signed.contributor
}

export async function readAlanUser(
  request: Request
): Promise<{ user: object | null; headers: Headers }> {
  const contributor = await alanContributor(request)
  const reader: AlanReader | null = contributor === null ? null : { contributor }
  return { user: reader, headers: new Headers() }
}

export async function alanAccountId(contributor: string): Promise<string | null> {
  const reached = await accountOfContributor(contributor)
  if (!reached.ok) {
    if (reached.unread) console.error(`[alan-session-reader] ${reached.why}`)
    return null
  }
  return reached.account
}
