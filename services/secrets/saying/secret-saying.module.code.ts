import { stringify } from "yaml"
import {
  DeployRefused,
  placedAt,
  type SecretPage,
  secretPages,
  secretValueOf,
} from "../placing/secret-placing.module.code.ts"

const PREFIX = "[secret-saying]"

export const OPAQUE = "Opaque"

export function flagValue(argv: readonly string[], name: string): string | undefined {
  const at = argv.indexOf(name)
  if (at === -1) return undefined
  const value = argv[at + 1]
  return value === undefined || value.startsWith("--") ? undefined : value
}

export function flagValues(argv: readonly string[], name: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] !== name) continue
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("--")) continue
    found.push(value)
  }
  return found
}

export function labelsOf(said: readonly string[]): Record<string, string> {
  const labels: Record<string, string> = {}
  for (const one of said) {
    const at = one.indexOf("=")
    if (at <= 0) {
      throw new DeployRefused(
        `\`${one}\` is no label, and a label is written as a name and a value with \`=\` between them`
      )
    }
    labels[one.slice(0, at)] = one.slice(at + 1)
  }
  return labels
}

export interface Held {
  readonly key: string
  readonly page: SecretPage
}

export function heldBy(pages: readonly SecretPage[], resource: string): readonly Held[] {
  const found: Held[] = []
  for (const page of pages) {
    for (const placement of page.placements) {
      if (placement.resourceName === resource) found.push({ key: placement.resourceKey, page })
    }
  }
  return [...found].sort((one, other) => one.key.localeCompare(other.key))
}

export function secretYaml(
  values: Record<string, string>,
  resource: string,
  namespace: string,
  type: string = OPAQUE,
  labels: Record<string, string> = {}
): string {
  const named = { name: resource, namespace }
  return stringify({
    apiVersion: "v1",
    kind: "Secret",
    metadata: Object.keys(labels).length === 0 ? named : { ...named, labels },
    type,
    stringData: values,
  })
}

export function valuesFor(akasha: string, resource: string): Record<string, string> {
  const pages = secretPages(akasha)
  placedAt(pages)
  const held = heldBy(pages, resource)
  if (held.length === 0) {
    throw new DeployRefused(
      `no secret page places a value in ${resource}, so there is nothing to apply and an empty Secret would take away whatever the cluster holds`
    )
  }
  const values: Record<string, string> = {}
  for (const one of held) values[one.key] = secretValueOf(akasha, one.page)
  return values
}

export function sayingFor(
  akasha: string,
  resource: string,
  namespace: string,
  type: string = OPAQUE,
  labels: Record<string, string> = {}
): string {
  return secretYaml(valuesFor(akasha, resource), resource, namespace, type, labels)
}

export function runSaying(argv: readonly string[]): number {
  const root = flagValue(argv, "--root")
  const resource = flagValue(argv, "--resource")
  const namespace = flagValue(argv, "--namespace")
  const type = flagValue(argv, "--type") ?? OPAQUE
  for (const [flag, held] of [
    ["--root", root],
    ["--resource", resource],
    ["--namespace", namespace],
  ] as const) {
    if (held === undefined) {
      process.stderr.write(`${PREFIX} ${flag} names nothing, and all three are needed\n`)
      return 1
    }
  }
  try {
    const labels = labelsOf(flagValues(argv, "--label"))
    process.stdout.write(
      sayingFor(root as string, resource as string, namespace as string, type, labels)
    )
  } catch (thrown) {
    process.stderr.write(`${PREFIX} ${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    return 1
  }
  return 0
}

if (import.meta.main) process.exit(runSaying(process.argv.slice(2)))
