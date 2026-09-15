import { listenerSet } from "akasha/design/interface/design-interfaces-primitives/modules/listener-set/listener-set.module.code.ts"

let currentSlug: string | null = null
const listeners = listenerSet()

export function openRosterGallery(slug: string): undefined {
  if (currentSlug === slug) return
  currentSlug = slug
  listeners.tell()
}

export function closeRosterGallery(): undefined {
  if (currentSlug === null) return
  currentSlug = null
  listeners.tell()
}

export function subscribeRosterGallery(listener: () => void): () => void {
  return listeners.subscribe(listener)
}

export function getRosterGallerySnapshot(): string | null {
  return currentSlug
}
