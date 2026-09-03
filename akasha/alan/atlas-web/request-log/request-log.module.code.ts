export type RequestArrival = {
  seq: number
  method: string
  path: string
  range: string | null
  contentLength: string | null
  userAgent: string | null
  rssBytes: number
}

export type RequestCompletion = {
  seq: number
  method: string
  path: string
  status: number
  durationMs: number
  rssBytes: number
}

const MAX_UA = 120

export function sanitizeLogValue(value: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping them is the point
  return value.replace(/[\u0000-\u001f\u007f]/g, ".")
}

function mib(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)}MiB`
}

function field(value: string | null): string {
  return value === null ? "-" : sanitizeLogValue(value)
}

export function formatArrival(a: RequestArrival): string {
  const ua = a.userAgent === null ? "-" : sanitizeLogValue(a.userAgent).slice(0, MAX_UA)
  return (
    `[atlas/web] req seq=${a.seq} ${field(a.method)} ${field(a.path)}` +
    ` range=${field(a.range)} clen=${field(a.contentLength)}` +
    ` rss=${mib(a.rssBytes)} ua="${ua}"`
  )
}

export function formatCompletion(c: RequestCompletion): string {
  return (
    `[atlas/web] res seq=${c.seq} ${field(c.method)} ${field(c.path)}` +
    ` ${c.status} dur=${Math.round(c.durationMs)}ms rss=${mib(c.rssBytes)}`
  )
}
