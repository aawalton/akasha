import { parseErrorType } from "../parse-error-type/parse-error-type.module.code.ts"

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

export async function peekResponse(res: Response): Promise<PeekedResponse> {
  const { status, statusText, headers } = res
  const bodyText = await readBodyText(res)
  return {
    errorType: parseErrorType(bodyText),
    bodyText,
    rebuild: () => new Response(bodyText, { status, statusText, headers }),
  }
}
