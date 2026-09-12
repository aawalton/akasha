import type { TelnyxSendRequest } from "akasha/alan/harness/sms-core/telnyx-send/telnyx-send.module.code.ts"
import {
  buildTelnyxSendRequest,
  parseTelnyxSendResponse,
} from "akasha/alan/harness/sms-core/telnyx-send/telnyx-send.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { baseUrl } from "akasha/commands/arguments/pages/base-url.argument.ts"
import { fromNumber } from "akasha/commands/arguments/pages/from-number.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { text as textArgument } from "akasha/commands/arguments/pages/text.argument.ts"
import { textFile } from "akasha/commands/arguments/pages/text-file.argument.ts"
import { toNumber } from "akasha/commands/arguments/pages/to-number.argument.ts"
import {
  answering,
  asJson,
  keeping,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { smsSend as page } from "akasha/commands/pages/sms/send/sms-send.command.ts"
import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const KEY_NAMED = "TELNYX_API_KEY"

const FROM_NAMED = "TELNYX_FROM_NUMBER"

const BODY = filing(textArgument.said)

export type Reading<T> = T | { readonly refused: readonly string[] }

export function bodyIn(
  root: string,
  said: string | undefined,
  path: string | undefined
): Reading<string> {
  const held = filledIn(root, said, path, BODY)
  if ("refused" in held) return held
  if (held.text !== undefined) return held.text
  return {
    refused: [
      `this names the message body at \`${BODY.said}\` or \`${BODY.file}\`, and nothing did`,
    ],
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

export function sentSaid(to: string): string {
  return (
    `the carrier took the message for ${to}, ` +
    "and a message the carrier took reaches the phone whatever this answers"
  )
}

export type Named = {
  readonly apiKey: string
  readonly from: string
  readonly to: string
  readonly text: string
  readonly baseUrl: string | undefined
  readonly json: boolean
}

export type Reaching = (asked: TelnyxSendRequest) => Promise<Response>

export async function reached(asked: TelnyxSendRequest): Promise<Response> {
  return await fetch(asked.url, {
    method: asked.method,
    headers: asked.headers,
    body: asked.body,
  })
}

export async function sent(done: string[], named: Named, reaching: Reaching): Promise<Answer> {
  const asked = buildTelnyxSendRequest({
    apiKey: named.apiKey,
    from: named.from,
    to: named.to,
    text: named.text,
    ...(named.baseUrl === undefined ? {} : { baseUrl: named.baseUrl }),
  })
  const answer = await reaching(asked)
  if (!answer.ok) {
    return refusedBy([`the carrier answered HTTP ${String(answer.status)}`], OPERATIONAL)
  }
  done.push(sentSaid(named.to))
  let carried: unknown
  try {
    carried = await answer.json()
  } catch {
    return refusedBy(
      [`the carrier answered HTTP ${String(answer.status)} with no JSON in it`],
      OPERATIONAL
    )
  }
  const answered = parseTelnyxSendResponse(carried)
  if (!answered.ok) {
    return refusedBy([`the carrier answered ${answered.reason}`], OPERATIONAL)
  }
  if (named.json) return asJson({ sent: true, to: named.to, id: answered.id })
  return told([`sent\t${named.to}\t${answered.id}`])
}

export type Sending = (done: string[], named: Named, reaching: Reaching) => Promise<Answer>

export async function sentBy(
  named: Named,
  reaching: Reaching = reached,
  sending: Sending = sent
): Promise<Answer> {
  return await answering(async (done) => keeping(done, await sending(done, named, reaching)))
}

export function smsSend(
  argv: readonly string[],
  given: Given,
  reaching: Reaching = reached
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    json,
    toNumber,
    textFile,
    textArgument,
    fromNumber,
    baseUrl,
  ])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  const body = bodyIn(given.root, taken.text, taken.textFile)
  if (typeof body === "object") return Promise.resolve(refusedBy(body.refused))
  const apiKey = credentialIn(KEY_NAMED)
  if (typeof apiKey === "object") return Promise.resolve(refusedBy(apiKey.refused))
  const from = taken.fromNumber ?? credentialIn(FROM_NAMED)
  if (typeof from === "object") return Promise.resolve(refusedBy(from.refused))
  return sentBy(
    {
      apiKey,
      from,
      to: taken.toNumber,
      text: body,
      baseUrl: taken.baseUrl,
      json: taken.json,
    },
    reaching
  )
}
