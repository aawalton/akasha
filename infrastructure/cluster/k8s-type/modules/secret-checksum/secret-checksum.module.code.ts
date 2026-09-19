import { createHash } from "node:crypto"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const WHOLE = "{.data}"

export function secretChecksum(
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
