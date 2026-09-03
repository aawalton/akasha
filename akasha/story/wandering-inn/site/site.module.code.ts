import { type Browser, type BrowserContext, chromium, type Page } from "playwright-core"

export const TABLE_OF_CONTENTS_URL = "https://wanderinginn.com/table-of-contents/"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
const VIEWPORT = { width: 1920, height: 1080 } as const

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-zygote",
  "--disable-gpu",
]

const EXTRA_HTTP_HEADERS = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  DNT: "1",
  "Upgrade-Insecure-Requests": "1",
} as const

const LAUNCH_CEILING_MS = 60_000
const CONTEXT_CEILING_MS = 30_000
const GOTO_CEILING_MS = 60_000
const READ_CEILING_MS = 120_000
const CHALLENGE_CEILING_MS = 30_000
const CLOSE_CEILING_MS = 15_000

export class ReadTookTooLong extends Error {}

async function within<T>(what: string, ceilingMs: number, act: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_, refuse) => {
    timer = setTimeout(
      () => refuse(new ReadTookTooLong(`${what} did not finish within ${ceilingMs}ms`)),
      ceilingMs
    )
  })
  try {
    return await Promise.race([act, ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}

async function quietly(what: string, act: Promise<unknown>): Promise<void> {
  await within(what, CLOSE_CEILING_MS, act).catch((thrown) => {
    console.log(`  ${what} did not close cleanly: ${String(thrown)}`)
  })
}

async function pastAnyChallenge(page: Page): Promise<void> {
  const held = await within(
    "challenge probe",
    CHALLENGE_CEILING_MS,
    page.evaluate(() => document.title.includes("Just a moment"))
  )
  if (!held) return
  console.log("  a challenge page stands in the way; waiting for it to clear")
  await page
    .waitForFunction(() => !document.title.includes("Just a moment"), {
      timeout: CHALLENGE_CEILING_MS,
    })
    .catch(() => console.log("  the challenge did not clear; reading what stands"))
}

export interface ListedChapter {
  readonly position: number
  readonly title: string
  readonly url: string
}

export interface ReadChapter {
  readonly patronOnly: boolean
  readonly ogTitle: string
  readonly docTitle: string
  readonly ogUrl: string
  readonly text: string
}

export interface Site {
  readonly readContents: () => Promise<readonly ListedChapter[]>
  readonly readChapter: (url: string) => Promise<ReadChapter>
  readonly close: () => Promise<void>
}

export async function openSite(): Promise<Site> {
  const browser: Browser = await within(
    "chromium launch",
    LAUNCH_CEILING_MS,
    chromium.launch({ headless: true, args: LAUNCH_ARGS })
  )
  let context: BrowserContext
  try {
    context = await within(
      "browser context",
      CONTEXT_CEILING_MS,
      browser.newContext({
        userAgent: USER_AGENT,
        viewport: VIEWPORT,
        extraHTTPHeaders: EXTRA_HTTP_HEADERS,
      })
    )
  } catch (thrown) {
    await quietly("browser", browser.close())
    throw thrown
  }

  async function reading<T>(url: string, extract: () => T): Promise<T> {
    const page = await within(`open a page for ${url}`, CONTEXT_CEILING_MS, context.newPage())
    try {
      return await within(
        `read ${url}`,
        READ_CEILING_MS,
        (async () => {
          await page.goto(url, { waitUntil: "networkidle", timeout: GOTO_CEILING_MS })
          await pastAnyChallenge(page)
          return page.evaluate(extract)
        })()
      )
    } finally {
      await quietly(`the page for ${url}`, page.close())
    }
  }

  return {
    readContents: async () => {
      const listed = await reading(TABLE_OF_CONTENTS_URL, () => {
        const out = []
        for (const entry of document.querySelectorAll(".chapter-entry")) {
          const link = entry.querySelector("a")
          if (link === null) continue
          const title = (link.textContent ?? "").trim()
          const url = link.href
          if (title === "" || url === "") continue
          out.push({ title, url })
        }
        return out
      })
      return listed.map((one, at) => ({ position: at + 1, title: one.title, url: one.url }))
    },
    readChapter: (url) =>
      reading(url, () => {
        const article = document.querySelector("#reader-content article")
        const gated =
          document.querySelector(".patreon-protected-post") !== null ||
          document.documentElement.outerHTML.includes(
            'action="https://wanderinginn.com/wp-login.php?action=postpass'
          )
        const meta = (property: string): string => {
          const found = document.querySelector(`meta[property="${property}"]`)
          return (found === null ? "" : (found.getAttribute("content") ?? "")).trim()
        }
        return {
          patronOnly: gated,
          ogTitle: meta("og:title"),
          docTitle: (document.querySelector("title")?.textContent ?? "").trim(),
          ogUrl: meta("og:url"),
          text: (article?.textContent ?? "").trim(),
        }
      }),
    close: async () => {
      await quietly("the browser context", context.close())
      await quietly("the browser", browser.close())
    },
  }
}
