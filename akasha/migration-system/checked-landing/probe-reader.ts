import { existsSync } from "node:fs"
import { join } from "node:path"
import { PROBE_WIDGET_SLUG } from "./probe-slug.ts"

export function probeWidgetStands(at: string): boolean {
  return existsSync(join(at, `${PROBE_WIDGET_SLUG}.probe-data.ts`))
}
