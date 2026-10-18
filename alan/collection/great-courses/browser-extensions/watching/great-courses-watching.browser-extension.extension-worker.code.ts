import {
  type Queued,
  queuedFrom,
  type Row,
} from "akasha/alan/collection/great-courses/modules/watching-queue/watching-queue.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  type Chrome,
  chromeOf,
} from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

export const DEFAULT_SPEED = 3

const SITE = "https://alanwalton.com"

const COURSE = "great-course"

const WATCHING = "watching"

const SPEED = "speed"

const READY = "Watch the next lecture"

export const MANIFEST = {
  manifest_version: 3,
  name: "Great Courses Watching",
  version: "1.0.0",
  description: "Opens the next Great Courses lecture, plays it fast, and records what was watched.",
  permissions: ["storage"],
  host_permissions: [`${SITE}/*`, "https://plus.thegreatcourses.com/*"],
  background: { service_worker: "worker.js" },
  action: { default_title: READY },
  content_scripts: [
    { matches: ["https://plus.thegreatcourses.com/*"], js: ["site.js"], run_at: "document_idle" },
  ],
}

export type Asked =
  | { readonly kind: "watching"; readonly path: string }
  | { readonly kind: "speed"; readonly speed: number }
  | {
      readonly kind: "progressed"
      readonly path: string
      readonly lengthMinutes: number
      readonly progressMinutes: number
    }
  | { readonly kind: "onward"; readonly path: string }

export type Answered = {
  readonly watching: boolean
  readonly speed: number
  readonly next: string | null
  readonly why: string | null
}

type Watching = { readonly tabId: number; readonly id: string; readonly link: string }

function lastOf(path: string): string {
  return (
    path
      .split("/")
      .filter((one) => one !== "")
      .pop() ?? ""
  )
}

export function sameCourse(link: string, path: string): boolean {
  return lastOf(new URL(link).pathname) === lastOf(path)
}

export function writeOf(id: string, lengthMinutes: number, progressMinutes: number): string {
  return JSON.stringify({
    op: "patchPage",
    args: {
      pageTypeSlug: COURSE,
      where: [{ key: "id", eq: id }],
      set: { ownLength: lengthMinutes, ownProgress: Math.min(progressMinutes, lengthMinutes) },
    },
  })
}

async function rows(): Promise<readonly Row[]> {
  const answer = await fetch(`${SITE}/api/pages/${COURSE}`, {
    credentials: "include",
    headers: { accept: "application/json" },
  })
  if (answer.status === 401) throw new Error("sign in to alanwalton.com, then try again")
  if (!answer.ok) throw new Error(`alanwalton.com answered ${answer.status}`)
  const body = (await answer.json()) as { readonly rows?: readonly Row[] }
  return body.rows ?? []
}

async function queue(skipping: string | null): Promise<readonly Queued[]> {
  return queuedFrom(await rows(), new Date()).filter((one) => one.id !== skipping)
}

async function wrote(id: string, lengthMinutes: number, progressMinutes: number) {
  const answer = await fetch(`${SITE}/api/page-write`, {
    method: "POST",
    credentials: "include",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: writeOf(id, lengthMinutes, progressMinutes),
  })
  if (answer.ok) return null
  const body = (await answer.json().catch(() => ({}))) as { readonly error?: unknown }
  return `alanwalton.com refused the write with ${answer.status}: ${String(body.error ?? "")}`
}

async function watchingIn(chrome: Chrome): Promise<Watching | null> {
  const kept = await chrome.storage.session.get(WATCHING)
  return (kept[WATCHING] as Watching | undefined) ?? null
}

async function speedIn(chrome: Chrome): Promise<number> {
  const kept = await chrome.storage.local.get(SPEED)
  const held = kept[SPEED]
  return typeof held === "number" ? held : DEFAULT_SPEED
}

async function badged(chrome: Chrome, text: string, title: string): Promise<undefined> {
  await chrome.action.setBadgeText({ text })
  await chrome.action.setTitle({ title })
}

async function opened(chrome: Chrome, tabId: number | null, next: Queued): Promise<undefined> {
  const tab =
    tabId === null
      ? await chrome.tabs.create({ url: next.link })
      : await chrome.tabs.update(tabId, { url: next.link })
  if (tab?.id === undefined) return
  const watching: Watching = { tabId: tab.id, id: next.id, link: next.link }
  await chrome.storage.session.set({ [WATCHING]: watching })
}

async function begun(chrome: Chrome): Promise<undefined> {
  try {
    const first = (await queue(null))[0]
    if (first === undefined) return await badged(chrome, "✓", "Done for today")
    await badged(chrome, "", READY)
    await opened(chrome, null, first)
  } catch (thrown) {
    await badged(chrome, "!", saidBy(thrown))
  }
}

async function onward(chrome: Chrome, watching: Watching): Promise<string | null> {
  const next = (await queue(watching.id))[0]
  if (next !== undefined) {
    await opened(chrome, watching.tabId, next)
    return next.title
  }
  await chrome.storage.session.remove(WATCHING)
  await badged(chrome, "✓", "Done for today")
  return null
}

async function answered(
  chrome: Chrome,
  asked: Asked,
  tabId: number | undefined
): Promise<Answered> {
  if (asked.kind === "speed") await chrome.storage.local.set({ [SPEED]: asked.speed })
  const speed = await speedIn(chrome)
  const kept = await watchingIn(chrome)
  const watching =
    kept !== null &&
    asked.kind !== "speed" &&
    kept.tabId === tabId &&
    sameCourse(kept.link, asked.path)
      ? kept
      : null
  const said = { watching: watching !== null, speed, next: null, why: null }
  if (watching === null || asked.kind === "watching" || asked.kind === "speed") return said
  try {
    if (asked.kind === "progressed") {
      return { ...said, why: await wrote(watching.id, asked.lengthMinutes, asked.progressMinutes) }
    }
    return { ...said, next: await onward(chrome, watching) }
  } catch (thrown) {
    return { ...said, why: saidBy(thrown) }
  }
}

export function runWorker(): undefined {
  const chrome = chromeOf()
  chrome.action.onClicked.addListener(() => {
    void begun(chrome)
  })
  chrome.runtime.onMessage.addListener((asked, sender, reply) => {
    void answered(chrome, asked as Asked, sender.tab?.id).then(reply)
    return true
  })
}
