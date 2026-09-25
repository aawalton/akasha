import { parseErrorType } from "akasha/agent/model/gateway/modules/parse-error-type/parse-error-type.module.code.ts"

export type PeekedResponse = {
  readonly errorType: string | null
  readonly bodyText: string
  readonly rebuild: () => Response
}

async function readBodyText(res: Response): Promise<string> {
  try {
    return await res.text()
  } catch {
    return ""
  }
}

const DECODED_BODY_DROPS: readonly string[] = ["content-encoding", "content-length"]

function rebuiltHeaders(from: Headers): Headers {
  const out = new Headers(from)
  for (const name of DECODED_BODY_DROPS) out.delete(name)
  return out
}

export async function peekResponse(res: Response): Promise<PeekedResponse> {
  const { status, statusText, headers } = res
  const bodyText = await readBodyText(res)
  return {
    errorType: parseErrorType(bodyText),
    bodyText,
    rebuild: () => new Response(bodyText, { status, statusText, headers: rebuiltHeaders(headers) }),
  }
}
