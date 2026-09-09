import type { Domain } from "../../../domains/domain.page-type.ts"

export const webBuildVersion = {
  id: "01a05c48-deeb-700d-9df1-fad9c81a0a32",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "web-build-version",
  definition: "the commit a running web build came from",
  parts: ["module/build-sha", "module/live-version", "module/build-sha-define"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build that cannot say which commit the build came from says so rather than guessing.",
    },
  ],
} as const satisfies Domain
