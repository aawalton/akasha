import {
  type Fetcher,
  fetchThrough,
  objectIn,
  type Sleeper,
  sentTo,
  sleep,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const PLACE_AT = "/place"

const PLACE_CEILING_MS = 30000

const CHUNK = 0x8000

type Placing = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
  readonly ending: string
  readonly bytes: Uint8Array
}

type Placed = { readonly placed: string } | { readonly refused: string }

function base64Of(bytes: Uint8Array): string {
  let held = ""
  for (let at = 0; at < bytes.length; at += CHUNK) {
    held += String.fromCharCode(...bytes.subarray(at, at + CHUNK))
  }
  return btoa(held)
}

export async function placingFor(
  asked: Placing,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Placed> {
  const body = { ...asked, bytes: base64Of(asked.bytes) }
  const held = await sentTo(PLACE_AT, body, PLACE_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null || typeof said.placed !== "string") {
    return { refused: "the pages answered a placing naming no path" }
  }
  return { placed: said.placed }
}
