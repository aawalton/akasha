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

const DEFAULT_SPEED = 3

const SITE = "https://alanwalton.com"

const COURSE = "great-course"

const WATCHING = "watching"

const SPEED = "speed"

const READY = "Watch the next lecture"

const ICON_FILE = "icon.png"

const COURSE_PAGES = "https://plus.thegreatcourses.com/*"

const PASSED = "passed-over"

export const ICON =
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACEFBMVEUAAAAACCgACDAACCgACCsACC0ACS0ABywABSoACS0ACSwACS0ACS0ACS0ACS0ACS0ACi0ACiwACCwACS0ACS4ACS0ACS0ACS0ACS0AECAACS0ACi0ABSoACSwACS0ACS0ACS0ACS0AEDAACS0ACS0ACyoACSwACCoABysACC0ACDAACS0ACS0ACC0ACSwACC0ABTAACC0ACCwACS0IDSwKDywnICqQXSEVFSsMECzUhRzKfxwlHyoECy3GfR3+nRjRgxwfGyoGDSzLgBz/nhi8dx0OESwYFyvdihv+nhiBVCJDMCjxlhnylhkyJymUXyGhZyAHDSwpICnvlRnqkhomHyqjaB9WOyY+Lij5mxh2TiMBCi0eGioREywQEizDex16UCMFDC1ONiaBVCMLDyxiQiVkQyV8USPulBk9LSjMgBzzlhkuJCmFVyIUFCtMNSb9nRisbR8CCi1oRiT6mxibYyCOXCHylxk6KygpISnfixoBCS21cx6HWCIEDC2DViJvSiS6dh7VhhsNECx1TSOtbh/0mBlONyfSgxyXYSGEViKmah8WFivPghzAeh0PEixKNCffixsGDC0wJSkaGCt5UCNMNSfYhxsiHSoGDS14TyPzlxngjBszJykcGSvaiBuRXSFROCbXhxv4mhmycR5VOiZUOiZTOSalaR/kjhr5mhhFMicrIilPNyZBLycDCy0KozkrAAAAM3RSTlMAAAACEBoYEAIWRIO1ydPRhUICEmzP+f1wAkxCCIP3+4eTAmyFAhAaGBACREIWTEIIEhYdionRAAACIUlEQVQ4y3WT91cTQRDHF1LhSjTHXSIhlVhRQMYoAjGWUSyg2MUIEht2MXajomLvihV77/ov+rbh3eMxP+3O53t7Uwmxm8vt8fr8ZByrqFRUTQ9o6oSJFWNp0KgyLaA2JwMhM2yUOfmkahOEzZ3XDAB6xMFrojHJYX5LaxsAxBM1Np60RjlkF+QWLgIAK/lfkbBxWLwEc0uXUYWS4rgsErdxaF+OuGJlFgBi1UEmMHQ7h1UdiNi5mh5NgwnCDg5rkFrXWnquZfUxHXzdeibYsJE9QSsWCTkEm3JMgJvpxaokhKQdfEs357iVXaOETFZHYX5bT+92wbGPuVQXmaJJXtixc9duyXEP82lu4g1IQf/efc37JT9wkPn0qcQjqlA4hK2HjwxIwdEM8wamken8F8Vjx/FE8aTkp07zzzQfmcGDPHMWsa90TgrOX+AC1U+IQg+lQUS8WLwk+OVeEVeaEFJHWzlE07sCVzm/dl3w0ExZ6vYbiHizdIsLbsvEzFm0GVUAcOcuIt67/4DV+WGbFIR5u02AR/TxjuHHLYg48CQvuM7bHayPATztpLEX+hHx2XPB4w3lfKRSigUvRl4ivnr95i3iO/GAlXAMbfb9h4/4qedzN34RPNloG+tEHGDo67fvXZmRHz8ZjymNjs1oYC3J/hqG339YgvUp52qVG2GTj1b+L1hm7ezg2PVsiqRVLaBrarSuabwF9/u8HrfL4foHqMy3XDSUSYoAAAAASUVORK5CYII="

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
  | { readonly kind: "onward"; readonly path: string; readonly passed: boolean }

export type Answered = {
  readonly watching: boolean
  readonly speed: number
  readonly next: string | null
  readonly why: string | null
  readonly progress: number | null
}

type Watching = { readonly tabId: number; readonly id: string; readonly link: string }

type Passed = { readonly day: string; readonly ids: readonly string[] }

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

function today(): string {
  return new Date().toLocaleDateString("en-CA")
}

async function passedIn(chrome: Chrome): Promise<readonly string[]> {
  const kept = (await chrome.storage.local.get(PASSED))[PASSED] as Passed | undefined
  return kept?.day === today() ? kept.ids : []
}

async function passedOver(chrome: Chrome, id: string): Promise<undefined> {
  const passed: Passed = { day: today(), ids: [...(await passedIn(chrome)), id] }
  await chrome.storage.local.set({ [PASSED]: passed })
}

async function queue(chrome: Chrome, skipping: string | null): Promise<readonly Queued[]> {
  const passed = await passedIn(chrome)
  return queuedFrom(await rows(), new Date()).filter(
    (one) => one.id !== skipping && !passed.includes(one.id)
  )
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
    const first = (await queue(chrome, null))[0]
    if (first === undefined) return await badged(chrome, "✓", "Done for today")
    await badged(chrome, "", READY)
    await opened(chrome, null, first)
  } catch (thrown) {
    await badged(chrome, "!", saidBy(thrown))
  }
}

async function onward(chrome: Chrome, watching: Watching, passed: boolean): Promise<string | null> {
  if (passed) await passedOver(chrome, watching.id)
  const next = (await queue(chrome, watching.id))[0]
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
  const said = { watching: watching !== null, speed, next: null, why: null, progress: null }
  if (asked.kind === "speed") return said
  try {
    if (asked.kind === "watching") {
      return { ...said, progress: progressOf(await courseAt(asked.path)) }
    }
    if (asked.kind === "progressed") {
      const id = watching?.id ?? (await courseAt(asked.path))?.id ?? null
      if (id === null) return { ...said, why: "akasha holds no page for this course" }
      return { ...said, why: await wrote(id, asked.lengthMinutes, asked.progressMinutes) }
    }
    if (watching === null) return said
    return { ...said, next: await onward(chrome, watching, asked.passed) }
  } catch (thrown) {
    return { ...said, why: saidBy(thrown) }
  }
}

async function courseAt(path: string): Promise<Row | null> {
  return courseLinked(await rows(), (link) => sameCourse(link, path))
}

export function progressOf(row: Row | null): number | null {
  if (row === null) return null
  const held = row.attributes.ownProgress
  return typeof held === "number" ? held : 0
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
