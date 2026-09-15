import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployDeviceInstalling = {
  id: "01a08e0b-f9f5-746a-836d-b0646a5815b0",
  type: "module",
  slug: "deploy-device-installing",
  definition: "one iOS app built on the mac and installed to a phone plugged into it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A phone is named by the hardware udid its app's page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app whose page names no phone is refused rather than guessed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build runs on the single mac this workstation reaches over ssh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commit built is origin/main rather than the commit this checkout is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The native seam is synced before every build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build is installed only where its signature has the app's bundle id and team.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build reporting no sentinel counts as nothing installed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each step the script got through echoes a mark of its own before the next runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that exited non-zero is answered with every step it got through named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the mac said is kept whether that run exited zero or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run on the mac is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keychain password unlocking the mac is handed in beside that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller handing the run in hands the password in too, so no secret is read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here uploads to App Store Connect.",
    },
  ],
} as const satisfies Module
