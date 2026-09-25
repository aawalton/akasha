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

const QUOTED = /["'`]([^"'`\n]*?\.dds)["'`]/gi

const JOINED_ON = /(?:\.\.|\+)\s*$/

const FILLED_IN = /\$\{|%s/

const GAME_ROOTS: readonly string[] = ["esoui/", "art/"]

function lineAt(text: string, at: number): number {
  let line = 1
  for (let one = 0; one < at; one += 1) if (text[one] === "\n") line += 1
  return line
}

function onlyAFileName(path: string): boolean {
  return !path.includes("/") && !path.includes("\\")
}

export function texturesIn(text: string, file: string): TextureFound {
  const named: TextureNamed[] = []
  const built: TextureNamed[] = []
  for (const match of text.matchAll(QUOTED)) {
    const path = match[1] ?? ""
    const at = match.index
    const before = text.slice(text.lastIndexOf("\n", at) + 1, at)
    const found = { path, file, line: lineAt(text, at) }
    const isBuilt = FILLED_IN.test(path) || onlyAFileName(path) || JOINED_ON.test(before)
    if (isBuilt) built.push(found)
    else named.push(found)
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
