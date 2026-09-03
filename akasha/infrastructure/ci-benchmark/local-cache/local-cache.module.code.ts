import { homedir } from "node:os"
import { join } from "node:path"

export function localCacheDir(): string {
  return join(homedir(), ".cache", "pipeline-engine", "ci-storage")
}
