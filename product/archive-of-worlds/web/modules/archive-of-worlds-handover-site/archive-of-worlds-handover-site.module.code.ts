import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

export const ARCHIVE_OF_WORLDS_SITE: HandoverSite = {
  name: "archive-of-worlds",
  origin: "https://archiveofworlds.app",
  sessionKeyEnv: "ARCHIVE_OF_WORLDS_SESSION_KEY",
  landingPath: "/handover",
  signInPath: "/sign-in",
  homePath: "/",
}
