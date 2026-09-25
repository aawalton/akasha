import type { Repo } from "akasha/page/modules/markdown-document/markdown-document.module.code.ts"

export type Roots = Readonly<Record<string, string | undefined>> & { readonly target?: Repo }
