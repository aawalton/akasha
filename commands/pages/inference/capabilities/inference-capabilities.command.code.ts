import type { Answer } from "@akasha/command-system/calling"
import { answering, refusedBy, told } from "@akasha/command-system/command-answering"
import { whyOf } from "@akasha/command-system/fault-saying"
import { getHost } from "akasha/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import { parseMfluxTools } from "akasha/inference/pool/inference-reconcile/inference-reconcile.module.code.ts"
import type { InferenceService } from "akasha/inference/pool/inference-schema/inference-schema.module.code.ts"
import { SERVICES } from "akasha/inference/pool/inference-services/inference-services.module.code.ts"
import { runSshCapture } from "akasha/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import { buildMfluxQueryScript } from "akasha/inference/pool/provision-script/provision-script.module.code.ts"
import {
  boundTo,
  targetOf,
  wasRefused,
  wordsIn,
} from "../../../../inference/commands/inference-answering/inference-answering.module.code.ts"

const MODEL_TYPE = "--model-type"

const MODEL_PATH = "--model-path"

const IMAGE_EDIT = "image-edit"

const IMAGE_PREFIX = "image-"

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
  if (wasRefused(said)) return refusedBy(said.refused)
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
