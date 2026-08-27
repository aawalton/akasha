type FetchHandler = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export function createFetchStub(handler: FetchHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}
