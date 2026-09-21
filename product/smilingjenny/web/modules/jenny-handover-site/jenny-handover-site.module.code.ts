import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

export const JENNY_SITE: HandoverSite = {
  name: "smilingjenny",
  origin: "https://smilingjenny.me",
  sessionKeyEnv: "SMILINGJENNY_SESSION_KEY",
  landingPath: "/handover",
  signInPath: "/sign-in",
  homePath: "/",
}
