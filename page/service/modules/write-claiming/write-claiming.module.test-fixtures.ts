import { dirname, join } from "node:path"

const HERE = dirname(import.meta.path)

const CLAIMING_AT = join(HERE, "write-claiming.module.code.ts")

const UNCOMMITTED_AT = join(
  HERE,
  "..",
  "..",
  "..",
  "modules",
  "uncommitted",
  "page-uncommitted.module.code.ts"
)

export const KEY = "claimedAt"

export type Side = "cancel" | "take"

export function racing(
  root: string,
  pages: readonly string[],
  side: Side,
  marks: { readonly ready: string; readonly go: string; readonly said: string }
): string {
  const claim =
    side === "cancel"
      ? `claimedAll(root, [{ path, key: ${JSON.stringify(KEY)} }], "cancel") === null`
      : `claimUncommitted(root, path, ${JSON.stringify(KEY)}, "take")`
  return `import { claimedAll } from ${JSON.stringify(CLAIMING_AT)}
import { claimUncommitted } from ${JSON.stringify(UNCOMMITTED_AT)}
import { existsSync, writeFileSync } from "node:fs"
const root = ${JSON.stringify(root)}
writeFileSync(${JSON.stringify(marks.ready)}, "ready")
while (!existsSync(${JSON.stringify(marks.go)})) Bun.sleepSync(1)
const won = ${JSON.stringify(pages)}.map((path) => ${claim})
writeFileSync(${JSON.stringify(marks.said)}, JSON.stringify(won))`
}
