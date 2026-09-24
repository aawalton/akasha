import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

export const BESIDE = "code/body/modules/body-loading/body-loading.module.code.ts"

const BYTES = new TextEncoder()

export function changing(held: Readonly<Record<string, string>>): Change {
  return {
    root: codeRoot(),
    changed: Object.keys(held),
    before: () => null,
    after: (path) => {
      const body = held[path]
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}
