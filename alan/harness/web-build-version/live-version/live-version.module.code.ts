import { BUILD_SHA_ENV_NAME, parseBuildSha } from "../build-sha/build-sha.module.code.ts"

const NO_STORE = { "cache-control": "no-store" } as const

export function liveVersionResponse(raw: string | null | undefined): Response {
  const sha = parseBuildSha(raw)
  if (sha === null) {
    return Response.json(
      {
        liveVersion: null,
        why: `this build carries no ${BUILD_SHA_ENV_NAME}, so it cannot say which commit it came from`,
      },
      { status: 503, headers: NO_STORE }
    )
  }
  return Response.json({ liveVersion: sha }, { headers: NO_STORE })
}
