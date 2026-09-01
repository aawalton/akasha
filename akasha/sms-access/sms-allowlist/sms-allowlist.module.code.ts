import type { SmsExternalIdentity } from "@akasha/sms-core/sms-identity"

export const RELATIONSHIP_PAGE_TYPE_SLUG = "relationship"

const NOTHING_ANSWERS = [
  "who may send us an SMS is read nowhere.",
  `the \`${RELATIONSHIP_PAGE_TYPE_SLUG}\` pages sit in the old page store rather than in akasha,`,
  "and the pages system service answers for akasha alone.",
  "until a relationship is a page akasha carries, no sender is matched to anybody.",
].join(" ")

export async function loadSmsExternalIdentities(): Promise<readonly SmsExternalIdentity[]> {
  throw new Error(`loadSmsExternalIdentities: ${NOTHING_ANSWERS}`)
}
