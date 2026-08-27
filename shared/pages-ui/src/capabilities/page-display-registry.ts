export interface PageDisplayMeta {
  readonly offlineCapable?: boolean
}

const registry = new Map<string, PageDisplayMeta>()

export function registerPageDisplay(kind: string, meta: PageDisplayMeta): undefined {
  registry.set(kind, meta)
}

export function getPageDisplay(kind: string): PageDisplayMeta | undefined {
  return registry.get(kind)
}

export function isRegisteredDisplay(kind: string): boolean {
  return registry.has(kind)
}

export function unregisterPageDisplay(kind: string): undefined {
  registry.delete(kind)
}
