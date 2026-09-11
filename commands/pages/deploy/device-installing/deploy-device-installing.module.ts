import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployDeviceInstalling = {
  id: "01a08e0b-f9f5-746a-836d-b0646a5815b0",
  type: "module",
  slug: "deploy-device-installing",
  definition: "one iOS app built on the mac and installed to a phone plugged into it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phone is named by the hardware udid its app's page states.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose page names no phone is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "The build runs on the single mac this workstation reaches over ssh.",
    },
    {
      invariantKind: "departure",
      statement: "The commit built is origin/main rather than the commit this checkout is at.",
    },
    {
      invariantKind: "departure",
      statement: "The native seam is synced before every build.",
    },
    {
      invariantKind: "departure",
      statement: "A build is installed only where its signature has the app's bundle id and team.",
    },
    {
      invariantKind: "departure",
      statement: "A build reporting no sentinel counts as nothing installed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here uploads to App Store Connect.",
    },
  ],
} as const satisfies Module
