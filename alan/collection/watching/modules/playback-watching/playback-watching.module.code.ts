import type { Sighting } from "akasha/alan/collection/watching/modules/episode-recording/episode-recording.module.code.ts"
import type { Chrome } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"
import { told as toldFor } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/site-telling/site-telling.module.code.ts"

export type Answered = {
  readonly said: string
  readonly recorded: boolean
}

export type Sighted = () => Sighting | null

const WATCHED_AT = 0.9

const SHORTEST_SECONDS = 60

const AT_THE_END_SECONDS = 1

const SHOWN_MS = 8000

const SEND = "watched"

const HELD = new WeakSet<HTMLVideoElement>()

export function watchedTo(current: number, duration: number): boolean {
  if (!(duration >= SHORTEST_SECONDS)) return false
  return current / duration >= WATCHED_AT
}

export function nearlyEnded(current: number, duration: number): boolean {
  return duration >= SHORTEST_SECONDS && duration - current <= AT_THE_END_SECONDS
}

export function minutesOf(duration: number): number {
  return duration / 60
}

function told(text: string): undefined {
  return toldFor(text, SHOWN_MS)
}

function hold(video: HTMLVideoElement, report: (minutes: number) => void): undefined {
  if (HELD.has(video)) return
  HELD.add(video)
  let reached = 0
  let done = false
  const finished = () => {
    if (done) return
    if (!(video.duration >= SHORTEST_SECONDS)) return
    done = true
    report(minutesOf(video.duration))
  }
  const replaced = () => {
    done = false
    reached = 0
  }
  const nearTheEnd = () => {
    if (nearlyEnded(video.currentTime, video.duration)) finished()
  }
  video.addEventListener("ended", finished)
  video.addEventListener("pause", nearTheEnd)
  video.addEventListener("waiting", nearTheEnd)
  video.addEventListener("loadstart", replaced)
  video.addEventListener("emptied", replaced)
  video.addEventListener("timeupdate", () => {
    if (!(video.duration >= SHORTEST_SECONDS)) return
    const at = video.currentTime / video.duration
    if (at < reached - WATCHED_AT) return replaced()
    reached = Math.max(reached, at)
    if (watchedTo(video.currentTime, video.duration)) finished()
  })
}

export function watchPlayback(chrome: Chrome, sighted: Sighted): undefined {
  const report = (minutes: number): undefined => {
    void (async () => {
      const sighting = sighted()
      if (sighting === null) {
        told("This page does not say which show and which episode is playing.")
        return
      }
      try {
        const answer = (await chrome.runtime.sendMessage({
          kind: SEND,
          sighting: { ...sighting, minutes },
        })) as Answered
        told(answer.said)
      } catch (thrown) {
        told(`This episode was not recorded: ${String(thrown)}`)
      }
    })()
  }
  const holdEvery = () => {
    for (const one of document.querySelectorAll("video")) hold(one, report)
  }
  new MutationObserver(holdEvery).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
  holdEvery()
}
