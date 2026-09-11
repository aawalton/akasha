import {
  askingFor,
  type Fetcher,
  type Sleeper,
} from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import { ACCOUNT_KEY } from "akasha/persons/person-enrolment/person-enrolment.module.code.ts"
import { asObjectRecord } from "akasha/utils/narrow/as-object-record/as-object-record.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const LIVE_ORIGIN = "http://127.0.0.1:8787"

export interface Recording {
  readonly fetcher: Fetcher
  readonly sent: () => Record<string, unknown>
}

export const noNap: Sleeper = async () => undefined

export async function overTheLiveStore<T>(taking: () => Promise<T>): Promise<T> {
  const held = optionalEnv("PAGE_STORE_ORIGIN")
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  try {
    return await taking()
  } finally {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  }
}

export async function accountStatedBy(personSlug: string): Promise<string> {
  const asked = await askingFor({
    pageTypeSlug: "person",
    where: { slug: { is: personSlug } },
    keys: [ACCOUNT_KEY],
  })
  if ("refused" in asked) throw new Error(asked.refused)
  const stated = asked.rows[0]?.[ACCOUNT_KEY]
  if (typeof stated !== "string" || stated === "") {
    throw new Error(`\`${personSlug}\` states no account, so nothing here can be read back`)
  }
  return stated
}

function parseAsked(held: unknown): Record<string, unknown> {
  const one = asObjectRecord(held)
  if (one === undefined) throw new Error("the body a fetch was handed is no object")
  return one
}

export function recordingFetcher(): Recording {
  let asked: Record<string, unknown> = {}
  const fetcher: Fetcher = async (_url, init) => {
    asked = parseAsked(JSON.parse(String(init.body)))
    return new Response(JSON.stringify({ rows: [] }), {
      headers: { "content-type": "application/json" },
    })
  }
  return { fetcher, sent: () => asked }
}
