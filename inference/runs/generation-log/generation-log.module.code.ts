import { kebabizeKey } from "@akasha/pages/access/file-rows"
import type { Json } from "@akasha/utils/narrow/json-value"
import { optionalEnv } from "@akasha/utils/narrow/require-env"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"

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

const NO_ROW =
  "a row sits inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so nothing here can reach it. land the generation log's whole body with `writeFiles` or `patchFiles`, or record it through the akasha command line"

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
