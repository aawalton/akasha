import { streamOver } from "akasha/page/service/modules/events-reading/events-reading.module.code.ts"
import {
  eventsOpened,
  followSent,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { createChangeFollowing } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"

const readingAgain = new Map<string, Set<() => undefined>>()

function againAll(heard: Iterable<() => undefined>): undefined {
  for (const again of heard) again()
  return undefined
}

const following = createChangeFollowing({
  open: () => streamOver((signal) => eventsOpened(signal)),
  send: async (body) => (await followSent(body)).ok,
  pushed: (one) => {
    for (const key of one.keys) againAll(readingAgain.get(key) ?? [])
    return undefined
  },
  caughtUp: () => againAll(new Set([...readingAgain.values()].flatMap((heard) => [...heard]))),
})

let started = false

function followed(pageTypeSlug: string, again: () => undefined): undefined {
  if (!started) {
    started = true
    following.start()
  }
  const heard = readingAgain.get(pageTypeSlug) ?? new Set<() => undefined>()
  readingAgain.set(pageTypeSlug, heard)
  heard.add(again)
  return following.follow(pageTypeSlug, { pageTypeSlug })
}

export function heldReading<T>(
  pageTypeSlugs: readonly string[],
  read: () => Promise<T>
): () => Promise<T> {
  let first: Promise<T> | null = null
  let reading = false
  let owed = false
  let follows = false

  const settled = (): undefined => {
    reading = false
    if (!owed) return undefined
    owed = false
    return again()
  }

  function again(): undefined {
    if (reading) {
      owed = true
      return undefined
    }
    reading = true
    read().then(settled, settled)
    return undefined
  }

  return () => {
    if (first !== null) return first
    const firstRead = read()
    first = firstRead
    reading = true
    firstRead.then(settled, () => {
      first = null
      return settled()
    })
    if (!follows && !("document" in globalThis)) {
      follows = true
      for (const pageTypeSlug of pageTypeSlugs) followed(pageTypeSlug, again)
    }
    return firstRead
  }
}
