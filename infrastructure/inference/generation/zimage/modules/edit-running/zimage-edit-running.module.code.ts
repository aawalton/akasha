import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
  uploadedAs,
} from "akasha/infrastructure/inference/client/modules/comfy-client/comfy-client.module.code.ts"
import { buildEditGraph } from "akasha/infrastructure/inference/generation/zimage/modules/edit-graph/zimage-edit-graph.module.code.ts"
import { baseOf } from "akasha/infrastructure/inference/generation/zimage/modules/explore-batch/zimage-explore-batch.module.code.ts"

const UPLOAD_DIGEST = 16

export type EditReference = { readonly bytes: Uint8Array; readonly ending: string }

export type EditAsked = {
  readonly bytes: Uint8Array
  readonly ending: string
  readonly references?: readonly EditReference[]
  readonly prompt: string
  readonly seed: number
  readonly deadlineMs: number
  readonly onProgress?: (said: string) => undefined
}

export function uploadNameOf(bytes: Uint8Array, ending: string): string {
  return `edit-${sha256Hex(bytes).slice(0, UPLOAD_DIGEST)}${ending}`
}

export async function editedBy(asked: EditAsked): Promise<Uint8Array> {
  const baseUrl = baseOf()
  const name = uploadNameOf(asked.bytes, asked.ending)
  const references: string[] = []
  for (const one of asked.references ?? []) {
    references.push(
      await uploadedAs(baseUrl, { bytes: one.bytes, name: uploadNameOf(one.bytes, one.ending) })
    )
  }
  const run = await runComfyGraph({
    baseUrl,
    upload: { bytes: asked.bytes, name },
    buildGraph: (stored) => buildEditGraph(stored ?? name, asked.prompt, asked.seed, references),
    pollDeadlineMs: asked.deadlineMs,
    ...(asked.onProgress === undefined ? {} : { onProgress: asked.onProgress }),
  })
  return await fetchImage(baseUrl, run.image)
}
