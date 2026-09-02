import type { Repo } from "../markdown-document/markdown-document.module.code.ts"

export type Roots = Readonly<Record<string, string | undefined>> & { readonly target?: Repo }

export type PageAt = {
  readonly repo: string
  readonly key: string
  readonly stem: string
  readonly type: string
}

export function saidAt(at: PageAt): string {
  return `${at.repo}:${at.key}`
}
