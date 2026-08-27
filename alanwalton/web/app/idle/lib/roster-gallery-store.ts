let currentSlug: string | null = null
const listeners = new Set<() => void>()

function notify(): undefined {
  for (const listener of listeners) listener()
}

export function openRosterGallery(slug: string): undefined {
  if (currentSlug === slug) return
  currentSlug = slug
  notify()
}

export function closeRosterGallery(): undefined {
  if (currentSlug === null) return
  currentSlug = null
  notify()
}

export function subscribeRosterGallery(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getRosterGallerySnapshot(): string | null {
  return currentSlug
}
