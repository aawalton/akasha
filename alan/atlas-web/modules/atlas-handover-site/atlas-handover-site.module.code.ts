import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

export const ATLAS_SITE: HandoverSite = {
  name: "atlas",
  origin: "https://atlas.alanwalton.com",
  sessionKeyEnv: "ATLAS_SESSION_KEY",
  landingPath: "/handover",
  signInPath: "/sign-in",
  homePath: "/",
}
