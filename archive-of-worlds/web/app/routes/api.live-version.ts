import { liveVersionResponse } from "@shared/web-build-sha/live-version"

export function loader(): Response {
  return liveVersionResponse(process.env.NEXT_PUBLIC_BUILD_SHA)
}
