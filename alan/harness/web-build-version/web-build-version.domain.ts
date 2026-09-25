import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const webBuildVersion = {
  id: "01a05c48-deeb-700d-9df1-fad9c81a0a32",
  type: "page-type/domain",
  slug: "web-build-version",
  definition: "the commit a website was built from",
  parts: ["module/build-sha", "module/build-sha-define", "module/live-version"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build that cannot say which commit the build came from says so rather than guessing.",
    },
  ],
} as const satisfies Domain
