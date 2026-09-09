const PREFIX = "backup-longtail"

export function attestationLogLines(
  backupId: string,
  sha256Lines: readonly string[]
): readonly string[] {
  return [
    ...sha256Lines.map((line) => `${PREFIX}: sha256 ${backupId} ${line}`),
    `${PREFIX}: unit ${backupId} attested ${sha256Lines.length} files (sha256)`,
  ]
}

export function attestationProbeProblem(
  lines: readonly string[],
  expectedDigest: string,
  expectedName: string
): string | null {
  if (lines.length !== 1) {
    return `expected 1 hash line for the probe file, got ${lines.length}`
  }
  const line = lines[0] ?? ""
  const [digest, ...nameParts] = line.split(/\s+/)
  const name = nameParts.join(" ")
  if (digest !== expectedDigest) {
    return `probe digest ${digest ?? "(none)"} is not the sha256 of the probe bytes (${expectedDigest})`
  }
  if (name !== expectedName) {
    return `probe line names ${name === "" ? "(nothing)" : name}, expected ${expectedName}`
  }
  return null
}
