export type TextureNamed = {
  readonly path: string
  readonly file: string
  readonly line: number
}

export type TextureFound = {
  readonly named: readonly TextureNamed[]
  readonly built: readonly TextureNamed[]
}

export type AddonTexture = {
  readonly addon: string
  readonly rest: string
}

export type Bindings = ReadonlyMap<string, readonly string[]>

const QUOTED = /["'`]([^"'`\n]*?\.dds)["'`]/gi

const JOINED_ON = /(?:\.\.|\+)\s*$/

const JOINED_NAME = /(?<![\w$.])([A-Za-z_$][\w$]*)\s*(?:\.\.|\+)\s*$/

const FILLED_IN = /\$\{|%s/

const FILLED_NAME = /\$\{([A-Za-z_$][\w$]*)\}/g

const EXTENSION_ONLY = /^\.dds$/i

const BOUND = /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*["'`]([^"'`\n$]*)["'`]/g

const NO_BINDINGS: Bindings = new Map()

const GAME_ROOTS: readonly string[] = ["esoui/", "art/"]

function lineAt(text: string, at: number): number {
  let line = 1
  for (let one = 0; one < at; one += 1) if (text[one] === "\n") line += 1
  return line
}

function onlyAFileName(path: string): boolean {
  return !path.includes("/") && !path.includes("\\")
}

export function bindingsIn(text: string, into: Map<string, string[]>): undefined {
  for (const match of text.matchAll(BOUND)) {
    const name = match[1] ?? ""
    const held = into.get(name) ?? []
    held.push(match[2] ?? "")
    into.set(name, held)
  }
  return undefined
}

function boundOnce(name: string, bindings: Bindings): string | null {
  const held = bindings.get(name)
  return held?.length === 1 ? (held[0] ?? null) : null
}

function filledIn(path: string, bindings: Bindings): string | null {
  if (path.includes("%s")) return null
  let whole = true
  const filled = path.replace(FILLED_NAME, (all, name: string) => {
    const bound = boundOnce(name, bindings)
    if (bound === null) whole = false
    return bound ?? all
  })
  return whole ? filled : null
}

function resolved(path: string, before: string, bindings: Bindings): string | null {
  if (JOINED_ON.test(before)) {
    const name = JOINED_NAME.exec(before)?.[1]
    const bound = name === undefined ? null : boundOnce(name, bindings)
    return bound === null ? null : filledIn(bound + path, bindings)
  }
  if (FILLED_IN.test(path)) return filledIn(path, bindings)
  return null
}

export function texturesIn(text: string, file: string, bindings = NO_BINDINGS): TextureFound {
  const named: TextureNamed[] = []
  const built: TextureNamed[] = []
  for (const match of text.matchAll(QUOTED)) {
    const path = match[1] ?? ""
    if (EXTENSION_ONLY.test(path)) continue
    const at = match.index
    const before = text.slice(text.lastIndexOf("\n", at) + 1, at)
    const line = lineAt(text, at)
    const isBuilt = FILLED_IN.test(path) || onlyAFileName(path) || JOINED_ON.test(before)
    if (!isBuilt) {
      named.push({ path, file, line })
      continue
    }
    const whole = resolved(path, before, bindings)
    if (whole === null) built.push({ path, file, line })
    else named.push({ path: whole, file, line })
  }
  return { named, built }
}

export function slashed(path: string): string {
  return path.replace(/\\+/g, "/").replace(/^\/+/, "").toLowerCase()
}

export function isGameTexture(path: string): boolean {
  const plain = slashed(path)
  return GAME_ROOTS.some((root) => plain.startsWith(root))
}

export function addonTextureOf(path: string): AddonTexture | null {
  const plain = slashed(path)
  if (isGameTexture(plain)) return null
  const cut = plain.indexOf("/")
  if (cut <= 0) return null
  return { addon: plain.slice(0, cut), rest: plain.slice(cut + 1) }
}
