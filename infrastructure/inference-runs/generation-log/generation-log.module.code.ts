import { OperationalError } from "@akasha/errors-core/exit-code"
import { kebabizeKey } from "@akasha/pages-access/file-rows"
import type { Json } from "@akasha/utils-narrow/json-value"
import { optionalEnv } from "@akasha/utils-narrow/require-env"

export function generationLogSlug(): string {
  const stated = optionalEnv("GENERATION_LOG")?.trim()
  return stated === undefined || stated === "" ? "alan" : stated
}

export const GENERATION_WRITER = "inference-cli"

export function rowValuesOf(properties: Readonly<Record<string, Json>>): Record<string, Json> {
  const values: Record<string, Json> = {}
  for (const [key, value] of Object.entries(properties)) {
    values[kebabizeKey(key)] = value
  }
  return values
}

// A GENERATION IS LOGGED AS A ROW, AND NOTHING LANDS A ROW. A row stands inside a page's body
// rather than at a path of its own, and the store addresses paths and whole bodies, so `writeRow`
// and `patchRow` refuse every call — they have since 4c1f05a264 severed the checkout branch that
// used to land them. Both functions below asked anyway and threw on the refusal, so every
// `inference` and `wan` command that records what it generated has stopped here since.
//
// The refusal is stated here rather than carried back from a shim. Landing these again means
// writing the log page's whole body through `writeFiles` or `patchFiles`, or going through the
// akasha command line — the same two roads the store names when it refuses.
const NO_ROW =
  "a row stands inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so nothing here can reach it. land the generation log's whole body with `writeFiles` or `patchFiles`, or record it through the akasha command line"

export async function landRow(
  pageTypeSlug: string,
  _properties: Readonly<Record<string, Json>>,
  id: string = Bun.randomUUIDv7()
): Promise<string> {
  throw new OperationalError(
    `the ${pageTypeSlug} row ${id} did not land in \`${generationLogSlug()}\`: ${NO_ROW}`
  )
}

export async function mergeRow(
  pageTypeSlug: string,
  id: string,
  _properties: Readonly<Record<string, Json>>
): Promise<void> {
  throw new OperationalError(
    `the patch of ${pageTypeSlug} row ${id} did not land in \`${generationLogSlug()}\`: ${NO_ROW}`
  )
}
