import { execFileSync } from "node:child_process"
import { BUILD_SHA_ENV_NAME, parseBuildSha } from "./sha.ts"

export type BuildShaDefine = Record<string, string>

export function headShaAt(root: string): string | null {
  let said: string
  try {
    said = execFileSync("git", ["-C", root, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
  } catch {
    return null
  }
  return parseBuildSha(said.trim())
}

export function buildShaDefine(root?: string): BuildShaDefine {
  const stated = parseBuildSha(process.env[BUILD_SHA_ENV_NAME])
  const sha = stated ?? headShaAt(root ?? process.cwd()) ?? ""
  return { [`process.env.${BUILD_SHA_ENV_NAME}`]: JSON.stringify(sha) }
}
