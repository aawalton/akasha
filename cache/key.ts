export type Key = {
  readonly kind: string
  readonly name: string
  readonly mark: string
  readonly subject: string
}

export function pathOf(key: Key): string {
  return `${key.kind}/${key.name}/${key.mark}/${key.subject}.json`
}
