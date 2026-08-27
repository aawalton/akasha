import { z } from "zod"

export type BuildShaDefine = Record<string, string>

const BUILD_SHA_ENV_SCHEMA = z.string().optional()

export function buildShaDefine(): BuildShaDefine {
  const sha = BUILD_SHA_ENV_SCHEMA.parse(process.env.NEXT_PUBLIC_BUILD_SHA) ?? ""
  return { "process.env.NEXT_PUBLIC_BUILD_SHA": JSON.stringify(sha) }
}
