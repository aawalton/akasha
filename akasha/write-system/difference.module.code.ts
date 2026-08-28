type Line = { readonly mark: " " | "-" | "+"; readonly text: string }

function commonRun(before: readonly string[], now: readonly string[]): readonly number[][] {
  const table: number[][] = []
  for (let a = 0; a <= before.length; a++) table.push(new Array<number>(now.length + 1).fill(0))
  for (let a = before.length - 1; a >= 0; a--) {
    const here = table[a]
    const next = table[a + 1]
    if (here === undefined || next === undefined) continue
    for (let b = now.length - 1; b >= 0; b--) {
      const down = next[b] ?? 0
      const right = here[b + 1] ?? 0
      here[b] = before[a] === now[b] ? (next[b + 1] ?? 0) + 1 : Math.max(down, right)
    }
  }
  return table
}

export function linesBetween(before: readonly string[], now: readonly string[]): readonly Line[] {
  const table = commonRun(before, now)
  const found: Line[] = []
  let a = 0
  let b = 0
  while (a < before.length && b < now.length) {
    if (before[a] === now[b]) {
      found.push({ mark: " ", text: before[a] ?? "" })
      a += 1
      b += 1
      continue
    }
    const down = table[a + 1]?.[b] ?? 0
    const right = table[a]?.[b + 1] ?? 0
    if (down >= right) {
      found.push({ mark: "-", text: before[a] ?? "" })
      a += 1
    } else {
      found.push({ mark: "+", text: now[b] ?? "" })
      b += 1
    }
  }
  while (a < before.length) {
    found.push({ mark: "-", text: before[a] ?? "" })
    a += 1
  }
  while (b < now.length) {
    found.push({ mark: "+", text: now[b] ?? "" })
    b += 1
  }
  return found
}

export function difference(before: string, now: string, context = 1): readonly string[] {
  const lines = linesBetween(before.split("\n"), now.split("\n"))
  const wanted = new Set<number>()
  for (let at = 0; at < lines.length; at++) {
    if (lines[at]?.mark === " ") continue
    for (let near = at - context; near <= at + context; near++) {
      if (near >= 0 && near < lines.length) wanted.add(near)
    }
  }
  if (wanted.size === 0) return []
  const found: string[] = ["--- as you last read it", "+++ as it stands now"]
  let before_ = 1
  let now_ = 1
  let broken = true
  for (let at = 0; at < lines.length; at++) {
    const one = lines[at]
    if (one === undefined) continue
    if (!wanted.has(at)) {
      broken = true
    } else {
      if (broken) found.push(`@@ -${before_} +${now_} @@`)
      broken = false
      found.push(`${one.mark}${one.text}`)
    }
    if (one.mark !== "+") before_ += 1
    if (one.mark !== "-") now_ += 1
  }
  return found
}
