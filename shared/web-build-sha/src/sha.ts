const BUILD_SHA_PATTERN = /^[0-9a-f]{40}$/

export const BUILD_SHA_ENV_NAME = "NEXT_PUBLIC_BUILD_SHA"

export function parseBuildSha(raw: string | null | undefined): string | null {
  if (typeof raw !== "string") return null
  return BUILD_SHA_PATTERN.test(raw) ? raw : null
}
