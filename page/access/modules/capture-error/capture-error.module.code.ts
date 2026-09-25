import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  type IncrementDeps,
  incrementProperty,
} from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  type Fetcher,
  incrementingFor,
  readingFor,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export type ErrorCapturePayload = {
  fingerprint: string
  message: string
  stack: string
  kind: string
  app: string
  url: string
  userAgent: string
  releaseSha?: string
}

type Captured = {
  readonly slug: string
  readonly commit: string | null
}

const RUNTIME_ERROR = "runtime-error"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const COUNT = "count"

const ERROR_CAPTURE_WRITER = "error capture <errors@alanwalton.com>"

export function slugFor(payload: ErrorCapturePayload): string {
  return `${payload.app}-${payload.fingerprint}`
}

export function firstValuesFor(payload: ErrorCapturePayload, at: string): Value {
  const held: Value = {
    type: namedAs(PAGE_TYPE, RUNTIME_ERROR, null),
    slug: slugFor(payload),
    fingerprint: payload.fingerprint,
    app: payload.app,
    kind: payload.kind,
    message: payload.message,
    userAgent: payload.userAgent,
    firstSeenAt: at,
  }
  if (payload.url !== "") held.url = payload.url
  if (payload.releaseSha !== undefined) held.releaseSha = payload.releaseSha
  return held
}

function throughPages(fetcher?: Fetcher, naps?: Sleeper): IncrementDeps {
  return {
    find: {
      ask: (query) => askingFor(query, fetcher, naps),
      read: (sought) => readingFor(sought, fetcher, naps),
      write: (asked) => writingFor(asked, fetcher, naps),
    },
    increment: (asked) => incrementingFor(asked, fetcher),
  }
}

async function counted(slug: string, at: string, deps: IncrementDeps): Promise<number | null> {
  try {
    return await incrementProperty(
      {
        pageTypeSlug: RUNTIME_ERROR,
        where: [{ key: SLUG, eq: slug }],
        key: COUNT,
        by: 1,
        set: { lastSeenAt: at },
      },
      deps
    )
  } catch (thrown) {
    throw new Error(
      `captureError(${slug}): the pages would not count this capture, so how often this has broken is unchanged — ${saidBy(thrown)}`
    )
  }
}

export async function captureError(
  payload: ErrorCapturePayload,
  writer: string = ERROR_CAPTURE_WRITER,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Captured> {
  const slug = slugFor(payload)
  const at = new Date().toISOString()
  const deps = throughPages(fetcher, naps)
  if ((await counted(slug, at, deps)) !== null) return { slug, commit: null }
  const wrote = await writingFor(
    {
      writer,
      message: `${slug} was met for the first time`,
      pages: [
        { pageTypeSlug: RUNTIME_ERROR, slug, values: firstValuesFor(payload, at), fresh: true },
      ],
    },
    fetcher,
    naps
  )
  if ((await counted(slug, at, deps)) === null) {
    const why = "refused" in wrote ? wrote.refused : "the page written was not found to count"
    throw new Error(
      `captureError(${slug}): the pages refused the write, so how often this has broken is unchanged — ${why}`
    )
  }
  return { slug, commit: "refused" in wrote ? null : wrote.commit }
}
