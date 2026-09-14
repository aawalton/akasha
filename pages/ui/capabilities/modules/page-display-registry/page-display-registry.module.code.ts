export interface PageDisplayMeta {
  readonly offlineCapable?: boolean
}

const displaysByKind = new Map<string, PageDisplayMeta>()

export function registerPageDisplay(kind: string, meta: PageDisplayMeta): undefined {
  displaysByKind.set(kind, meta)
}

export function getPageDisplay(kind: string): PageDisplayMeta | undefined {
  return displaysByKind.get(kind)
}
