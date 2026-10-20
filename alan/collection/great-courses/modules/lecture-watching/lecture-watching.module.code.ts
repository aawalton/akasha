import type {
  Answered,
  Asked,
} from "akasha/alan/collection/great-courses/browser-extensions/watching/great-courses-watching.browser-extension.extension-worker.code.ts"
import {
  type Course,
  finishedThrough,
  type Lecture,
  lengthened,
  placeOf,
} from "akasha/alan/collection/great-courses/modules/lecture-progress/lecture-progress.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Chrome } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

const PLAYING = "lecplay"

const WATCHED_AT = 0.95

const STEP = 0.25

const DOUBLING = 2

const SLOWEST = 0.5

const FASTEST = 4

const SHOWN_MS = 1500

const AT_THE_END_SECONDS = 1

const SHORTEST_LECTURE_SECONDS = 60

const PANEL =
  "position:fixed;right:24px;bottom:24px;z-index:2147483647;padding:16px 20px;border-radius:12px;" +
  "color-scheme:dark;background:Canvas;color:CanvasText;font:15px/1.4 system-ui,sans-serif;max-width:360px"

const HELD = new WeakSet<HTMLVideoElement>()

const ENDING: Array<(seconds: number) => void> = []

const NOW = { speed: 3, stopped: false }

function onTheQuarters(speed: number): number {
  return Math.min(FASTEST, Math.max(SLOWEST, Math.round(speed / STEP) * STEP))
}

export function nudged(speed: number, by: number): number {
  return onTheQuarters(speed + by)
}

export function scaled(speed: number, by: number): number {
  return onTheQuarters(speed * by)
}

function lecturesHere(): readonly Lecture[] {
  const found = new Map<number, Lecture>()
  for (const one of document.querySelectorAll<HTMLElement>(".play-lecture[data-idx]")) {
    const index = Number(one.dataset.idx)
    const seconds = Number(one.dataset.len)
    const id = one.dataset.lecId
    if (id === undefined || !(index >= 1) || !(seconds >= 0)) continue
    found.set(index, { id, index, seconds })
  }
  return [...found.values()]
}

export function progressIn(answer: Answered): number {
  if (answer.why !== null) throw new Error(answer.why)
  if (answer.progress === null) throw new Error("akasha holds no page for this course")
  return answer.progress
}

async function progressNow(ask: (asked: Asked) => Promise<Answered>): Promise<number> {
  return progressIn(await ask({ kind: "watching", path: location.pathname }))
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
  let length = 0
  const finished = () => {
    for (const one of ENDING.splice(0)) one(length)
  }
  const ended = () => {
    if (video.duration < SHORTEST_LECTURE_SECONDS) return
    length = video.duration
    finished()
  }
  const replaced = () => {
    if (reached >= WATCHED_AT) finished()
    reached = 0
  }
  const stoppedAtTheEnd = () => {
    if (video.duration - video.currentTime < AT_THE_END_SECONDS) ended()
  }
  video.addEventListener("ended", ended)
  video.addEventListener("pause", stoppedAtTheEnd)
  video.addEventListener("waiting", stoppedAtTheEnd)
  video.addEventListener("emptied", replaced)
  video.addEventListener("loadstart", replaced)
  video.addEventListener("timeupdate", () => {
    if (!(video.duration >= SHORTEST_LECTURE_SECONDS)) return
    length = video.duration
    const at = video.currentTime / video.duration
    if (at < reached - WATCHED_AT) return replaced()
    reached = Math.max(reached, at)
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
    NOW.speed = event.ctrlKey
      ? scaled(NOW.speed, by > 0 ? DOUBLING : 1 / DOUBLING)
      : nudged(NOW.speed, by)
    for (const one of document.querySelectorAll("video")) one.playbackRate = NOW.speed
    told(`${NOW.speed}×`)
    void ask({ kind: "speed", speed: NOW.speed })
  }
}

function lectureEnded(): Promise<number> {
  return new Promise((resolve) => ENDING.push(resolve))
}

export function recordedSaid(course: Course): string {
  return `Recorded ${course.lecturesWatched} / ${course.lectures} lectures.`
}

async function goneOn(ask: (asked: Asked) => Promise<Answered>, said: string, passed: boolean) {
  const panel = panelOf(`${said} Opening the next course…`)
  const answer = await ask({ kind: "onward", path: location.pathname, passed })
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
  await goneOn(ask, recordedSaid(course), false)
}

async function watched(
  ask: (asked: Asked) => Promise<Answered>,
  lectures: readonly Lecture[],
  progress: number
): Promise<undefined> {
  const lecture = lectures.find((one) => one.index === Number(playingHere()))
  if (lecture === undefined) {
    const now = placeOf(lectures, progress)
    if (now.next === null) return await recorded(ask, now)
    const next = new URL(location.href)
    next.searchParams.set(PLAYING, String(now.next))
    location.replace(next.toString())
    return
  }
  const seconds = await lectureEnded()
  NOW.stopped = true
  for (const one of document.querySelectorAll("video")) one.pause()
  const played = lengthened(lectures, lecture.index, seconds)
  await recorded(ask, finishedThrough(played, await progressNow(ask), lecture.index))
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
  if (lectures.length === 0) {
    if (answer.watching) {
      await goneOn(ask, "This course lists no lecture the extension can play.", true)
    }
    return
  }
  try {
    if (answer.watching) await watched(ask, lectures, progressIn(answer))
    else await recordedEach(ask, lectures)
  } catch (thrown) {
    panelOf(`Watching stopped: ${saidBy(thrown)}`)
  }
}

async function recordedEach(
  ask: (asked: Asked) => Promise<Answered>,
  lectures: readonly Lecture[]
): Promise<never> {
  for (;;) {
    const seconds = await lectureEnded()
    const playing = lectures.find((one) => one.index === Number(playingHere()))
    try {
      if (playing === undefined) throw new Error("the page does not say which lecture played")
      const played = lengthened(lectures, playing.index, seconds)
      const now = finishedThrough(played, await progressNow(ask), playing.index)
      const answer = await ask({
        kind: "progressed",
        path: location.pathname,
        lengthMinutes: now.lengthMinutes,
        progressMinutes: now.progressMinutes,
      })
      if (answer.why !== null) throw new Error(answer.why)
      told(recordedSaid(now))
    } catch (thrown) {
      panelOf(`This lecture was not recorded: ${saidBy(thrown)}`)
    }
  }
}

function playingHere(): string | null {
  return new URLSearchParams(location.search).get(PLAYING)
}

export function watchLectures(chrome: Chrome): undefined {
  const ask = async (asked: Asked) => (await chrome.runtime.sendMessage(asked)) as Answered
  void begun(ask)
}
