import { liveVersionLoader } from "@shared/pages-query/live-version"

const WEB_APP_SLUG = "alanwalton-atlas-web"

export function loader(): Promise<Response> {
  return liveVersionLoader(WEB_APP_SLUG)
}
