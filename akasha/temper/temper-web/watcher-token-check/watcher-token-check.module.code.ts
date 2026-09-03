import { createHash, timingSafeEqual } from "node:crypto"
import { getPage } from "@akasha/pages-access/get"
import { patchPageById } from "@akasha/pages-access/patch"

const TEMPER_WATCHER_ENROLMENT_SLUG = "temper-watcher-enrolment"
const TOKEN_SHAPE = /^wt_[0-9a-f]{64}$/
const HASH_SHAPE = /^[0-9a-f]{64}$/

export function watcherTokenHash(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex")
}

function sameHash(stated: unknown, presented: string): boolean {
  if (typeof stated !== "string") return false
  if (!HASH_SHAPE.test(stated) || !HASH_SHAPE.test(presented)) return false
  return timingSafeEqual(Buffer.from(stated, "hex"), Buffer.from(presented, "hex"))
}

export type ValidatedWatcherToken = {
  accountPageId: string
}

export async function validateWatcherToken(
  wtToken: unknown
): Promise<ValidatedWatcherToken | null> {
  if (typeof wtToken !== "string" || !TOKEN_SHAPE.test(wtToken)) return null
  const presented = watcherTokenHash(wtToken)

  const row = await getPage({
    pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
    where: [{ key: "tokenHash", eq: presented }],
    select: ["id", "tokenHash", "accountPage"],
  })
  if (!row) return null
  if (!sameHash(row.tokenHash, presented)) return null

  const accountPageId = row.accountPage
  const enrolmentPageId = row.id
  if (typeof accountPageId !== "string" || typeof enrolmentPageId !== "string") return null

  try {
    await patchPageById({
      pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
      id: enrolmentPageId,
      set: { tokenLastUsedAt: new Date().toISOString() },
    })
  } catch (cause) {
    console.error(
      `validateWatcherToken(${enrolmentPageId}): recording tokenLastUsedAt failed, so that timestamp is now stale. The presented token matched and access is granted regardless, because a bookkeeping write must not decide authentication.`,
      cause
    )
  }

  return { accountPageId }
}
