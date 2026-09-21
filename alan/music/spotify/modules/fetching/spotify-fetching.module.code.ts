export type Fetching = (url: string, init: RequestInit) => Promise<Response>

export type Waiting = (ms: number) => Promise<void>

const overHttp: Fetching = (url, init) => fetch(url, init)

const overTimer: Waiting = (ms) =>
  new Promise((settle) => {
    setTimeout(settle, ms)
  })

const BACKOFF_MS = [1000, 4000] as const

export async function fetchSpotify(
  url: string,
  init: RequestInit,
  over: Fetching = overHttp,
  waiting: Waiting = overTimer
): Promise<Response> {
  for (let attempt = 0; ; attempt += 1) {
    const backoffMs = BACKOFF_MS[attempt]
    try {
      return await over(url, init)
    } catch (thrown) {
      if (backoffMs === undefined) throw thrown
      await waiting(backoffMs)
    }
  }
}
