import { askComposed } from "@akasha/pages-query/answer-schema"
import type { Fetcher } from "@akasha/pages-query/fetcher"
import { ACCOUNT_KEY } from "./person-enrolment.module.code.ts"

const LIVE_ORIGIN = "http://127.0.0.1:8787"

export interface Recording {
  readonly fetcher: Fetcher
  readonly sent: () => Record<string, unknown>
}

export async function overTheLiveStore<T>(taking: () => Promise<T>): Promise<T> {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  try {
    return await taking()
  } finally {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  }
}

export async function accountStatedBy(personSlug: string): Promise<string> {
  const asked = await askComposed({
    "page-type": "person",
    where: { slug: { is: personSlug } },
    keys: [ACCOUNT_KEY],
  })
  if (!asked.ok) throw new Error(asked.why)
  const stated = asked.answer.rows[0]?.values[ACCOUNT_KEY]
  if (typeof stated !== "string" || stated === "") {
    throw new Error(`\`${personSlug}\` states no account, so nothing here can be read back`)
  }
  return stated
}

export function recordingFetcher(): Recording {
  let asked: Record<string, unknown> = {}
  const fetcher: Fetcher = async (_url, init) => {
    asked = JSON.parse(String(init.body))
    return new Response(JSON.stringify({ rows: [] }), {
      headers: { "content-type": "application/json" },
    })
  }
  return { fetcher, sent: () => asked }
}
