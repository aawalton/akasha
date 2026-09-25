import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

interface Recording {
  readonly fetcher: Fetcher
  readonly sent: () => Record<string, unknown>
}

export const noNap: Sleeper = async () => undefined

function parseAsked(held: unknown): Record<string, unknown> {
  const one = asObjectRecord(held)
  if (one === undefined) throw new Error("the body a fetch was handed is no object")
  return one
}

export function answeringByType(
  byType: Record<string, readonly Record<string, unknown>[]>
): Fetcher {
  return async (_url, init) => {
    const asked = parseAsked(JSON.parse(String(init.body)))
    const slug = asked["pageTypeSlug"]
    if (typeof slug !== "string") throw new Error("the body a fetch was handed names no page type")
    const rows = byType[slug] ?? []
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
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
