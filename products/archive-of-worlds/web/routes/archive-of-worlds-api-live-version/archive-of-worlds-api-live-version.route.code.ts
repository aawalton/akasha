import { liveVersionResponse } from "akasha/alan/harness/web-build-version/live-version/live-version.module.code.ts"
import { builtFromSha } from "akasha/alan/harness/web-build-version/modules/build-sha/build-sha.module.code.ts"

export function loader(): Response {
  return liveVersionResponse(builtFromSha())
}
