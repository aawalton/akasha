import type {
  Answered,
  Asked,
} from "akasha/alan/collection/great-courses/browser-extensions/watching/great-courses-watching.browser-extension.extension-worker.code.ts"
import {
  type Course,
  courseOf,
  type Lecture,
  type Played,
} from "akasha/alan/collection/great-courses/modules/lecture-progress/lecture-progress.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Chrome } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

const PROGRESS_AT = "https://m2api.thegreatcourses.com/rest/V1/lectureprogress/mine/"

const TOKEN_AT = "/toa/token/post"

const TOKEN_KEPT = "a"

const PLAYING = "lecplay"

const WATCHED_AT = 0.95

const STEP = 0.25

const SLOWEST = 0.5

const FASTEST = 4

const SAVED_BY_THE_SITE_MS = 2000

const SHOWN_MS = 1500

const NEAR_THE_END_SECONDS = 1.5

const COURSE_IN_LECTURE = /(\d+)-L\d+$/

const SHORTEST_LECTURE_SECONDS = 60

const PANEL =
  "position:fixed;right:24px;bottom:24px;z-index:2147483647;padding:16px 20px;border-radius:12px;" +
  "color-scheme:dark;background:Canvas;color:CanvasText;font:15px/1.4 system-ui,sans-serif;max-width:360px"

const HELD = new WeakSet<HTMLVideoElement>()

const ENDING: Array<() => void> = []

const NOW = { speed: 3, stopped: false }

export function nudged(speed: number, by: number): number {
  return Math.min(FASTEST, Math.max(SLOWEST, Math.round((speed + by) / STEP) * STEP))
}

function lecturesHere(): readonly Lecture[] {
  const found = new Map<number, Lecture>()
  for (const one of document.querySelectorAll<HTMLElement>(".play-lecture[data-idx]")) {
    const index = Number(one.dataset.idx)
    const seconds = Number(one.dataset.len)
    const id = one.dataset.lecId
    const at = Number(one.dataset.lecCompPercent)
    if (id === undefined || !(index >= 1) || !(seconds > 0)) continue
    found.set(index, { id, index, seconds, watchedAt: at > 0 ? at : WATCHED_AT })
  }
  return [...found.values()]
}

export function courseFrom(sku: string | undefined, lectureId: string | undefined): string | null {
  if (sku !== undefined && sku !== "") return sku
  return COURSE_IN_LECTURE.exec(lectureId ?? "")?.[1] ?? null
}

function courseHere(lectures: readonly Lecture[]): string | null {
  const sku = document.querySelector<HTMLElement>(".media[data-sku]")?.dataset.sku
  return courseFrom(sku, lectures[0]?.id)
}

async function token(): Promise<string> {
  try {
    const kept = JSON.parse(localStorage.getItem(TOKEN_KEPT) ?? "{}") as { t?: string; e?: number }
    if (kept.t !== undefined && (kept.e ?? 0) > Date.now() / 1000) return kept.t
  } catch {}
  const answer = await fetch(TOKEN_AT, {
    method: "POST",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  })
  const body = answer.ok ? ((await answer.json()) as { t?: string }) : {}
  if (body.t === undefined)
    throw new Error("the site gave no token, so sign in to The Great Courses")
  localStorage.setItem(TOKEN_KEPT, JSON.stringify(body))
  return body.t
}

async function playedHere(course: string): Promise<Played> {
  const answer = await fetch(`${PROGRESS_AT}?course_id=${encodeURIComponent(course)}`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
  })
  if (!answer.ok) throw new Error(`the site's lecture progress answered ${answer.status}`)
  const body = (await answer.json()) as {
    items?: readonly { lecture_id?: unknown; progress?: unknown }[]
  }
  const played: Record<string, number> = {}
  for (const one of body.items ?? []) {
    if (typeof one.lecture_id === "string") played[one.lecture_id] = Number(one.progress) || 0
  }
  return played
}

function panelOf(text: string): HTMLDivElement {
  const panel = document.createElement("div")
  panel.style.cssText = PANEL
  panel.textContent = text
  document.body.append(panel)
  return panel
}

function told(text: string): undefined {
  const panel = panelOf(text)
  setTimeout(() => panel.remove(), SHOWN_MS)
}

function hold(video: HTMLVideoElement): undefined {
  if (HELD.has(video)) return
  HELD.add(video)
  const kept = () => {
    if (NOW.stopped && !video.paused) video.pause()
    if (Math.abs(video.playbackRate - NOW.speed) > 0.01) video.playbackRate = NOW.speed
  }
  for (const one of ["loadedmetadata", "play", "playing", "ratechange"]) {
    video.addEventListener(one, kept)
  }
  let reached = 0
  const finished = () => {
    for (const one of ENDING.splice(0)) one()
  }
  const ended = () => {
    if (video.duration < SHORTEST_LECTURE_SECONDS) return
    finished()
  }
  const replaced = () => {
    if (reached >= WATCHED_AT) finished()
    reached = 0
  }
  video.addEventListener("ended", ended)
  video.addEventListener("emptied", replaced)
  video.addEventListener("loadstart", replaced)
  video.addEventListener("timeupdate", () => {
    if (!(video.duration >= SHORTEST_LECTURE_SECONDS)) return
    const at = video.currentTime / video.duration
    if (at < reached - WATCHED_AT) return replaced()
    reached = Math.max(reached, at)
    const left = video.duration - video.currentTime
    if (left < NEAR_THE_END_SECONDS * Math.max(1, video.playbackRate)) ended()
  })
  kept()
}

