import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

export const REQUESTS_SITE: HandoverSite = {
  name: "requests",
  origin: "https://requests.alanwalton.com",
  sessionKeyEnv: "REQUESTS_SESSION_KEY",
  landingPath: "/handover",
  signInPath: "/sign-in",
  homePath: "/",
}
