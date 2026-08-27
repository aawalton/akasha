export type LocalPositionReader = (pageId: string) => Promise<number | undefined>

let registered: LocalPositionReader | null = null

export function configureLocalPositionReader(reader: LocalPositionReader | null): undefined {
  registered = reader
}

export function getLocalPositionReader(): LocalPositionReader | null {
  return registered
}
