import { createHash } from "node:crypto"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  type SecretPage,
  secretPages,
  secretValueOf,
} from "akasha/infrastructure/service/akasha-service/secret/modules/placing/secret-placing.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const WHOLE = "{.data}"

function placedInto(root: string, secret: string): ReadonlyMap<string, SecretPage> {
  const at = new Map<string, SecretPage>()
  for (const page of secretPages(root)) {
    for (const placement of page.placements) {
      if (placement.resourceName !== secret) continue
      at.set(placement.resourceKey, page)
    }
  }
  return at
}

export function placedSecretChecksum(secret: string, keys: readonly string[] = []): string {
  const root = akashaRoot()
  const at = placedInto(root, secret)
  if (at.size === 0) {
    throw new Error(
      `no secret page places a value into ${secret}, so nothing says what its checksum is over`
    )
  }
  const named = keys.length === 0 ? [...at.keys()] : keys
  for (const key of named) {
    if (at.has(key)) continue
    throw new Error(
      `no secret page places a value into ${secret} under ${key}, so that key cannot be hashed`
    )
  }
  const sorted = [...named].sort()
  const summed = sorted.map((key) => [key, secretValueOf(root, at.get(key) as SecretPage)])
  return createHash("md5").update(JSON.stringify(summed)).digest("hex")
}

export function mintedSecretChecksum(
  namespace: string,
  secret: string,
  keys: readonly string[] = []
): string {
  const over = keys.length === 0 ? "its whole contents" : keys.join(", ")
  const jsonpath =
    keys.length === 0 ? WHOLE : keys.map((key) => `{.data.${key.replaceAll(".", "\\.")}}`).join("")
  const done = ran([
    "kubectl",
    "get",
    "secret",
    secret,
    "-n",
    namespace,
    "-o",
    `jsonpath=${jsonpath}`,
  ])
  if (done.code !== 0) {
    throw new Error(
      `secret ${secret} in ${namespace} could not be read, so the checksum over ${over} cannot be worked out: ${done.err.trim()}`
    )
  }
  if (done.out.trim() === "") {
    throw new Error(
      `secret ${secret} in ${namespace} read empty over ${over}, and hashing that would stamp a constant annotation that never rolls the workload again`
    )
  }
  return createHash("md5").update(done.out).digest("hex")
}
