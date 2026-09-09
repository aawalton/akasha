import type { Initiative } from "../initiative.page-type.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's widgets load.",
      workingMemory:
        'The tiles draw `RefusedView` ("Sign in"), which `alanwalton-widget-feed.ios-component.swift.swift:132` reaches on an empty keychain read and `:140` on a 401. `DeviceSecretReader.read()` answers nothing both for no keychain item and for two (`alanwalton-device-secret-reader...swift:20-27`). No device secret page has landed since 2026-09-07, so signing out and in again minted nothing while the tailnet was down. Signing in now is the first thing to try. The serving pod does not carry HEAD.\n',
    },
    {
      statement: "Alan's app fills his password in from 1Password.",
    },
    {
      statement: "Alan and Jenny have one widget between them for Alan's multiplier.",
      workingMemory:
        "Alan holds what the multiplier is and what the widget shows. Ask him before taking this up.",
    },
  ],
} as const satisfies Initiative
