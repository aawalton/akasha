import { dirname } from "node:path"
import { slugIn } from "akasha/pages/address/page-address.module.code.ts"
import { everyOfType, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const INFERENCE_PAGE_TYPE = "service-inference"

const SCRIPT_PAGE_TYPE = "shell-script"

export interface Inference {
  readonly name: string
  readonly host: string
  readonly pythonVersion: string
  readonly sourceDir: string
  readonly workdir: string
  readonly runs: string
  readonly port: number
  readonly lifecycle: "pool" | "always-on"
  readonly internalPort?: number
  readonly warm: boolean
  readonly enabled: boolean
}

export type Read = { readonly services: readonly Inference[] } | { readonly refused: string }

export function runIn(held: unknown): string | null {
  if (!Array.isArray(held)) return null
  const one = held[0]
  return typeof one === "string" && one.trim() !== "" ? one : null
}

export function folderOf(root: string, named: string): string | null {
  const found = listedAt(root, SCRIPT_PAGE_TYPE, slugIn(named) ?? named)
  const one = found[0]
  return one === undefined ? null : dirname(one.path)
}

export function inferenceIn(root: string, value: Value): Inference | string {
  const name = textAt(value, "slug")
  const host = textAt(value, "host")
  const pythonVersion = textAt(value, "pythonVersion")
  const workdir = textAt(value, "workdir")
  const provision = textAt(value, "provision")
  const runs = runIn(value.runs)
  if (
    name === null ||
    host === null ||
    pythonVersion === null ||
    workdir === null ||
    provision === null ||
    runs === null
  ) {
    return "states no slug, host, python, working folder, provision and command line"
  }
  const { port, lifecycle, enabled, internalPort } = value
  if (typeof port !== "number") return "states no port"
  if (lifecycle !== "pool" && lifecycle !== "always-on") {
    return `states \`${String(lifecycle)}\` as its lifecycle, which is neither \`pool\` nor \`always-on\``
  }
  if (typeof enabled !== "boolean") return "does not say whether it is to be running"
  const sourceDir = folderOf(root, provision)
  if (sourceDir === null) return `names \`${provision}\`, and no shell script is slugged that`
  return {
    name,
    host,
    pythonVersion,
    sourceDir,
    workdir,
    runs,
    port,
    lifecycle,
    enabled,
    warm: value.warm === true,
    ...(typeof internalPort === "number" ? { internalPort } : {}),
  }
}

function inferenceAt(root: string, path: string): Inference | string {
  const value = valueAt(path, root)
  if (value === null) return `${path} did not load, so the service it states is not read`
  const read = inferenceIn(root, value)
  return typeof read === "string" ? `${path} ${read}, so it is no inference service` : read
}

export function readFor(root: string, slug: string): Read {
  const found = listedAt(root, INFERENCE_PAGE_TYPE, slug)
  const one = found[0]
  if (one === undefined) return { refused: `no ${INFERENCE_PAGE_TYPE} is slugged \`${slug}\`` }
  const read = inferenceAt(root, one.path)
  return typeof read === "string" ? { refused: read } : { services: [read] }
}

export function everyInference(root: string): Read {
  const found = [...everyOfType(root, INFERENCE_PAGE_TYPE)].sort((a, b) =>
    a.path < b.path ? -1 : a.path > b.path ? 1 : 0
  )
  const services: Inference[] = []
  for (const one of found) {
    const read = inferenceAt(root, one.path)
    if (typeof read === "string") return { refused: read }
    services.push(read)
  }
  return { services }
}
