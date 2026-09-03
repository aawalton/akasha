import { classifyExtension, type FileKind } from "../file-kind/file-kind.module.code.ts"

/**
 * Every kind, against whether its files are bytes rather than text.
 *
 * Total over `FileKind` on purpose. A kind added to that union and left out here is refused by the
 * type checker naming the kind, rather than answered as text by a lookup that finds nothing. What
 * stood here before read 33 markdown pages off disk for a `binary: true` line and answered `false`
 * wherever it found none, so deleting those pages turned the predicate into the constant `false`
 * and nothing said so.
 */
const BYTES: Record<FileKind, boolean> = {
  ts: false,
  tsx: false,
  js: false,
  jsx: false,
  css: false,
  md: false,
  yaml: false,
  yml: false,
  lua: false,
  sql: false,
  json: false,
  sh: false,
  rust: false,
  toml: false,
  swift: false,
  dockerfile: false,
  "systemd-unit": false,
  txt: false,
  lock: false,
  image: true,
  xml: false,
  html: false,
  python: false,
  csv: false,
  certificate: false,
  env: false,
  conf: false,
  ignore: false,
  "sops-config": false,
  "sops-secret": false,
  jsonl: false,
}

const CARRYING: readonly FileKind[] = (Object.keys(BYTES) as FileKind[]).filter((one) => BYTES[one])

export function carriesBytes(pathish: string): boolean {
  if (CARRYING.length === 0) {
    throw new Error(
      "no kind of file here is bytes, so nothing can be told from text and every path would " +
        "answer the same — say which kinds are bytes in `file-kind-bytes.module.code.ts`"
    )
  }
  const kind = classifyExtension(pathish)
  if (kind === null) return false
  const said: boolean | undefined = BYTES[kind]
  if (said === undefined) {
    throw new Error(
      `nothing says whether a \`${kind}\` file is bytes or text, so \`${pathish}\` cannot be ` +
        "answered for — state that kind in `file-kind-bytes.module.code.ts` beside the others"
    )
  }
  return said
}
