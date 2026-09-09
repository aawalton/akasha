import { liveVersionResponse } from "akasha/alan/harness/web-build-version/live-version/live-version.module.code.ts"

export function loader(): Response {
  return liveVersionResponse(process.env.NEXT_PUBLIC_BUILD_SHA)
}
