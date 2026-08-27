export const BINARY_ASSET_EXTENSIONS: ReadonlySet<string> = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".ico",
  ".webp",
  ".bmp",
  ".tif",
  ".tiff",
  ".avif",
  ".heic",
  ".psd",
  ".dds",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".eot",
  ".zip",
  ".gz",
  ".tgz",
  ".bz2",
  ".xz",
  ".zst",
  ".7z",
  ".rar",
  ".tar",
  ".wav",
  ".mp3",
  ".m4a",
  ".aac",
  ".flac",
  ".ogg",
  ".opus",
  ".mp4",
  ".m4v",
  ".mov",
  ".webm",
  ".mkv",
  ".pdf",
  ".sqlite",
  ".db",
  ".bin",
  ".dat",
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".a",
  ".o",
  ".obj",
  ".wasm",
  ".class",
  ".jar",
  ".pyc",
  ".keystore",
  ".jks",
  ".p12",
  ".pfx",
  ".der",
])

export const extensionOf = (rel: string): string => {
  const base = rel.slice(rel.lastIndexOf("/") + 1)
  const dot = base.lastIndexOf(".")
  return dot <= 0 ? "" : base.slice(dot).toLowerCase()
}

export const isScannedTextPath = (rel: string): boolean =>
  !BINARY_ASSET_EXTENSIONS.has(extensionOf(rel))

export interface RawNulSite {
  readonly line: number
  readonly column: number
}

export const findRawNulSites = (bytes: Uint8Array): readonly RawNulSite[] => {
  const sites: RawNulSite[] = []
  let line = 1
  let lineStart = 0
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i]
    if (byte === 0x0a) {
      line++
      lineStart = i + 1
      continue
    }
    if (byte === 0) sites.push({ line, column: i - lineStart + 1 })
  }
  return sites
}

export interface RawNulViolation {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly message: string
}

export const toRawNulViolations = (file: string, bytes: Uint8Array): readonly RawNulViolation[] =>
  findRawNulSites(bytes).map((site) => ({
    file,
    line: site.line,
    column: site.column,
    message: "raw NUL byte — replace with the 4-digit unicode escape",
  }))
