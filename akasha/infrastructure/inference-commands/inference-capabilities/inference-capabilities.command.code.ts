import type { Answer } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { buildMfluxQueryScript } from "@tools/lib/inference/build-script"
import { getHost } from "@tools/lib/inference/hosts"
import { runSshCapture } from "@tools/lib/inference/lib/ssh"
import { parseMfluxTools } from "@tools/lib/inference/reconcile"
import { SERVICES } from "@tools/lib/inference/registry"
import type { InferenceService } from "@tools/lib/inference/schema"
import {
  answering,
  refusalIn,
  refusedBy,
  targetOf,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

const MODEL_TYPE = "--model-type"

const MODEL_PATH = "--model-path"

const IMAGE_EDIT = "image-edit"

const IMAGE_PREFIX = "image-"

export function boundTo(command: readonly string[], flag: string): string | undefined {
  const at = command.indexOf(flag)
  return at >= 0 ? command[at + 1] : undefined
}

export function routeOf(command: readonly string[]): string {
  return boundTo(command, MODEL_TYPE) === IMAGE_EDIT
    ? "POST /v1/images/edits"
    : "POST /v1/images/generations"
}

export function isImagePool(service: InferenceService): boolean {
  return service.lifecycle === "pool" && service.name.startsWith(IMAGE_PREFIX)
}

export async function inferenceCapabilities(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => {
    const image = SERVICES.filter(isImagePool)
    const first = image[0]
    if (first === undefined) return told([])
    const host = getHost(first.host)

    const report: string[] = [`${host.name}\t${host.address}`]
    for (const one of image) {
      report.push(
        `\t${one.name}\t${boundTo(one.command, MODEL_PATH) ?? ""}\t:${one.port}\t${routeOf(one.command)}`
      )
    }

    report.push(`mflux\tinference-${first.name}`)
    let tools: readonly string[] = []
    try {
      tools = parseMfluxTools(
        await runSshCapture(targetOf(host), buildMfluxQueryScript(host, first.name))
      )
    } catch (thrown) {
      report.push(`\t(the host would not answer: ${whyOf(thrown).replace(/\s+/g, " ").trim()})`)
      return told(report)
    }
    for (const tool of tools) report.push(`\t${tool}`)
    return told(report)
  })
}
