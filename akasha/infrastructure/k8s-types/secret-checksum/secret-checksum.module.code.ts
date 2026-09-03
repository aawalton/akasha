import { createHash } from "node:crypto"
import { ran } from "@akasha/utils-run/running"

export function secretChecksum(namespace: string, secret: string, keys: readonly string[]): string {
  const jsonpath = keys.map((key) => `{.data.${key}}`).join("")
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
      `secret ${secret} in ${namespace} could not be read, so the checksum over ${keys.join(", ")} cannot be worked out: ${done.err.trim()}`
    )
  }
  if (done.out.trim() === "") {
    throw new Error(
      `secret ${secret} in ${namespace} read empty over ${keys.join(", ")}, and hashing that would stamp a constant annotation that never rolls the workload again`
    )
  }
  return createHash("md5").update(done.out).digest("hex")
}
