export function buildCopFetchInit(input: {
  readonly method: string
  readonly headers: Record<string, string>
  readonly body: string
  readonly timeoutMs: number
}): RequestInit & { timeout: boolean } {
  return {
    method: input.method,
    headers: input.headers,
    body: input.body,
    timeout: false,
    signal: AbortSignal.timeout(input.timeoutMs),
  }
}
