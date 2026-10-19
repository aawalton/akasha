import {
  courseLinked,
  type Queued,
  queuedFrom,
  type Row,
} from "akasha/alan/collection/great-courses/modules/watching-queue/watching-queue.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"

import {
  followBuilds,
  reloadedFirst,
} from "akasha/infrastructure/service/akasha-service/browser-extension/modules/build-following/build-following.module.code.ts"
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

const ICON_FILE = "icon.png"

const COURSE_PAGES = "https://plus.thegreatcourses.com/*"

export const ICON =
  "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"

export const MANIFEST = {
  manifest_version: 3,
  name: "Great Courses Watching",
  version: "1.0.0",
  description: "Opens the next Great Courses lecture, plays it fast, and records what was watched.",
  permissions: ["storage", "alarms"],
  host_permissions: [`${SITE}/*`, "https://plus.thegreatcourses.com/*"],
  background: { service_worker: "worker.js" },
  icons: { 16: ICON_FILE, 32: ICON_FILE, 48: ICON_FILE },
  action: { default_title: READY, default_icon: { 16: ICON_FILE, 32: ICON_FILE, 48: ICON_FILE } },
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
  if (asked.kind === "watching" || asked.kind === "speed") return said
  try {
    if (asked.kind === "progressed") {
      const id = watching?.id ?? (await courseAt(asked.path))
      if (id === null) return { ...said, why: "akasha holds no page for this course" }
      return { ...said, why: await wrote(id, asked.lengthMinutes, asked.progressMinutes) }
    }
    if (watching === null) return said
    return { ...said, next: await onward(chrome, watching) }
  } catch (thrown) {
    return { ...said, why: saidBy(thrown) }
  }
}

async function courseAt(path: string): Promise<string | null> {
  return courseLinked(await rows(), (link) => sameCourse(link, path))
}

async function idle(chrome: Chrome): Promise<boolean> {
  return (await chrome.tabs.query({ url: COURSE_PAGES })).length === 0
}

export function runWorker(): undefined {
  const chrome = chromeOf()
  followBuilds(
    chrome,
    () => idle(chrome),
    () => begun(chrome)
  )
  chrome.action.onClicked.addListener(() => {
    void (async () => {
      if (await reloadedFirst(chrome)) return
      await begun(chrome)
    })()
  })
  chrome.runtime.onMessage.addListener((asked, sender, reply) => {
    void answered(chrome, asked as Asked, sender.tab?.id).then(reply)
    return true
  })
}
