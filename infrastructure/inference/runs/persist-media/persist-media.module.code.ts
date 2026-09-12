import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"

export interface MediaPersistDeps {
  readonly createPage: (properties: Record<string, Json>) => Promise<string>
  readonly publishBytes: (pageId: string, bytes: Uint8Array) => Promise<void>
}

export interface MediaPersistInput {
  readonly properties: Record<string, Json>
  readonly outputBytes: Uint8Array
}

export function shouldPersistMedia(
  operation: string,
  persist: boolean | undefined,
  operations: ReadonlySet<string>
): boolean {
  if (persist === false) return false
  return operations.has(operation)
}

export function landedSaid(pageId: string): string {
  return `landed the row ${pageId} beside the generation log`
}

export async function persistInferenceMedia(
  deps: MediaPersistDeps,
  input: MediaPersistInput,
  done: string[]
): Promise<string> {
  const pageId = await deps.createPage(input.properties)
  done.push(landedSaid(pageId))
  await deps.publishBytes(pageId, input.outputBytes)
  return pageId
}
