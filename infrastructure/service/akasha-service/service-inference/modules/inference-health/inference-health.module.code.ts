import { getHost } from "akasha/infrastructure/inference/pool/modules/inference-hosts/inference-hosts.module.code.ts"
import { TRAFFIC_COP_SERVICE_NAME } from "akasha/infrastructure/inference/pool/modules/inference-naming/inference-naming.module.code.ts"
import {
  runSshCapture,
  type SshTarget,
} from "akasha/infrastructure/inference/pool/modules/inference-ssh/inference-ssh.module.code.ts"
import {
  type Inference,
  inferenceIn,
} from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-reading/inference-reading.module.code.ts"
import type { Verdict } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

const INFERENCE_PAGE_TYPE = "service-inference"

const LOCAL = "http://127.0.0.1"

const ACTIVE = "active"

const ANSWER = "answer"

const SILENT = "000"

const POOL = "pool"

const RESIDENT = z.object({ resident: z.array(z.string()) })

type Asked = (target: SshTarget, script: string) => Promise<string>

type Looked = {
  readonly slug: string
  readonly pagePath: string
  readonly service: Inference
}

type Said = {
  readonly resident: readonly string[] | null
  readonly answers: ReadonlyMap<string, string>
}

function portOf(service: Inference): number {
  return service.internalPort ?? service.port
}

function scriptFor(services: readonly Inference[]): string {
  const cop = services.find((one) => one.name === TRAFFIC_COP_SERVICE_NAME)
  const lines: string[] = []
  if (cop !== undefined) {
    lines.push(
      `printf '${ACTIVE} %s\\n' "$(curl -sS -m 5 ${LOCAL}:${cop.port}/active 2>/dev/null)"`
    )
  }
  for (const one of services) {
    const asked = `curl -sS -o /dev/null -m 5 -w '%{http_code}' ${LOCAL}:${portOf(one)}/ 2>/dev/null`
    lines.push(`printf '${ANSWER} ${one.name} %s\\n' "$(${asked})"`)
  }
  return `${lines.join("\n")}\n`
}

function residentIn(text: string): readonly string[] | null {
  try {
    const parsed = RESIDENT.safeParse(JSON.parse(text))
    return parsed.success ? parsed.data.resident : null
  } catch {
    return null
  }
}

function saidIn(text: string): Said {
  let resident: readonly string[] | null = null
  const answers = new Map<string, string>()
  for (const line of text.split("\n")) {
    const [tag, ...rest] = line.trim().split(" ")
    if (tag === ACTIVE) resident = residentIn(rest.join(" "))
    const name = rest[0]
    if (tag === ANSWER && name !== undefined) answers.set(name, rest[1] ?? "")
  }
  return { resident, answers }
}

function answering(said: Said, name: string): boolean {
  const code = said.answers.get(name)
  return code !== undefined && code !== "" && code !== SILENT
}

function brokenIn(service: Inference, said: Said): string | null {
  const silent = `does not answer on port ${portOf(service)} of ${service.host}`
  if (service.lifecycle !== POOL) {
    return answering(said, service.name) ? null : `${service.name} ${silent}`
  }
  if (said.resident === null) {
    return `the traffic cop on ${service.host} does not answer, so nothing brings ${service.name} up`
  }
  if (!said.resident.includes(service.name) || answering(said, service.name)) return null
  return `${service.name} is resident and ${silent}`
}

async function hostLooked(
  root: string,
  host: string,
  looked: readonly Looked[],
  ask: Asked
): Promise<readonly Verdict[]> {
  let text: string
  try {
    const found = getHost(host, root)
    const target = { user: found.loginUser, host: found.address, keyPath: found.keyPath }
    text = await ask(target, scriptFor(looked.map((one) => one.service)))
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return looked.map((one) => ({
      slug: one.slug,
      pagePath: one.pagePath,
      broken: `${host} could not be reached: ${why}`,
    }))
  }
  const said = saidIn(text)
  return looked.map((one) => ({
    slug: one.slug,
    pagePath: one.pagePath,
    broken: brokenIn(one.service, said),
  }))
}

export async function inferenceHealthFor(
  root: string,
  ask: Asked = runSshCapture
): Promise<readonly Verdict[]> {
  const verdicts: Verdict[] = []
  const byHost = new Map<string, Looked[]>()
  for (const one of valuesOfType(root, INFERENCE_PAGE_TYPE)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const read = inferenceIn(root, one.value)
    if (typeof read === "string") {
      verdicts.push({ slug: said.slug, pagePath: one.path, broken: `its page ${read}` })
      continue
    }
    if (!read.enabled) continue
    const held = byHost.get(read.host) ?? []
    held.push({ slug: said.slug, pagePath: one.path, service: read })
    byHost.set(read.host, held)
  }
  for (const [host, looked] of byHost) verdicts.push(...(await hostLooked(root, host, looked, ask)))
  return verdicts
}
