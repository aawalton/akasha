import { parseBuildSha } from "akasha/alan/harness/web-build-version/modules/build-sha/build-sha.module.code.ts"
import { liveVersionResponse } from "akasha/alan/harness/web-build-version/modules/live-version/live-version.module.code.ts"

export function loader(): Response {
  return liveVersionResponse(parseBuildSha(process.env.NEXT_PUBLIC_BUILD_SHA))
}
