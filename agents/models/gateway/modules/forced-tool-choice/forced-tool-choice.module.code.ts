import { ANTHROPIC_ERROR_ENVELOPE_SCHEMA } from "akasha/agents/models/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"
import { z } from "zod"

const FORCED_TOOL_CHOICE_STATUS = 400

const INVALID_REQUEST_ERROR_TYPE = "invalid_request_error"

export const FORCED_TOOL_CHOICE_MESSAGE_PREFIX = "tool_choice forces tool use is not compatible"

export const AUTO_TOOL_CHOICE = "auto"

const FORCING_TOOL_CHOICES: ReadonlySet<string> = new Set(["tool", "any"])

const TOOL_CHOICE_BODY = z.looseObject({
  tool_choice: z.looseObject({ type: z.string() }).optional(),
})

function encoded(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text)
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

export function isForcedToolChoiceRejection(status: number, body: string): boolean {
  if (status !== FORCED_TOOL_CHOICE_STATUS) return false
  try {
    const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(JSON.parse(body))
    if (!parsed.success) return false
    if (parsed.data.error.type !== INVALID_REQUEST_ERROR_TYPE) return false
    return parsed.data.error.message?.startsWith(FORCED_TOOL_CHOICE_MESSAGE_PREFIX) ?? false
  } catch {
    return false
  }
}

export function rewrittenToAutoToolChoice(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  try {
    const parsed = TOOL_CHOICE_BODY.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
    if (!parsed.success) return null
    const forcing = parsed.data.tool_choice?.type
    if (forcing === undefined || !FORCING_TOOL_CHOICES.has(forcing)) return null
    return encoded(JSON.stringify({ ...parsed.data, tool_choice: { type: AUTO_TOOL_CHOICE } }))
  } catch {
    return null
  }
}

export type ForcedToolChoiceOutcome =
  | { kind: "response"; response: Response }
  | { kind: "retry"; rewrittenBody: ArrayBuffer }

export type ForcedToolChoiceArgs = {
  res: Response
  bodyBuffer: ArrayBuffer | null
  currentAccount: string
  trail: readonly string[]
  method: string
  pathname: string
  logPrefix: string
  logRes: (account: string, status: number) => undefined
}

export async function attemptForcedToolChoiceRewrite(
  args: ForcedToolChoiceArgs
): Promise<ForcedToolChoiceOutcome> {
  const { res, bodyBuffer, currentAccount, trail, method, pathname, logPrefix } = args
  const responseHeaders = res.headers
  const responseStatusText = res.statusText
  const bodyText = await res.text()

  const answeredAsIs = (): ForcedToolChoiceOutcome => {
    if (trail.length === 1) {
      args.logRes(currentAccount, FORCED_TOOL_CHOICE_STATUS)
    } else {
      console.log(`${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=400`)
    }
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: FORCED_TOOL_CHOICE_STATUS,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }

  if (bodyBuffer === null) return answeredAsIs()
  if (!isForcedToolChoiceRejection(FORCED_TOOL_CHOICE_STATUS, bodyText)) return answeredAsIs()
  const rewrittenBody = rewrittenToAutoToolChoice(bodyBuffer)
  if (rewrittenBody === null) return answeredAsIs()
  console.log(
    `${logPrefix} 400 forced-tool_choice observed account=${currentAccount}; rewrite tool_choice=auto + retry`
  )
  return { kind: "retry", rewrittenBody }
}
