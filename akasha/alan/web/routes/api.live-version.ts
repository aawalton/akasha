import { liveVersionResponse } from "@akasha/web-build-version/live-version"

export function loader(): Response {
  return liveVersionResponse(process.env.NEXT_PUBLIC_BUILD_SHA)
}
