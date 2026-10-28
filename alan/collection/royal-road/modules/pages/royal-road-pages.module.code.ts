import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { chapterWords as countChapterWords } from "akasha/story/engine/core/modules/chapter-words/chapter-words.module.code.ts"
import { type Browser, chromium, type Page } from "playwright-core"
import { z } from "zod"

const ROYAL_ROAD_ORIGIN = "https://www.royalroad.com"

const FULL_BUILD = "chromium"

const UNMARKED = ["--disable-blink-features=AutomationControlled"]

const GOTO_CEILING_MS = 60_000

const CHALLENGE_CEILING_MS = 30_000

interface Browsing {
  readonly browser: Browser
  readonly account: Page
  readonly anonymous: Page
}

let launched: Promise<Browsing> | null = null

async function opening(): Promise<Browsing> {
  const browser = await chromium.launch({ headless: true, channel: FULL_BUILD, args: UNMARKED })
  const major = browser.version().split(".")[0]
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) " +
    `Chrome/${major}.0.0.0 Safari/537.36`
  const page = async (): Promise<Page> =>
    await (await browser.newContext({ userAgent, locale: "en-US" })).newPage()
  return { browser, account: await page(), anonymous: await page() }
}

function browsing(): Promise<Browsing> {
  launched ??= opening()
  return launched
}

export async function accountPage(): Promise<Page> {
  return (await browsing()).account
}

export async function closeBrowsing(): Promise<void> {
  const open = await launched?.catch(() => null)
  launched = null
  await open?.browser.close()
}

const REQUEST_DELAY_MS = 1500

export function betweenRequests(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS))
}

export function royalRoadUrl(path: string): string {
  return path.startsWith("http") ? path : `${ROYAL_ROAD_ORIGIN}${path}`
}

export interface RawChapter {
  readonly id: string
  readonly title: string
  readonly url: string
  readonly order: number
  readonly date: string
  readonly isUnlocked: boolean
  readonly visible: boolean
}

interface FictionMeta {
  readonly title: string | null
  readonly author: string | null
  readonly status: string | null
  readonly description: string | null
  readonly tags: readonly string[]
}

interface ParsedFiction {
  readonly meta: FictionMeta
  readonly chapters: readonly RawChapter[]
}

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&#39;": "'",
  "&apos;": "'",
  "&quot;": '"',
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&#39;|&apos;|&quot;/g, (m) => ENTITIES[m] ?? m)
}

function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const CHAPTERS_WITH_VOLUMES = /window\.chapters\s*=\s*(\[[\s\S]*?\]);\s*window\.volumes/
const CHAPTERS_PLAIN = /window\.chapters\s*=\s*(\[[\s\S]*?\]);/

const CHAPTER_LIST = z.array(
  z.object({
    id: z.union([z.number(), z.string()]),
    title: z.string().nullish(),
    url: z.string(),
    order: z.number(),
    date: z.string(),
    isUnlocked: z.boolean().nullish(),
    visible: z.union([z.number(), z.boolean()]).nullish(),
  })
)

function parseChapterList(html: string): readonly RawChapter[] {
  const raw =
    firstCapture(CHAPTERS_WITH_VOLUMES.exec(html)) ?? firstCapture(CHAPTERS_PLAIN.exec(html))
  if (raw === null) return []
  let list: z.infer<typeof CHAPTER_LIST>
  try {
    list = CHAPTER_LIST.parse(JSON.parse(raw))
  } catch {
    return []
  }
  return list.map((one) => ({
    id: String(one.id),
    title: decodeEntities(one.title ?? "").trim(),
    url: one.url,
    order: one.order,
    date: one.date,
    isUnlocked: one.isUnlocked !== false,
    visible: one.visible === undefined ? true : one.visible === 1 || one.visible === true,
  }))
}

const KNOWN_STATUS = ["ONGOING", "COMPLETED", "HIATUS", "STUBBED", "DROPPED"]

function textOfAll(html: string, pattern: RegExp): string[] {
  const out: string[] = []
  for (const m of html.matchAll(pattern)) {
    const inner = m[1]
    if (inner === undefined) continue
    const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim()
    if (text.length > 0) out.push(text)
  }
  return out
}

function parseStatus(html: string): string | null {
  const labels = textOfAll(html, /<span[^>]*class="[^"]*\blabel\b[^"]*"[^>]*>([\s\S]*?)<\/span>/gi)
  for (const label of labels) {
    const upper = label.toUpperCase()
    if (KNOWN_STATUS.includes(upper)) return upper
  }
  return null
}

function parseTags(html: string): readonly string[] {
  const tags = textOfAll(html, /<a[^>]*class="[^"]*\bfiction-tag\b[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)
  return [...new Set(tags)]
}

const NAMED = z.looseObject({ name: z.string().optional() })

const BOOK_LD = z.looseObject({
  "@type": z.union([z.string(), z.array(z.string())]).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  author: z.union([NAMED, z.array(NAMED)]).optional(),
})

type BookLd = z.infer<typeof BOOK_LD>

const LD_BLOCK = z.union([z.array(z.unknown()), z.unknown().transform((one) => [one])])

function parseBookLd(html: string): BookLd | null {
  for (const m of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    const body = m[1]
    if (body === undefined) continue
    let candidates: readonly unknown[]
    try {
      candidates = LD_BLOCK.parse(JSON.parse(body))
    } catch {
      continue
    }
    for (const candidate of candidates) {
      const one = BOOK_LD.safeParse(candidate).data
      if (one === undefined) continue
      const type = one["@type"]
      const isBook = Array.isArray(type) ? type.includes("Book") : type === "Book"
      if (isBook) return one
    }
  }
  return null
}

