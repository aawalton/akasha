export type Roots = Readonly<Record<string, string | undefined>>

export type PageAt = {
  readonly repo: string
  readonly key: string
  readonly stem: string
  readonly type: string
}

export function saidAt(at: PageAt): string {
  return `${at.repo}:${at.key}`
}
