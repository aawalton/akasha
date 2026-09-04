export type DepToken = {
  id: number
  form: string
  upos: string
  head: number
  deprel: string
  start: number
  end: number
  lemma?: string
  features?: Readonly<Record<string, string>>
  confidence?: {
    upos?: number
    head?: number
    deprel?: number
  }
}

export type ParsedSentence = {
  text: string
  start: number
  end: number
  tokens: DepToken[]
}

export type DepSentence = {
  text: string
  tokens: DepToken[]
  children: Map<number, DepToken[]>
}

export type Span = {
  start: number
  end: number
}

type Swap = {
  loss: number
  dependent: number
  replacement: number
}

const GERUND = /[a-z]ing$/i

export function makeSentence(parsed: ParsedSentence): DepSentence {
  const children = new Map<number, DepToken[]>()
  for (const token of parsed.tokens) {
    const held = children.get(token.head)
    if (held === undefined) children.set(token.head, [token])
    else held.push(token)
  }
  return { text: parsed.text, tokens: parsed.tokens, children }
}

export function childrenOf(sentence: DepSentence, id: number): DepToken[] {
  return sentence.children.get(id) ?? []
}

export function rootOf(sentence: DepSentence): DepToken | undefined {
  return sentence.tokens.find((token) => token.head === 0)
}

export function byId(sentence: DepSentence, id: number): DepToken | undefined {
  const placed = sentence.tokens[id - 1]
  if (placed !== undefined && placed.id === id) return placed
  return sentence.tokens.find((token) => token.id === id)
}

function related(token: DepToken, rel: string): boolean {
  return token.deprel === rel || token.deprel.startsWith(`${rel}:`)
}

export function child(sentence: DepSentence, id: number, rel: string): DepToken | undefined {
  return childrenOf(sentence, id).find((token) => related(token, rel))
}

export function childrenByRel(sentence: DepSentence, id: number, rel: string): DepToken[] {
  return childrenOf(sentence, id).filter((token) => related(token, rel))
}

export function hasChild(sentence: DepSentence, id: number, rel: string): boolean {
  return childrenOf(sentence, id).some((token) => related(token, rel))
}

export function subtree(sentence: DepSentence, id: number): DepToken[] {
  const found: DepToken[] = []
  const stack = [id]
  const seen = new Set<number>()
  while (stack.length > 0) {
    const here = stack.pop()
    if (here === undefined) break
    if (seen.has(here)) continue
    seen.add(here)
    const token = byId(sentence, here)
    if (token !== undefined) found.push(token)
    for (const one of childrenOf(sentence, here)) stack.push(one.id)
  }
  return found.sort((a, b) => a.id - b.id)
}

export function spanOf(tokens: readonly DepToken[]): Span {
  let start = Number.POSITIVE_INFINITY
  let end = Number.NEGATIVE_INFINITY
  for (const token of tokens) {
    start = Math.min(start, token.start)
    end = Math.max(end, token.end)
  }
  return { start, end }
}

export function isGerund(token: DepToken): boolean {
  return GERUND.test(token.form)
}

export function lower(token: DepToken): string {
  return token.form.toLowerCase()
}

function bestOf(values: readonly number[], candidates: readonly number[]): number {
  let best = candidates[0] ?? 0
  for (const candidate of candidates) {
    const held = values[candidate] ?? Number.NEGATIVE_INFINITY
    if (held > (values[best] ?? Number.NEGATIVE_INFINITY)) best = candidate
  }
  return best
}

function headAt(heads: readonly number[], node: number): number {
  return heads[node - 1] ?? 0
}

function rowAt(scores: readonly (readonly number[])[], dependent: number): readonly number[] {
  return scores[dependent - 1] ?? []
}

function scoreAt(row: readonly number[], head: number): number {
  return row[head] ?? 0
}

function findCycle(heads: readonly number[]): number[] | undefined {
  const complete = new Set<number>()
  for (let start = 1; start <= heads.length; start += 1) {
    if (complete.has(start)) continue
    const path: number[] = []
    const positions = new Map<number, number>()
    let node = start
    while (node !== 0 && !complete.has(node)) {
      const position = positions.get(node)
      if (position !== undefined) return path.slice(position)
      positions.set(node, path.length)
      path.push(node)
      node = headAt(heads, node)
    }
    for (const item of path) complete.add(item)
  }
  return undefined
}

function rootConnected(heads: readonly number[]): Set<number> {
  const connected = new Set<number>()
  for (let start = 1; start <= heads.length; start += 1) {
    const path: number[] = []
    const seen = new Set<number>()
    let node = start
    while (node !== 0 && !connected.has(node) && !seen.has(node)) {
      seen.add(node)
      path.push(node)
      node = headAt(heads, node)
    }
    if (node === 0 || connected.has(node)) {
      for (const item of path) connected.add(item)
    }
  }
  return connected
}

function advantageOf(
  scores: readonly (readonly number[])[],
  heads: readonly number[],
  dependent: number
): number {
  const row = rowAt(scores, dependent)
  return scoreAt(row, 0) - scoreAt(row, headAt(heads, dependent))
}

function preferred(option: Swap, best: Swap): boolean {
  if (option.loss !== best.loss) return option.loss < best.loss
  if (option.dependent !== best.dependent) return option.dependent < best.dependent
  return option.replacement < best.replacement
}

function firstHeads(scores: readonly (readonly number[])[]): number[] {
  return scores.map((row, index) => {
    const dependent = index + 1
    const candidates: number[] = []
    for (let head = 1; head <= scores.length; head += 1) {
      if (head !== dependent) candidates.push(head)
    }
    return candidates.length === 0 ? 0 : bestOf(row, candidates)
  })
}

export function decodeTree(scores: readonly (readonly number[])[]): number[] {
  const size = scores.length
  if (size === 0) return []
  if (scores.some((row) => row.length !== size + 1)) {
    throw new Error("a dependency score matrix is N rows of N plus one scores")
  }
  const heads = firstHeads(scores)
  let root = 1
  for (let dependent = 2; dependent <= size; dependent += 1) {
    if (advantageOf(scores, heads, dependent) > advantageOf(scores, heads, root)) root = dependent
  }
  heads[root - 1] = 0
  for (let cycle = findCycle(heads); cycle !== undefined; cycle = findCycle(heads)) {
    const connected = [...rootConnected(heads)].sort((a, b) => a - b)
    let best: Swap | undefined
    for (const dependent of cycle) {
      const row = rowAt(scores, dependent)
      const replacement = bestOf(row, connected)
      const option = {
        loss: scoreAt(row, headAt(heads, dependent)) - scoreAt(row, replacement),
        dependent,
        replacement,
      }
      if (best === undefined || preferred(option, best)) best = option
    }
    if (best === undefined) break
    heads[best.dependent - 1] = best.replacement
  }
  return heads
}

export function isValidTree(heads: readonly number[]): boolean {
  if (heads.filter((head) => head === 0).length !== 1) return false
  if (heads.some((head, index) => head < 0 || head > heads.length || head === index + 1)) {
    return false
  }
  return findCycle(heads) === undefined
}
