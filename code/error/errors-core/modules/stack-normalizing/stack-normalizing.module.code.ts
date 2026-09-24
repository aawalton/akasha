export function normalizeStack(stack: string): string {
  const lines = stack.split("\n")
  const normalized: string[] = []
  let previous: string | undefined

  for (const rawLine of lines) {
    const line = normalizeFrame(rawLine)
    if (line !== previous) {
      normalized.push(line)
      previous = line
    }
  }

  return normalized.join("\n")
}

function normalizeFrame(line: string): string {
  let result = line

  result = result.replace(/:\d+(?::\d+)?\b/g, "")

  result = result.replace(/[^\s()]*\/([^\s()/]+)/g, "$1")

  result = result.replace(/\b([A-Za-z0-9_.]+?)-[A-Za-z0-9]{6,}(\.[A-Za-z0-9]+)\b/g, "$1$2")

  return result
}
