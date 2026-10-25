import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  type Fetcher,
  fetchThrough,
  readingFor,
  type Sleeper,
  sleep,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const MESSAGE_PAGE_TYPE_SLUG = "agent-message"

const CLAIMED_AT = "claimedAt"

const WRITER = "alanwalton web <web@alanwalton.com>"

type Withdrawal =
  | { readonly kind: "withdrawn" }
  | { readonly kind: "taken" }
  | { readonly kind: "refused"; readonly why: string; readonly status: number }

type Asked = { readonly row: Row | null } | { readonly refused: string }

function refusal(why: string, status: number): Withdrawal {
  return { kind: "refused", why, status }
}

function claimedIn(row: Row): boolean {
  const held = row[CLAIMED_AT]
  return held !== undefined && held !== null
}

async function messageOf(message: string, fetcher: Fetcher, naps: Sleeper): Promise<Asked> {
  const asked = await askingFor(
    {
      pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
      where: { slug: { is: message } },
      keys: ["slug", "from", "to", CLAIMED_AT],
      limit: 1,
    },
    fetcher,
    naps
  )
  if ("refused" in asked) return { refused: asked.refused }
  return { row: asked.rows[0] ?? null }
}

export async function withdrawnBy(
  from: string,
  seat: string,
  message: string,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Withdrawal> {
  const asked = await messageOf(message, fetcher, naps)
  if ("refused" in asked) return refusal(asked.refused, 503)
  const row = asked.row
  if (row === null) return { kind: "taken" }
  if (textIn(row.from) !== from) {
    return refusal("only the person who sent a message takes it back", 403)
  }
  if (slugOf(textIn(row.to) ?? "") !== seat) return refusal("that message is to another seat", 404)
  if (claimedIn(row)) return { kind: "taken" }
  const read = await readingFor(
    { pages: [{ pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG, slug: message }] },
    fetcher,
    naps
  )
  if ("refused" in read) return refusal(read.refused, 503)
  const body = read.bodies[0]
  if (body === undefined || body.content === null) return { kind: "taken" }
  const wrote = await writingFor(
    {
      writer: WRITER,
      message: `${from} takes back a message the ${seat} seat had not taken`,
      removes: [body.path],
      claims: [{ path: body.path, key: CLAIMED_AT }],
      read: read.at,
    },
    fetcher,
    naps
  )
  if (!("refused" in wrote)) return { kind: "withdrawn" }
  const again = await messageOf(message, fetcher, naps)
  if ("row" in again && (again.row === null || claimedIn(again.row))) return { kind: "taken" }
  return refusal(wrote.refused, 503)
}
