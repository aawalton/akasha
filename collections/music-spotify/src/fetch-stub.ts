type FetchHandler = (...args: Parameters<typeof fetch>) => Promise<Response>

export function createFetchStub(handler: FetchHandler): typeof fetch {
  return Object.assign(handler, { preconnect: () => {} })
}
