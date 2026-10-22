import {
  type Fetcher,
  refusedIn,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

export const APPEND_SENT = z.looseObject({ under: z.string(), lines: z.array(z.string()) })

export const PAGES_SENT = z.looseObject({
  pages: z.array(z.looseObject({ pageTypeSlug: z.string() })),
})

export const KEPT_SENT = z.looseObject({ kept: z.array(z.unknown()) })

export const A_FILE = { pageTypeSlug: "persona", slug: "amy", key: "mobileWallpaper" }

export const A_PICTURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0xff, 0xfe, 0x00])

export const GARBLED = '{"rows":[{"id":"one"'

export const AN_INCREMENT = {
  writer: "Amy <amy@alanwalton.com>",
  message: "a tap",
  pageTypeSlug: "readout-widget",
  slug: "one",
  key: "taps",
  by: 1,
  set: {},
}

export const neverNaps: Sleeper = () => Promise.resolve()

export function handing(bytes: Uint8Array<ArrayBuffer>): Fetcher {
  return () => Promise.resolve(new Response(bytes, { status: 200 }))
}

export function answering(status: number, body: unknown): Fetcher {
  return () => Promise.resolve(new Response(JSON.stringify(body), { status }))
}

export function garbling(
  status: number,
  body: string,
  headers: Record<string, string> = {}
): Fetcher {
  return () => Promise.resolve(new Response(body, { status, headers }))
}

export function timingOut(): Fetcher {
  return () => Promise.reject(new DOMException("timed out", "TimeoutError"))
}

export function whyOf(said: unknown): string {
  return refusedIn(said) ?? ""
}

export function counting(said: Fetcher): {
  readonly fetcher: Fetcher
  readonly spent: () => number
} {
  let spent = 0
  return {
    fetcher: (url, init) => {
      spent += 1
      return said(url, init)
    },
    spent: () => spent,
  }
}

export function racingOnce(then: unknown): Fetcher {
  let raced = false
  return () => {
    const status = raced ? 200 : 409
    const body = raced ? then : { refused: "`akasha/a.ts` moved since it was read" }
    raced = true
    return Promise.resolve(new Response(JSON.stringify(body), { status }))
  }
}
