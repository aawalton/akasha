import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"

export function secretChecksum(
  namespace: string,
  secret: string,
  keys: readonly string[]
): string {
  const jsonpath = keys.map((key) => `{.data.${key}}`).join("")
  let read: string
  try {
    read = execFileSync(
      "kubectl",
      ["get", "secret", secret, "-n", namespace, "-o", `jsonpath=${jsonpath}`],
      { encoding: "utf8" }
    )
  } catch (thrown) {
    throw new Error(
      `secret ${secret} in ${namespace} could not be read, so the checksum over ${keys.join(", ")} cannot be worked out: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }
  if (read.trim() === "") {
    throw new Error(
      `secret ${secret} in ${namespace} read empty over ${keys.join(", ")}, and hashing that would stamp a constant annotation that never rolls the workload again`
    )
  }
  return createHash("md5").update(read).digest("hex")
}
