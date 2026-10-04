import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
} from "akasha/infrastructure/inference/client/modules/comfy-client/comfy-client.module.code.ts"
import { buildEditGraph } from "akasha/infrastructure/inference/generation/zimage/modules/edit-graph/zimage-edit-graph.module.code.ts"
import { baseOf } from "akasha/infrastructure/inference/generation/zimage/modules/explore-batch/zimage-explore-batch.module.code.ts"

const UPLOAD_DIGEST = 16

export type EditAsked = {
  readonly bytes: Uint8Array
  readonly ending: string
  readonly prompt: string
  readonly seed: number
  readonly deadlineMs: number
  readonly onProgress?: (said: string) => undefined
}

export async function editedBy(asked: EditAsked): Promise<Uint8Array> {
  const baseUrl = baseOf()
  const name = `edit-${sha256Hex(asked.bytes).slice(0, UPLOAD_DIGEST)}${asked.ending}`
  const run = await runComfyGraph({
    baseUrl,
    upload: { bytes: asked.bytes, name },
    buildGraph: (stored) => buildEditGraph(stored ?? name, asked.prompt, asked.seed),
    pollDeadlineMs: asked.deadlineMs,
    ...(asked.onProgress === undefined ? {} : { onProgress: asked.onProgress }),
  })
  return await fetchImage(baseUrl, run.image)
}
