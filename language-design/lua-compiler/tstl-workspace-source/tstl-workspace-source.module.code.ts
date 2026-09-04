import * as fs from "fs"
import * as path from "path"

const cache = new Map<string, boolean>()

function hasNodeModulesSegment(filePath: string): boolean {
  return filePath.split(/[\\/]/).includes("node_modules")
}

export function isWorkspaceSourceFile(fileName: string): boolean {
  const cached = cache.get(fileName)
  if (cached !== undefined) {
    return cached
  }

  let result: boolean
  try {
    result = !hasNodeModulesSegment(fs.realpathSync(path.normalize(fileName)))
  } catch {
    result = !hasNodeModulesSegment(fileName)
  }

  cache.set(fileName, result)
  return result
}
