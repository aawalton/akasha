import { wordsOf } from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  boundTo,
  targetOf,
  wasRefused,
  wordsIn,
} from "akasha/inference/commands/inference-answering/inference-answering.module.code.ts"
import { getHost } from "akasha/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import { runSshCapture } from "akasha/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import {
  buildMfluxQueryScript,
  parseMfluxTools,
} from "akasha/inference/pool/provision-script/provision-script.module.code.ts"
import {
  everyInference,
  type Inference,
} from "akasha/infrastructure/services/inferences/inference-reading/inference-reading.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const MODEL_TYPE = "--model-type"

const MODEL_PATH = "--model-path"

const IMAGE_EDIT = "image-edit"

const IMAGE_PREFIX = "image-"

export function routeOf(command: readonly string[]): string {
  return boundTo(command, MODEL_TYPE) === IMAGE_EDIT
    ? "POST /v1/images/edits"
    : "POST /v1/images/generations"
}

export function isImagePool(service: Inference): boolean {
  return service.enabled && service.lifecycle === "pool" && service.name.startsWith(IMAGE_PREFIX)
}

export async function inferenceCapabilities(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  const read = everyInference(codeRoot())
  if ("refused" in read) return refusedBy([read.refused])

  return await answering(async () => {
    const image = read.services.filter(isImagePool)
    const first = image[0]
    if (first === undefined) return told([])
    const host = getHost(first.host)

    const report: string[] = [`${host.name}\t${host.address}`]
    for (const one of image) {
      const words = wordsOf(one.runs)
      report.push(
        `\t${one.name}\t${boundTo(words, MODEL_PATH) ?? ""}\t:${one.port}\t${routeOf(words)}`
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