function holdEvery(): undefined {
  for (const one of document.querySelectorAll("video")) hold(one)
}

function keyedBy(ask: (asked: Asked) => Promise<Answered>) {
  return (event: KeyboardEvent): undefined => {
    const target = event.target
    if (target instanceof HTMLElement && target.closest("input,textarea") !== null) return
    const by = event.key === ">" ? STEP : event.key === "<" ? -STEP : 0
    if (by === 0) return
    event.preventDefault()
    event.stopPropagation()
    NOW.speed = nudged(NOW.speed, by)
    for (const one of document.querySelectorAll("video")) one.playbackRate = NOW.speed
    told(`${NOW.speed}×`)
    void ask({ kind: "speed", speed: NOW.speed })
  }
}

function lectureEnded(): Promise<undefined> {
  return new Promise((resolve) => ENDING.push(() => resolve(undefined)))
}

export function recordedSaid(course: Course): string {
  return `Recorded ${course.lecturesWatched} / ${course.lectures} lectures.`
}

async function goneOn(ask: (asked: Asked) => Promise<Answered>, said: string) {
  const panel = panelOf(`${said} Opening the next course…`)
  const answer = await ask({ kind: "onward", path: location.pathname })
  if (answer.next !== null) return
  panel.textContent = answer.why ?? "Done for today — every course has had its lecture."
}

async function recorded(
  ask: (asked: Asked) => Promise<Answered>,
  course: Course
): Promise<undefined> {
  const answer = await ask({
    kind: "progressed",
    path: location.pathname,
    lengthMinutes: course.lengthMinutes,
    progressMinutes: course.progressMinutes,
  })
  if (answer.why !== null) {
    panelOf(`This lecture was not recorded: ${answer.why}`)
    return
  }
  await goneOn(ask, recordedSaid(course))
}

async function watched(
  ask: (asked: Asked) => Promise<Answered>,
  lectures: readonly Lecture[],
  course: string
): Promise<undefined> {
  const playing = Number(new URLSearchParams(location.search).get(PLAYING))
  const lecture = lectures.find((one) => one.index === playing)
  if (lecture === undefined) {
    const now = courseOf(lectures, await playedHere(course))
    if (now.next === null) return await recorded(ask, now)
    const next = new URL(location.href)
    next.searchParams.set(PLAYING, String(now.next))
    location.replace(next.toString())
    return
  }
  await lectureEnded()
  NOW.stopped = true
  for (const one of document.querySelectorAll("video")) one.pause()
  await new Promise((resolve) => setTimeout(resolve, SAVED_BY_THE_SITE_MS))
  const played = await playedHere(course).catch(() => ({}))
  await recorded(ask, courseOf(lectures, { ...played, [lecture.id]: lecture.seconds }))
}

async function begun(ask: (asked: Asked) => Promise<Answered>): Promise<undefined> {
  const answer = await ask({ kind: "watching", path: location.pathname })
  NOW.speed = answer.speed
  new MutationObserver(holdEvery).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
  holdEvery()
  document.addEventListener("keydown", keyedBy(ask), true)
  const lectures = lecturesHere()
  const course = courseHere(lectures)
  if (lectures.length === 0 || course === null) {
    if (answer.watching) {
      panelOf("Watching stopped: this page lists no lectures the extension can read.")
    }
    return
  }
  try {
    if (answer.watching) await watched(ask, lectures, course)
    else await recordedEach(ask, lectures, course)
  } catch (thrown) {
    panelOf(`Watching stopped: ${saidBy(thrown)}`)
  }
}

async function recordedEach(
  ask: (asked: Asked) => Promise<Answered>,
  lectures: readonly Lecture[],
  course: string
): Promise<never> {
  for (;;) {
    await lectureEnded()
    await new Promise((resolve) => setTimeout(resolve, SAVED_BY_THE_SITE_MS))
    const played = await playedHere(course)
    const playing = lectures.find((one) => one.index === Number(playingHere()))
    const now = courseOf(
      lectures,
      playing === undefined ? played : { ...played, [playing.id]: playing.seconds }
    )
    const answer = await ask({
      kind: "progressed",
      path: location.pathname,
      lengthMinutes: now.lengthMinutes,
      progressMinutes: now.progressMinutes,
    })
    if (answer.why === null) told(recordedSaid(now))
    else panelOf(`This lecture was not recorded: ${answer.why}`)
  }
}

function playingHere(): string | null {
  return new URLSearchParams(location.search).get(PLAYING)
}

export function watchLectures(chrome: Chrome): undefined {
  const ask = async (asked: Asked) => (await chrome.runtime.sendMessage(asked)) as Answered
  void begun(ask)
}
