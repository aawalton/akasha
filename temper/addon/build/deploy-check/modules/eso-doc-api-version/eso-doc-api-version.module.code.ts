import { join } from "node:path"

export function esoDocPathForLuaRoot(esoLuaRoot: string): string {
  return join(esoLuaRoot, "..", "ESOUIDocumentation.txt")
}