function firstAuthorName(field: BookLd["author"]): string | null {
  if (field === undefined) return null
  if (Array.isArray(field)) return field[0]?.name ?? null
  return field.name ?? null
}

export function parseFictionPage(html: string): ParsedFiction {
  const ld = parseBookLd(html)
  const author = firstAuthorName(ld?.author)
  const h1 = firstCapture(/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html))
  const fallbackTitle = h1 === null ? null : decodeEntities(h1.replace(/<[^>]*>/g, "")).trim()
  return {
    meta: {
      title: ld?.name ?? fallbackTitle,
      author: author ?? null,
      status: parseStatus(html),
      description: ld?.description === undefined ? null : htmlToText(ld.description),
      tags: parseTags(html),
    },
    chapters: parseChapterList(html),
  }
}

const OPEN_TAG = z.tuple([z.string()])

function innerHtmlOfDiv(html: string, openPattern: RegExp): string | null {
  const opened = OPEN_TAG.safeParse(openPattern.exec(html)).data?.[0]
  if (opened === undefined) return null
  const from = html.indexOf(opened) + opened.length
  const inside = html.slice(from)
  let depth = 1
  for (const m of inside.matchAll(/<(\/?)div\b[^>]*>/gi)) {
    depth += m[1] === "/" ? -1 : 1
    if (depth === 0) return inside.slice(0, m.index)
  }
  return inside
}

type ProseRead =
  | { readonly ok: true; readonly text: string; readonly wordCount: number }
  | { readonly ok: false; readonly why: string }

const NO_CONTAINER = "no `chapter-content` div is in the page"

const NO_TEXT =
  "the `chapter-content` div holds no text: no `<p>` in it carries any, and nothing survives " +
  "reading its layout as line breaks either"

export function parseChapterProse(html: string): ProseRead {
  const container = innerHtmlOfDiv(html, /<div[^>]*class="[^"]*\bchapter-content\b[^"]*"[^>]*>/i)
  if (container === null) return { ok: false, why: NO_CONTAINER }
  const paragraphs: string[] = []
  for (const m of container.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const inner = m[1]
    if (inner === undefined) continue
    const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim()
    if (text.length > 0) paragraphs.push(text)
  }
  const text = paragraphs.length > 0 ? paragraphs.join("\n\n") : htmlToText(container)
  if (text.length === 0) return { ok: false, why: NO_TEXT }
  return { ok: true, text, wordCount: countChapterWords(text) }
}

const NO_BODY = new Set([101, 103, 204, 205, 304])

const CHALLENGED = 403

const TOO_MANY = 429

const SERVER_FAULT = 500

const WAITS_MS: readonly number[] = [5_000, 15_000, 45_000]

export function passing(status: number): boolean {
  return status === CHALLENGED || status === TOO_MANY || status >= SERVER_FAULT
}

function slept(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function steadily(
  send: () => Promise<Response>,
  wait: (ms: number) => Promise<void> = slept,
  waits: readonly number[] = WAITS_MS
): Promise<Response> {
  for (const ms of waits) {
    const answer = await send().catch((thrown: unknown) => {
      if (thrown instanceof Error) return null
      throw thrown
    })
    if (answer !== null && !passing(answer.status)) return answer
    await wait(ms)
  }
  return await send()
}

export async function answerFrom(url: string, asAccount = false): Promise<Response> {
  const open = await browsing()
  return await steadily(() => answerOnce(asAccount ? open.account : open.anonymous, url))
}

async function loaded(page: Page, url: string): Promise<Response> {
  const answer = await page.goto(url, { waitUntil: "domcontentloaded", timeout: GOTO_CEILING_MS })
  if (answer === null) throw new Error(`${url} answered no page`)
  const status = answer.status()
  const headers = new Headers()
  for (const { name, value } of await answer.headersArray()) headers.append(name, value)
  return new Response(NO_BODY.has(status) ? null : await answer.text(), { status, headers })
}

const CHALLENGE_TITLE = "Just a moment"

async function answerOnce(page: Page, url: string): Promise<Response> {
  const first = await loaded(page, url)
  if (!botChecking(first.headers, await first.clone().text())) return first
  await page
    .waitForFunction(`!document.title.startsWith(${JSON.stringify(CHALLENGE_TITLE)})`, undefined, {
      timeout: CHALLENGE_CEILING_MS,
    })
    .catch(() => undefined)
  return await loaded(page, url)
}

const CLOUDFLARE_MITIGATED = "cf-mitigated"

const CLOUDFLARE_CHALLENGE = "challenge"

const CHALLENGE_MARKS: readonly string[] = [
  'id="anubis_challenge"',
  "<title>Just a moment...</title>",
]

export class BotChecked extends Error {}

export function botChecking(headers: Headers, body: string): boolean {
  if (headers.get(CLOUDFLARE_MITIGATED) === CLOUDFLARE_CHALLENGE) return true
  return CHALLENGE_MARKS.some((mark) => body.includes(mark))
}

export async function checkedText(url: string, response: Response): Promise<string> {
  const body = await response.text()
  if (botChecking(response.headers, body)) {
    throw new BotChecked(`Royal Road answered ${url} with a bot check`)
  }
  return body
}

export async function fetchHtml(url: string, asAccount = false): Promise<string> {
  const response = await answerFrom(url, asAccount)
  const body = await checkedText(url, response)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
  return body
}
