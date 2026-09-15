export type Fetching = (url: string, init: RequestInit) => Promise<Response>

const overHttp: Fetching = (url, init) => fetch(url, init)

export function fetchSpotify(
  url: string,
  init: RequestInit,
  over: Fetching = overHttp
): Promise<Response> {
  return over(url, init)
}
