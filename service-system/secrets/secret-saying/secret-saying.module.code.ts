import { stringify } from "yaml"
import {
  DeployRefused,
  placedAt,
  type SecretPage,
  secretPages,
  valueOf,
} from "../secret-placing/secret-placing.module.code.ts"

const PREFIX = "[secret-saying]"

export const OPAQUE = "Opaque"

export function flagValue(argv: readonly string[], name: string): string | undefined {
  const at = argv.indexOf(name)
  if (at === -1) return undefined
  const value = argv[at + 1]
  return value === undefined || value.startsWith("--") ? undefined : value
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
  type: string = OPAQUE
): string {
  return stringify({
    apiVersion: "v1",
    kind: "Secret",
    metadata: { name: resource, namespace },
    type,
    stringData: values,
  })
}

export function sayingFor(
  akasha: string,
  resource: string,
  namespace: string,
  type: string = OPAQUE
): string {
  const pages = secretPages(akasha)
  placedAt(pages)
  const held = heldBy(pages, resource)
  if (held.length === 0) {
    throw new DeployRefused(
      `no secret page places a value in ${resource}, so there is nothing to apply and an empty Secret would take away whatever the cluster holds`
    )
  }
  const values: Record<string, string> = {}
  for (const one of held) values[one.key] = valueOf(akasha, one.page)
  return secretYaml(values, resource, namespace, type)
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
    process.stdout.write(sayingFor(root as string, resource as string, namespace as string, type))
  } catch (thrown) {
    process.stderr.write(`${PREFIX} ${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    return 1
  }
  return 0
}

if (import.meta.main) process.exit(runSaying(process.argv.slice(2)))
