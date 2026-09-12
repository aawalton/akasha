import { readFileSync } from "node:fs"

export function scanningBundleFile<TFinding>(
  path: string,
  scan: (source: string, file: string) => readonly TFinding[]
): readonly TFinding[] {
  const source = readFileSync(path, "utf8")
  return scan(source, path)
}
