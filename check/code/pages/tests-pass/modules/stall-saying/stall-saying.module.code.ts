const SHOWN = 1

const INDENT = "  "

export function stallSaid(cpuSeconds: number, stalled: string | undefined): string {
  const said = `, having spent ${cpuSeconds.toFixed(SHOWN)} processor seconds`
  if (stalled === undefined) return said
  const each = stalled
    .split("\n")
    .map((one) => `${INDENT}${one}`)
    .join("\n")
  return `${said}. What its processes were doing as it was ended:\n${each}`
}
