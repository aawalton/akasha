import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { contributorNamed } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

const PERSON_PAGE_TYPE = "person"

const ACCOUNT_KEY = "supabaseAuthUserId"

export type AlanReader = {
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
  const named = contributorNamed(contributor)
  if (named === null) return null
  const asked = await askingFor({
    pageTypeSlug: PERSON_PAGE_TYPE,
    where: { contributor: { is: named } },
    keys: [ACCOUNT_KEY],
  })
  if ("refused" in asked) {
    console.error(`[alan-session-reader] the person pages went unread: ${asked.refused}`)
    return null
  }
  const held = asked.rows[0]?.[ACCOUNT_KEY]
  return typeof held === "string" && held !== "" ? held : null
}
