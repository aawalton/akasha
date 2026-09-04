export type Fetching = (url: string, init: RequestInit) => Promise<Response>

const overHttp: Fetching = (url, init) => fetch(url, init)

let fetching: Fetching = overHttp

export function fetchSpotify(url: string, init: RequestInit): Promise<Response> {
  return fetching(url, init)
}

export function fetchingIs(one: Fetching): undefined {
  fetching = one
}

export function fetchingIsOverHttp(): undefined {
  fetching = overHttp
}
