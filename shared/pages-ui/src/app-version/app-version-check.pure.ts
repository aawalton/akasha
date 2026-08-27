const BUILD_SHA_PATTERN = /^[0-9a-f]{40}$/

export function parseBuildSha(raw: string | undefined): string | null {
  if (typeof raw !== "string") return null
  return BUILD_SHA_PATTERN.test(raw) ? raw : null
}

export function shouldPromptVersionUpdate(input: {
  buildSha: string | null
  liveVersion: string | null | undefined
  alreadyDetected: boolean
}): boolean {
  if (input.buildSha === null) return false
  if (typeof input.liveVersion !== "string") return false
  if (input.alreadyDetected) return false
  return input.liveVersion !== input.buildSha
}

export function buildVersionedReloadUrl(currentHref: string, targetVersion: string): string {
  const url = new URL(currentHref)
  url.searchParams.set("__v", targetVersion)
  return url.toString()
}

export function liveVersionIn(body: unknown): string | null {
  if (typeof body !== "object" || body === null || !("liveVersion" in body)) return null
  const stated = body.liveVersion
  return typeof stated === "string" ? parseBuildSha(stated) : null
}
