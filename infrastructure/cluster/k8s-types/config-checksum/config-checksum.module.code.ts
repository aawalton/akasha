import { createHash } from "node:crypto"

const NOTHING_TO_SUM =
  "a config carrying no key sums to a constant annotation that never rolls the workload again"

export function configChecksum(data: Readonly<Record<string, string>>): string {
  const entries = Object.entries(data).sort((one, other) => one[0].localeCompare(other[0]))
  if (entries.length === 0) throw new Error(NOTHING_TO_SUM)
  const summed = createHash("md5")
  for (const [key, value] of entries) {
    summed.update(String(key.length) + ":" + key + String(value.length) + ":" + value)
  }
  return summed.digest("hex")
}
