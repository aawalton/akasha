const DEFAULT_BASE_URL = "https://api.telnyx.com"

export interface TelnyxSendRequest {
  readonly url: string
  readonly method: "POST"
  readonly headers: Readonly<Record<string, string>>
  readonly body: string
}

interface BuildTelnyxSendArgs {
  readonly apiKey: string
  readonly from: string
  readonly to: string
  readonly text: string
  readonly baseUrl?: string
}

export function buildTelnyxSendRequest(args: BuildTelnyxSendArgs): TelnyxSendRequest {
  const baseUrl = args.baseUrl ?? DEFAULT_BASE_URL
  return {
    url: `${baseUrl}/v2/messages`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({ from: args.from, to: args.to, text: args.text }),
  }
}
