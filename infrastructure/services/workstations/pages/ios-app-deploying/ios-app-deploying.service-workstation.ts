import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const iosAppDeploying = {
  id: "01a09b1a-31fc-7f84-8e3c-2b931fe57d4e",
  type: "service-workstation",
  slug: "ios-app-deploying",
  definition: "the service putting the ios app kind up once a commit changes what it is built from",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One kind is put up by this service, and the code beside this page names that kind.",
    },
    {
      invariantKind: "departure",
      statement: "An ios deploy builds the app and hands the build to Apple, which nothing undoes.",
    },
    {
      invariantKind: "departure",
      statement: "A tick may hand a build to Apple without anyone asking, as Alan settled.",
    },
    {
      invariantKind: "departure",
      statement: "Each ios app states the hour it waits before a tick hands Apple another build.",
    },
    {
      invariantKind: "departure",
      statement: "An ios build wants secrets from Alan's file, so this service reads that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick with every ios app up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
