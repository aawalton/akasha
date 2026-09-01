import { said } from "@akasha/utils-run/running"
import { BUILD_SHA_ENV_NAME, parseBuildSha } from "../build-sha/build-sha.module.code.ts"

export type BuildShaDefine = Record<string, string>

export function headShaAt(root: string): string | null {
  let done: string
  try {
    done = said(["git", "-C", root, "rev-parse", "HEAD"])
  } catch {
    return null
  }
  return parseBuildSha(done.trim())
}

export function buildShaDefine(root?: string): BuildShaDefine {
  const stated = parseBuildSha(process.env[BUILD_SHA_ENV_NAME])
  const sha = stated ?? headShaAt(root ?? process.cwd()) ?? ""
  return { [`process.env.${BUILD_SHA_ENV_NAME}`]: JSON.stringify(sha) }
}
