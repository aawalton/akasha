import type { Chrome } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

export const BUILD_FILE = "build.txt"

const STARTED = "build-started-on"

const RESUMING = "build-resuming"

const ALARM = "build-following"

const EVERY_MINUTES = 1

export type Following = {
  readonly alarms: Chrome["alarms"]
  readonly runtime: Pick<Chrome["runtime"], "getURL" | "reload">
  readonly storage: Chrome["storage"]
}

async function builtNow(chrome: Following): Promise<string | null> {
  try {
    const answer = await fetch(chrome.runtime.getURL(BUILD_FILE), { cache: "no-store" })
    if (!answer.ok) return null
    const text = (await answer.text()).trim()
    return text === "" ? null : text
  } catch {
    return null
  }
}

async function startedOn(chrome: Following): Promise<string | null> {
  const kept = await chrome.storage.session.get(STARTED)
  const held = kept[STARTED]
  if (typeof held === "string") return held
  const now = await builtNow(chrome)
  if (now !== null) await chrome.storage.session.set({ [STARTED]: now })
  return now
}

export async function stale(chrome: Following): Promise<boolean> {
  const started = await startedOn(chrome)
  if (started === null) return false
  const now = await builtNow(chrome)
  return now !== null && now !== started
}

export async function reloadedFirst(chrome: Following): Promise<boolean> {
  if (!(await stale(chrome))) return false
  await chrome.storage.local.set({ [RESUMING]: true })
  chrome.runtime.reload()
  return true
}

async function resumed(chrome: Following): Promise<boolean> {
  const kept = await chrome.storage.local.get(RESUMING)
  if (kept[RESUMING] !== true) return false
  await chrome.storage.local.remove(RESUMING)
  return true
}

export function followBuilds(
  chrome: Following,
  idle: () => Promise<boolean>,
  pressed: () => Promise<undefined>
): undefined {
  void chrome.alarms.create(ALARM, { periodInMinutes: EVERY_MINUTES })
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name !== ALARM) return
    void (async () => {
      if ((await idle()) && (await stale(chrome))) chrome.runtime.reload()
    })()
  })
  void (async () => {
    await startedOn(chrome)
    if (await resumed(chrome)) await pressed()
  })()
}
