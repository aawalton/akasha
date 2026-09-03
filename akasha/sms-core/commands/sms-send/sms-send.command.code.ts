import type { Answer, Given } from "@akasha/command-system/calling"
import { requireEnv } from "@akasha/utils-narrow/require-env"
import {
  buildTelnyxSendRequest,
  parseTelnyxSendResponse,
} from "../../telnyx-send/telnyx-send.module.code.ts"
import {
  answering,
  asJson,
  filing,
  JSON_SAID,
  OPERATIONAL,
  proseIn,
  type Reading,
  refusedBy,
  told,
  wordFilling,
  wordsIn,
} from "../sms-command-reading/sms-command-reading.module.code.ts"

const TO = "--to"

const TEXT = filing("--text")

const FROM = "--from"

const BASE_URL = "--base-url"

const KEY_NAMED = "TELNYX_API_KEY"

const FROM_NAMED = "TELNYX_FROM_NUMBER"

const VALUED = [TO, TEXT.said, TEXT.file, FROM, BASE_URL]

const SWITCHES = [JSON_SAID]

const WANTS = "the number the text goes to"

export type Read = {
  readonly to: string
  readonly text: string
  readonly from: string | undefined
  readonly baseUrl: string | undefined
  readonly json: boolean
}

export function readIn(argv: readonly string[], given: Given): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const refusals: string[] = []
  const to = wordFilling(said, TO, WANTS)
  if (typeof to === "object") refusals.push(...to.refused)
  else if (to === undefined) refusals.push(`this names ${WANTS}, and nothing did`)
  const body = proseIn(given, said, TEXT)
  if ("refused" in body) refusals.push(...body.refused)
  else if (body.text === undefined) {
    refusals.push(
      `this names the message body at \`${TEXT.said}\` or \`${TEXT.file}\`, and nothing did`
    )
  }
  const text = "refused" in body ? undefined : body.text
  if (refusals.length > 0 || typeof to !== "string" || text === undefined) {
    return { refused: refusals }
  }
  return {
    to,
    text,
    from: said.named[FROM],
    baseUrl: said.named[BASE_URL],
    json: said.flags.has(JSON_SAID),
  }
}

export function credentialIn(named: string): Reading<string> {
  try {
    return requireEnv(named)
  } catch {
    return {
      refused: [
        `${named} is unset — it belongs in the secrets file, and it is never committed and never logged`,
      ],
    }
  }
}

export function smsSend(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv, given)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  const apiKey = credentialIn(KEY_NAMED)
  if (typeof apiKey === "object") return Promise.resolve(refusedBy(apiKey.refused))
  const from = said.from ?? credentialIn(FROM_NAMED)
  if (typeof from === "object") return Promise.resolve(refusedBy(from.refused))
  return answering(async () => {
    const asked = buildTelnyxSendRequest({
      apiKey,
      from,
      to: said.to,
      text: said.text,
      ...(said.baseUrl === undefined ? {} : { baseUrl: said.baseUrl }),
    })
    const answer = await fetch(asked.url, {
      method: asked.method,
      headers: asked.headers,
      body: asked.body,
    })
    let body: unknown
    try {
      body = await answer.json()
    } catch {
      return {
        report: [],
        refusals: [`the carrier answered HTTP ${String(answer.status)} with no JSON in it`],
        code: OPERATIONAL,
      }
    }
    const read = parseTelnyxSendResponse(body)
    if (!answer.ok) {
      return {
        report: [],
        refusals: [`the carrier answered HTTP ${String(answer.status)}`],
        code: OPERATIONAL,
      }
    }
    if (!read.ok) {
      return { report: [], refusals: [`the carrier answered ${read.reason}`], code: OPERATIONAL }
    }
    if (said.json) return asJson({ sent: true, to: said.to, id: read.id })
    return told([`sent\t${said.to}\t${read.id}`])
  })
}
