import { relative } from "node:path"
import type { Held } from "../pages-system/page/page-file-name/page-file-name.module.code.ts"

export function saidInside(
  folder: string,
  some: readonly (string | Held)[],
  most?: number
): string {
  const inside = some.map((one) => relative(folder, typeof one === "string" ? one : one.path))
  if (most === undefined || inside.length <= most) return inside.join(", ")
  const said = inside.slice(0, most)
  return `${said.join(", ")} and ${inside.length - said.length} more`
}
