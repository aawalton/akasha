import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { amyTextMessages } from "akasha/person/sms-consent/wording/pages/amy-text-messages.sms-consent-wording.ts"

export const SMS_CONSENT_WORDING = "sms-consent-wording"

export type ConsentWording = { readonly wording: string; readonly version: string }

export function wordingIn(page: Readonly<Record<string, unknown>>): ConsentWording | null {
  const wording = stringIn(page.description)
  const version = stringIn(page.consentTextVersion)
  return wording === null || version === null ? null : { wording, version }
}

export async function consentWordingRead(): Promise<ConsentWording> {
  const [found] = await collectPages({
    pageTypeSlug: SMS_CONSENT_WORDING,
    where: [{ key: "slug", eq: amyTextMessages.slug }],
    max: 1,
  })
  const read = found === undefined ? null : wordingIn(found)
  if (read === null) throw new Error(`the wording \`${amyTextMessages.slug}\` went unread`)
  return read
}
